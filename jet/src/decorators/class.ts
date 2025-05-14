/**
 * @class RequestMappingOption
 * 
 * @description This class will be the request mapping option.
 * It will be used to generate the request mapping option for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class RequestMappingOption {
    /** 
     * @description Whether to show the log.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    showLog: boolean = false

    /**
     * @description The allowed methods.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    allowedMethods: string[] = []

    /**
     * @description The authorized roles.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    authorizedRoles: string[] = []

    constructor(showLog?: boolean, allowedMethods?: string[], authorizedRoles?: string[]) {
        this.showLog = showLog ?? false
        this.allowedMethods = allowedMethods ?? []
        this.authorizedRoles = authorizedRoles ?? []
    }
}


/**
 * @const BASE_PATH_KEY
 * 
 * @description This constant will be the base path key.
 * It will be used to generate the base path key for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const BASE_PATH_KEY = Symbol('base_path')

/**
 * @function RequestMapping
 * 
 * @description This function will be the request mapping.
 * It will be used to generate the request mapping for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RequestMapping(basePath: string, options: RequestMappingOption = new RequestMappingOption()): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(BASE_PATH_KEY, { path: basePath, options }, target)
  }
}


/**
 * @class RequestMappingUtil
 * 
 * @description This class will be the request mapping util.
 * It will be used to generate the request mapping util for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class RequestMappingUtil {
    /**
     * @function getBasePath
     * 
     * @description This function will be the get base path.
     * It will be used to generate the get base path for the controller.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    public static getBasePath(target: any): string {
        return Reflect.getMetadata(BASE_PATH_KEY, target).path
    }

    /**
     * @function getOptions
     * 
     * @description This function will be the get options.
     * It will be used to generate the get options for the controller.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    public static getOptions(target: any): RequestMappingOption {
        return Reflect.getMetadata(BASE_PATH_KEY, target).options
    }
}