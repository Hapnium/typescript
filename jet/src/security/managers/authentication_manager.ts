import { UsernameNotFoundException } from "../exceptions/username_not_found_exception";
import type { PasswordEncoder } from "./password_encoder";
import type { UserDetails } from "./user_details";

/**
 * @interface UserDetailsService
 * 
 * @description This interface will be the user details service.
 * It will be used by the authentication manager to get user details.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export interface UserDetailsService {
  /**
   * @function loadUserByUsername
   * 
   * @description This function will be the load user by username.
   * It will be used by the authentication manager to load user details.
   * 
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  loadUserByUsername(username: string): Promise<UserDetails | null>
}

/**
 * @class AuthenticationManager
 * 
 * @description This class will be the authentication manager.
 * It will be used by the authentication manager to authenticate the user.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export class AuthenticationManager {
  constructor(private userDetailsService: UserDetailsService, private passwordEncoder: PasswordEncoder) {}

  /**
   * @function authenticate
   * 
   * @description This function will be the authenticate.
   * It will be used by the authentication manager to authenticate the user.
   * 
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  async authenticate(username: string, password: string): Promise<UserDetails> {
    const user = await this.userDetailsService.loadUserByUsername(username)
    if (!user) {
      throw new UsernameNotFoundException('User not found')
    }

    const passwordMatches = await this.passwordEncoder.matches(password, user.getPassword())
    if (!passwordMatches) {
      throw new UsernameNotFoundException('Invalid credentials')
    }

    return user
  }
}