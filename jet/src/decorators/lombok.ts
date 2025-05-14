import 'reflect-metadata';

// ────────────────────────────
// Constants and Registries
// ────────────────────────────

/**
 * @const DESIGN_TYPE
 *
 * @description This constant will be the design type.
 * It will be used to generate the design type for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const DESIGN_TYPE = 'design:type';

/**
 * @const DESIGN_TYPE_KEY
 *
 * @description This constant will be the design type key.
 * It will be used to generate the design type key for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const DESIGN_TYPE_KEY = 'design:type:props';

/**
 * @const INJECT_PROPS_KEY
 *
 * @description This constant will be the inject props key.
 * It will be used to generate the inject props key for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const INJECT_PROPS_KEY = 'design:type:inject';

/**
 * @const SINGLETONS
 *
 * @description This constant will be the singletons.
 * It will be used to generate the singletons for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
const SINGLETONS = new Map<any, any>();

// ────────────────────────────
// Utility Functions
// ────────────────────────────

/**
 * @function defineAccessor
 *
 * @description This function will be the define accessor.
 * It will be used to define the accessor for the property.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
function defineAccessor<T extends object>(target: T, key: string, get = true, set = true) {
  const privateKey = Symbol(`__${key}`);

  Object.defineProperty(target, key, {
    get: get ? function (this: T) { return (this as any)[privateKey]; } : undefined,
    set: set ? function (this: T, val: any) { (this as any)[privateKey] = val; } : undefined,
    enumerable: true,
    configurable: true,
  });
}

/**
 * @function registerProp
 *
 * @description This function will be the register prop.
 * It will be used to register the prop for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
function registerProp(target: any, key: string | symbol) {
  const props = Reflect.getMetadata(DESIGN_TYPE_KEY, target) || [];
  if (!props.includes(key)) {
    props.push(key);
    Reflect.defineMetadata(DESIGN_TYPE_KEY, props, target);
  }
}

/**
 * @function registerInjectProp
 *
 * @description This function will be the register inject prop.
 * It will be used to register the inject prop for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
function registerInjectProp(target: any, key: string | symbol) {
  const props = Reflect.getMetadata(INJECT_PROPS_KEY, target) || [];
  if (!props.includes(key)) {
    props.push(key);
    Reflect.defineMetadata(INJECT_PROPS_KEY, props, target);
  }
}

/**
 * @function resolveDep
 *
 * @description This function will be the resolve dep.
 * It will be used to resolve the dependency for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
function resolveDep(type: any) {
  if (!SINGLETONS.has(type)) {
    SINGLETONS.set(type, new type());
  }
  return SINGLETONS.get(type);
}

// ────────────────────────────
// Lombok-like Decorators
// ────────────────────────────

/**
 * @function Getter
 *
 * @description This function will be the getter.
 * It will be used to generate the getter for the property.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Getter(): ClassDecorator & PropertyDecorator {
  return (target: any, key?: string | symbol) => {
    if (typeof key === 'undefined') {
      const props = Reflect.getMetadata(DESIGN_TYPE_KEY, target.prototype) || [];
      for (const prop of props) defineAccessor(target.prototype, prop, true, false);
    } else {
      registerProp(target, key);
      defineAccessor(target, key as string, true, false);
    }
  };
}

/**
 * @function Setter
 *
 * @description This function will be the setter.
 * It will be used to generate the setter for the property.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Setter(): ClassDecorator & PropertyDecorator {
  return (target: any, key?: string | symbol) => {
    if (typeof key === 'undefined') {
      const props = Reflect.getMetadata(DESIGN_TYPE_KEY, target.prototype) || [];
      for (const prop of props) defineAccessor(target.prototype, prop, false, true);
    } else {
      registerProp(target, key);
      defineAccessor(target, key as string, false, true);
    }
  };
}

/**
 * @function Data
 *
 * @description This function will be the data.
 * It will be used to generate the data for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Data(): ClassDecorator {
  return function (target: any) {
    Getter()(target);
    Setter()(target);
  };
}

/**
 * @function NoArgsConstructor
 *
 * @description This function will be the no args constructor.
 * It will be used to generate the no args constructor for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function NoArgsConstructor(): ClassDecorator {
  return function () {};
}

/**
 * @function AllArgsConstructor
 *
 * @description This function will be the all args constructor.
 * It will be used to generate the all args constructor for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function AllArgsConstructor(): ClassDecorator {
  return function () {};
}

/**
 * @function RequiredArgsConstructor
 *
 * @description This function will be the required args constructor.
 * It will be used to generate the required args constructor for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function RequiredArgsConstructor(): ClassDecorator {
  return function (target: any) {
    const original = target;
    const newConstructor: any = function (...args: any[]) {
      const instance = new original(...args);
      const props = Reflect.getMetadata(INJECT_PROPS_KEY, original.prototype) || [];
      for (const prop of props) {
        const type = Reflect.getMetadata(DESIGN_TYPE, original.prototype, prop);
        instance[prop] = resolveDep(type);
      }
      return instance;
    };
    newConstructor.prototype = original.prototype;
    return newConstructor;
  };
}

// ────────────────────────────
// Spring-like DI and Config
// ────────────────────────────

/**
 * @function Service
 *
 * @description This function will be the service.
 * It will be used to generate the service for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Service(): ClassDecorator {
  return function (target: any) {
    const instance = new target();
    SINGLETONS.set(target, instance);
  };
}

/**
 * @function Configuration
 *
 * @description This function will be the configuration.
 * It will be used to generate the configuration for the class.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Configuration(): ClassDecorator {
  return Service();
}

/**
 * @function Required
 *
 * @description This function will be the required.
 * It will be used to generate the required for the property.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Required(): PropertyDecorator {
  return function (target: any, key: string | symbol) {
    registerInjectProp(target, key);
  };
}

/**
 * @function Inject
 *
 * @description This function will be the inject.
 * It will be used to generate the inject for the property.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export function Inject(): PropertyDecorator {
  return function (target: any, key: string | symbol) {
    const type = Reflect.getMetadata(DESIGN_TYPE, target, key);
    const instance = resolveDep(type);

    Object.defineProperty(target, key, {
      value: instance,
      writable: false,
    });
  };
}