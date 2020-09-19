import { Fetch } from '../fetch';
import { Endpoint } from '../../common/types';

import { PingResponse } from './types';

/**
 * Some endpoints exist not to expose data, but to test the API itself.
 * Currently there is only one endpoint in this group: ping!
 */
export class Util {
  constructor(private fetch: Fetch) {}

  /**
   * Make a basic ping request to the API. This is useful to verify that
   * authentication is functioning correctly. On authentication success an HTTP
   * 200 status is returned. On failure an HTTP 401 error response is returned.
   */
  async ping(): Promise<PingResponse> {
    const response = await this.fetch.get(`${Endpoint.UTIL}/ping`);
    return await response.json();
  }
}
