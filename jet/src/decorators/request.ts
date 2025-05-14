/**
 * @enum ParamType
 * 
 * @description This enum will be the param type.
 * It will be used to generate the param type for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
type ParamType = 'ctx' | 'body' | 'param' | 'query' | 'path'

/**
 * @class ParamMetadata
 * 
 * @description This class will be the param metadata.
 * It will be used to generate the param metadata for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
type ParamMetadata = {
  index: number
  type: ParamType
  key?: string // for param
}

/**
 * @const PARAM_META_KEY
 * 
 * @description This constant will be the param metadata key.
 * It will be used to generate the param metadata key for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const PARAM_META_KEY = Symbol('param_metadata')

/**
 * @function RequestContext
 * 
 * @description This function will be the request.
 * It will be used to generate the request for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RequestContext(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    defineParamMetadata(target, propertyKey!, { index: parameterIndex, type: 'ctx' })
  }
}

/**
 * @function RequestBody
 * 
 * @description This function will be the request body.
 * It will be used to generate the request body for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RequestBody(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    defineParamMetadata(target, propertyKey!, { index: parameterIndex, type: 'body' })
  }
}
  
/**
 * @function RequestParam
 * 
 * @description This function will be the request param.
 * It will be used to generate the request param for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RequestParam(paramName: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    defineParamMetadata(target, propertyKey!, { index: parameterIndex, type: 'param', key: paramName })
  }
}

/**
 * @function RequestQuery
 * 
 * @description This function will be the request query.
 * It will be used to generate the request query for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RequestQuery(paramName: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    defineParamMetadata(target, propertyKey!, { index: parameterIndex, type: 'query', key: paramName })
  }
}

/**
 * @function PathVariable
 * 
 * @description This function will be the path variable.
 * It will be used to generate the path variable for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function PathVariable(key: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    defineParamMetadata(target, propertyKey!, { index: parameterIndex, type: 'path', key })
  }
}

/**
 * @function defineParamMetadata
 * 
 * @description This function will be the define param metadata.
 * It will be used to define the param metadata for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
function defineParamMetadata(target: any, method: string | symbol, metadata: ParamMetadata) {
  const existing: ParamMetadata[] = Reflect.getMetadata(PARAM_META_KEY, target, method) || []
  existing.push(metadata)
  Reflect.defineMetadata(PARAM_META_KEY, existing, target, method)
}

/**
 * @class RequestUtil
 * 
 * @description This class will be the request util.
 * It will be used to generate the request util for the controller.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class RequestUtil {
    /**
     * @function getMetadata
     * 
     * @description This function will be the get metadata.
     * It will be used to get the metadata for the controller.
     * 
     * @author Hapnium <contact@nearby.hapnium.com>
    */
    public static getMetadata(target: any, method: string | symbol): ParamMetadata[] {
        return Reflect.getMetadata(PARAM_META_KEY, target, method) || []
    }
}
