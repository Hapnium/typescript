/**
 * @interface UserDetails
 * 
 * @description This interface will be the interface for user details.
 * It will be used by the authentication manager to get user details.
 * 
 * @author Hapnium <contact@nearby.hapnium.com>
 */
export interface UserDetails {
  /**
   * Returns the username of the user.
   */
  getUsername(): string;

  /**
   * Returns the password of the user.
   */
  getPassword(): string;

  /**
   * Returns the salt of the user.
   */
  getSalt(): string;

  /**
   * Returns the roles of the user.
   */
  getRoles(): string[];

  /**
   * Returns the permissions of the user.
   */
  getPermissions(): string[];

  /**
   * Returns true if the user is enabled.
   */
  isEnabled(): boolean;

  /**
   * Returns true if the user's account is not expired.
   */
  isAccountNonExpired(): boolean;

  /**
   * Returns true if the user's account is not locked.
   */
  isAccountNonLocked(): boolean;

  /**
   * Returns true if the user's credentials are not expired.
   */
  isCredentialsNonExpired(): boolean;
}