import type { RestController } from "../controllers/rest_controller";

/**
 * @const APPLICATION_CONTROLLERS
 *
 * @description This constant will be the application controllers.
 * It will be used to store the application controllers.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const APPLICATION_CONTROLLERS = new Set<RestController>();

/**
 * @function Controller
 *
 * @description This function will be the controller.
 * It will be used to register the controller for the API.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Controller(): ClassDecorator {
  return function (target: any) {
    const instance = new target() as RestController;
    APPLICATION_CONTROLLERS.add(instance);
  };
}

/**
 * @function getApplicationControllers
 *
 * @description This function will be the get application controllers.
 * It will be used to get the application controllers.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function getApplicationControllers(): RestController[] {
  return Array.from(APPLICATION_CONTROLLERS);
}

/**
 * @const globalErrorHandlers
 *
 * @description This constant will be the global error handlers.
 * It will be used to store the global error handlers.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const globalErrorHandlers: Function[] = [];

/**
 * @function RestControllerAdvice
 *
 * @description This function will be the rest controller advice.
 * It will be used to register the rest controller advice for the API.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RestControllerAdvice(): ClassDecorator {
  return function (target: any) {
    globalErrorHandlers.push(new target().handle);
  };
}

/**
 * @function getGlobalErrorHandlers
 *
 * @description This function will be the get global error handlers.
 * It will be used to get the global error handlers.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function getGlobalErrorHandlers() {
  return globalErrorHandlers;
}