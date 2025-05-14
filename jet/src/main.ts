import { Hono } from 'hono';
import type { Context } from 'hono';
import 'reflect-metadata';

import { OncePerRequestFilter } from './security/filters/once_per_request_filter';
import { getApplicationControllers, getGlobalErrorHandlers } from './decorators/core';
import type { MiddlewareHandler } from 'hono/types';
import type { RestController } from './controllers/rest_controller';

/**
 * @abstract MainApplication
 *
 * @description This abstract class will be the main application.
 * It will be used to run the application.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export abstract class MainApplication {
  protected readonly app: Hono = new Hono();

  /**
   * @function configure
   *
   * @description This function will be the configure.
   * It will be used to configure the application.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  protected abstract configure(): void;

  constructor() {
    this.configure();
    this.registerControllers();
    this.registerErrorHandlers();
  }

  /**
   * @function registerControllers
   *
   * @description This function will be the register controllers.
   * It will be used to register the controllers for the API.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  private registerControllers() {
    const controllers = getApplicationControllers();
    for (const controller of controllers) {
      this.app.route(controller.getBasePath(), controller);
    }
  }

  /**
   * @function registerErrorHandlers
   *
   * @description This function will be the register error handlers.
   * It will be used to register the error handlers for the API.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  private registerErrorHandlers() {
    const errorHandlers = getGlobalErrorHandlers();
    for (const errorHandler of errorHandlers) {
      this.app.use('*', async (ctx, next) => errorHandler(ctx, next));
    }
  }

  /**
   * @function use
   *
   * @description This function will be the use.
   * It will be used to use the middleware for the API.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  protected use(middleware: (ctx: Context, next: () => Promise<void>) => Promise<void>) {
    this.app.use('*', middleware);
  }

  /**
   * @function filter
   *
   * @description This function will be the filter.
   * It will be used to filter the request.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  protected filter(filter: OncePerRequestFilter) {
    this.app.use('*', async (ctx, next) => filter.doFilter(ctx, next));
  }

  protected addFilter(filter: MiddlewareHandler) {
    this.app.use(filter);
  }

  /**
   * @function registerController
   *
   * @description This function will be the register controller.
   * It will be used to register the controller for the API.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  protected registerController(controller: RestController) {
    this.app.route(controller.getBasePath(), controller);
  }

  /**
   * @function run
   *
   * @description This function will be the run.
   * It will be used to run the application.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
   */
  public run() {
    return this.app.fetch;
  }
}