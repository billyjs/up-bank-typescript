import { Fetch } from '../fetch';
import { Endpoint } from '../../common/types';
import { createQuerystring } from '../../utils';

import { TagsResponse } from './types';

/**
 * Tags are custom labels that can be associated with transactions on Up.
 * Within the Up application, tags provide additional insight into spending.
 * For example, you could have a "Take Away" tag that you apply to purchases
 * from food delivery services. The Up API allows you to manage the tags
 * associated with transactions. Each transaction may have up to 6 tags.
 *
 * Tags are identified by their labels, which are unique strings, so the tag
 * "Holiday" has also the id "Holiday".
 */
export class Tags {
  constructor(private fetch: Fetch) {}

  /**
   * Retrieve a list of all tags currently in use. The returned list is paginated
   * and can be scrolled by following the next and prev links where present.
   * Results are ordered lexicographically. The transactions relationship for
   * each tag exposes a link to get the transactions with the given tag.
   * @param size The number of records to return in each page.
   */
  async list(size?: number): Promise<TagsResponse> {
    const query = createQuerystring({}, size);
    const response = await this.fetch.get(`${Endpoint.TAGS}?${query}`);
    return await response.json();
  }
}
