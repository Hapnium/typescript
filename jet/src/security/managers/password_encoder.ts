import { JetSecurityException } from '../exceptions/jet_security_exception';

/**
 * @enum AlgorithmLabel
 *
 * @description This enum will be the algorithm label.
 * It will be used by the password encoder to hash the password.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
type AlgorithmLabel = 'bcrypt' | 'argon2id' | 'argon2d' | 'argon2i'

/**
 * PasswordAdapter
 *
 * Interface for password adapters.
*/
export interface PasswordAdapter {
  /** 
   * @function hash
   *
   * @description This function will be the hash.
   * It will be used by the password encoder to hash the password.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */

  hash(password: string): Promise<string>;
  /**
   * @function verify
   *
   * @description This function will be the verify.
   * It will be used by the password encoder to verify the password.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  verify(password: string, hashed: string): Promise<boolean>;
}
  
/**
 * BunPasswordAdapterFactory
 *
 * Creates a Bun adapter with dynamic algorithm and cost.
*/
async function createBunPasswordAdapter(options?: {algorithm?: AlgorithmLabel; cost?: number}): Promise<PasswordAdapter> {
  if (!globalThis.Bun) {
    throw new JetSecurityException('Bun is not available and no custom adapter was provided. Please provide a PasswordAdapter.')
  }

  const algorithm = (options?.algorithm ?? 'bcrypt') as any;
  const cost = options?.cost ?? 10

  return {
    hash: (password: string) => globalThis.Bun.password.hash(password, {algorithm: algorithm, cost: cost}),
    verify: (password: string, hashed: string) => globalThis.Bun.password.verify(password, hashed),
  }
}
  
/**
 * PasswordEncoder
 *
 * - Defaults to Bun (if available)
 * - Allows injection of any password adapter
*/
export class PasswordEncoder {
  private adapter!: PasswordAdapter

  /**
   * Constructor supports:
   * - Explicit adapter
   * - Bun options (if Bun is detected)
   */
  constructor(adapterOrOptions?: PasswordAdapter | { algorithm?: AlgorithmLabel; cost?: number }) {
    if (typeof adapterOrOptions === 'object' && 'hash' in adapterOrOptions) {
      // Custom adapter passed
      this.adapter = adapterOrOptions
    } else {
      // Try to initialize Bun adapter dynamically
      this.initBunAdapter(adapterOrOptions).catch(() => {
        throw new JetSecurityException('Bun is not available and no custom adapter was provided. Please provide a PasswordAdapter.')
      })
    }
  }

  /** 
   * @function initBunAdapter
   *
   * @description This function will be the init bun adapter.
   * It will be used by the password encoder to initialize the bun adapter.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  private async initBunAdapter(options?: { algorithm?: AlgorithmLabel; cost?: number }) {
    this.adapter = await createBunPasswordAdapter(options)
  }

  /**
   * @function encode
   *
   * @description This function will be the encode.
   * It will be used by the password encoder to encode the password.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  async encode(password: string): Promise<string> {
    if (!this.adapter) throw new JetSecurityException('Password adapter not initialized.')
    return this.adapter.hash(password)
  }

  /** 
   * @function matches
   *
   * @description This function will be the matches.
   * It will be used by the password encoder to match the password.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  async matches(rawPassword: string, hashedPassword: string): Promise<boolean> {
    if (!this.adapter) throw new JetSecurityException('Password adapter not initialized.')
    return this.adapter.verify(rawPassword, hashedPassword)
  }
}