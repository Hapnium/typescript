/**
 * @class JetSecurityException
 * 
 * @description This class will be the jet security exception.
 * It will be used by the framework to throw exceptions.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class JetSecurityException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'JetSecurityException'
  }
}