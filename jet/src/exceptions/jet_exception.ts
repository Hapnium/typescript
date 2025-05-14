/**
 * @class JetException
 * 
 * @description This class will be the jet exception.
 * It will be used by the framework to throw exceptions.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class JetException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'JetException'
  }
}