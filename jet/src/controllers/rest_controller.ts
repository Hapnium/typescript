import { Hono } from 'hono'
import type { Context } from 'hono'
import { RequestMappingOption, RequestMappingUtil } from '../decorators/class';
import { HttpMethodUtil } from '../decorators/http_method';
import { RequestUtil } from '../decorators/request';

/**
 * @class RestContext
 * 
 * @description This class will be the rest context.
 * It will be used to generate the rest context for the API.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export type HttpContext = Context;

/**
 * @class BaseController
 * 
 * @description This class will be the rest controller.
 * It will be used to generate the rest controller for the API.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export abstract class RestController extends Hono {
  static basePath(): string {
    return RequestMappingUtil.getBasePath(this)
  }

  constructor() {
    super()
    this.registerRoutes()
  }

  /**
   * @function registerRoutes
   * 
   * @description This function will be the register routes.
   * It will be used to generate the register routes for the API.
   * 
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  private registerRoutes() {
    const routes = HttpMethodUtil.getDefinitions(this)

    for (const { method, path, handlerName } of routes) {
      const handler = (this as any)[handlerName]
      const paramMeta = RequestUtil.getMetadata(this, handlerName)
  
      const wrapped = async (ctx: Context) => {
        if (paramMeta.length === 0) {
          return handler.call(this, ctx)
        }

        const args: any[] = []
  
        for (const meta of paramMeta) {
          switch (meta.type) {
            case 'ctx':
              args[meta.index] = ctx
              break
            case 'body':
              args[meta.index] = await ctx.req.json()
              break
            case 'param':
              args[meta.index] = ctx.req.param(meta.key!)
              break
            case 'query':
              args[meta.index] = ctx.req.query(meta.key!)
              break
            case 'path':
              args[meta.index] = ctx.req.param(meta.key!)
              break
            default:
              break
          }
        }
  
        return handler.apply(this, args)
      }

      const fullPath = `${this.getBasePath()}${path}`
      console.log(fullPath)
      console.log(`[ROUTE] ${method.toUpperCase()} ${path} -> ${handlerName}`)

      this[method](path, wrapped)
    }
  }

  /**
   * @function getBasePath
   * 
   * @description This function will be the get base path.
   * It will be used to generate the get base path for the API.
   * 
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  public getBasePath(): string {
    return RequestMappingUtil.getBasePath(this.constructor)
  }

  /**
   * @function getOptions
   * 
   * @description This function will be the get request mapping options.
   * It will be used to generate the get request mapping options for the API.
   * 
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  public getOptions(): RequestMappingOption {
    return RequestMappingUtil.getOptions(this.constructor)
  }

  /**
   * @function getRouter
   * 
   * @description This function will be the get router.
   * It will be used to generate the get router for the API.
   * 
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  public getRouter() {
    return this.router
  }
}