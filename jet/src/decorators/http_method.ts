/**
 * @class Decorator
 * 
 * @description This class will be the decorator.
 * It will be used to generate the decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'all'

/**
 * @class RouteDefinition
 * 
 * @description This class will be the route definition.
 * It will be used to generate the route definition for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
type RouteDefinition = {
  method: HttpMethod
  path: string
  handlerName: string
}

/**
 * @const ROUTES_KEY
 * 
 * @description This constant will be the routes key.
 * It will be used to generate the routes key for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const ROUTES_KEY = Symbol('routes')

/**
 * @function createRouteDecorator
 * 
 * @description This function will be the create route decorator.
 * It will be used to generate the route decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function createRouteDecorator(method: HttpMethod) {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES_KEY, target.constructor) || []
      routes.push({
        method,
        path,
        handlerName: propertyKey as string,
      })
      Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor)
    }
  }
}

/**
 * @function Get
 * 
 * @description This function will be the get decorator.
 * It will be used to generate the get decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const GetMapping = createRouteDecorator('get')

/**
 * @function PostMapping
 * 
 * @description This function will be the post mapping decorator.
 * It will be used to generate the post mapping decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const PostMapping = createRouteDecorator('post')

/**
 * @function PutMapping
 * 
 * @description This function will be the put mapping decorator.
 * It will be used to generate the put mapping decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const PutMapping = createRouteDecorator('put')

/**
 * @function DeleteMapping
 * 
 * @description This function will be the delete mapping decorator.
 * It will be used to generate the delete mapping decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const DeleteMapping = createRouteDecorator('delete')

/**
 * @function PatchMapping
 * 
 * @description This function will be the patch mapping decorator.
 * It will be used to generate the patch mapping decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const PatchMapping = createRouteDecorator('patch')

/**
 * @function OptionsMapping
 * 
 * @description This function will be the options mapping decorator.
 * It will be used to generate the options mapping decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const OptionsMapping = createRouteDecorator('options')

/**
 * @function AllMapping
 * 
 * @description This function will be the all mapping decorator.
 * It will be used to generate the all mapping decorator for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export const AllMapping = createRouteDecorator('all')

/**
 * @class HttpMethodsUtil
 * 
 * @description This class will be the http methods util.
 * It will be used to generate the http methods util for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class HttpMethodUtil {
    /**
     * @function getDefinitions
     * 
     * @description This function will be the get route definitions.
     * It will be used to generate the get route definitions for the controller.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    public static getDefinitions(target: any): RouteDefinition[] {
        return Reflect.getMetadata(ROUTES_KEY, target.constructor) || []
    }
}