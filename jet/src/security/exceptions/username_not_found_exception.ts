/**
 * @class UsernameNotFoundException
 * 
 * @description This class will be the username not found exception.
 * It will be used by the authentication manager to throw username not found exceptions.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class UsernameNotFoundException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UsernameNotFoundException'
  }
}