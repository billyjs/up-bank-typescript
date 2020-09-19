import { Fetch } from '../fetch';
import { Endpoint } from '../../common/types';
import { createQuerystring } from '../../utils';
import { TagIdentifier } from '../tags/types';

import { TransactionResponse, TransactionsParams, TransactionsResponse } from './types';

/**
 * Transactions represent the movement of money into and out of an account.
 * They have many characteristics that vary depending on the kind of
 * transaction. Transactions may be temporarily HELD (pending) or SETTLED,
 * typically depending on which payment method was used at the point of sale.
 */
export class Transactions {
  constructor(private fetch: Fetch) {}

  /**
   * Retrieve a list of all transactions across all accounts for the currently
   * authenticated user. The returned list is paginated and can be scrolled by
   * following the next and prev links where present. To narrow the results to
   * a specific date range pass one or both of filter[since] and filter[until]
   * in the query string. These filter parameters should not be used for
   * pagination. Results are ordered newest first to oldest last.
   * @param params
   */
  async list(params?: TransactionsParams): Promise<TransactionsResponse> {
    const { size, ...filters } = params;
    const query = createQuerystring(filters, size);
    const response = await this.fetch.get(`/${Endpoint.TRANSACTIONS}?${query}`);
    return await response.json();
  }

  /**
   * Retrieve a specific transaction by providing its unique identifier.
   * @param id The unique identifier for the transaction.
   */
  async get(id: string): Promise<TransactionResponse> {
    const response = await this.fetch.get(`${Endpoint.TRANSACTIONS}/${id}`);
    return await response.json();
  }

  /**
   * Associates one or more tags with a specific transaction. No more than 6
   * tags may be present on any single transaction. Duplicate tags are silently
   * ignored. An HTTP 204 is returned on success. The associated tags, along
   * with this request URL, are also exposed via the tags relationship on the
   * transaction resource returned from /transactions/{id}.
   * @param transaction The unique identifier for the transaction.
   * @param tags The tags to remove from the transaction.
   */
  async addTags(transaction: string, tags: Array<TagIdentifier>): Promise<boolean> {
    const response = await this.fetch.post(
      `${Endpoint.TRANSACTIONS}/${transaction}/relationships/${Endpoint.TAGS}`,
      tags
    );
    return response.ok;
  }

  /**
   * Disassociates one or more tags from a specific transaction. Tags that are
   * not associated are silently ignored. An HTTP 204 is returned on success.
   * The associated tags, along with this request URL, are also exposed via the
   * tags relationship on the transaction resource returned from /transactions/{id}.
   * @param transaction The unique identifier for the transaction.
   * @param tags The tags to remove from the transaction.
   */
  async removeTags(transaction: string, tags: Array<TagIdentifier>): Promise<boolean> {
    const response = await this.fetch.delete(
      `${Endpoint.TRANSACTIONS}/${transaction}/relationships/${Endpoint.TAGS}`,
      tags
    );
    return response.ok;
  }
}
