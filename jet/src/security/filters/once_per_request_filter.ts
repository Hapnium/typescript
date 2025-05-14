import type { HttpContext } from '../../controllers/rest_controller';

/**
 * @abstract OncePerRequestFilter
 *
 * @description This abstract class will be the once per request filter.
 * It will be used to filter the request only once.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
*/
export abstract class OncePerRequestFilter {
  /**
   * @private
   *
   * @description This property will be the applied.
   * It will be used to store the applied context.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */ 
  private applied = new WeakSet<HttpContext>();

  /**
   * @function doFilter
   *
   * @description This function will be the do filter.
   * It will be used to filter the request only once.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  public async doFilter(ctx: HttpContext, next: () => Promise<void>) {
    if (this.applied.has(ctx)) return next();
    this.applied.add(ctx);
    await this.filter(ctx, next);
  }

  /**
   * @function filter
   *
   * @description This function will be the filter.
   * It will be used to filter the request.
   *
   * @author Hapnium <contact@nearby.hapnium.com>
  */
  protected abstract filter(ctx: HttpContext, next: () => Promise<void>): Promise<void>;
}