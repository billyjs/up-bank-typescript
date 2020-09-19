import { Fetch } from '../fetch';
import { Endpoint } from '../../common/types';
import { TransactionsParams, TransactionsResponse } from '../transactions/types';
import { createQuerystring } from '../../utils';

import { AccountsResponse, AccountResponse } from './types';

/**
 * Accounts represent the underlying store used to track balances and the
 * transactions that have occurred to modify those balances over time. Up
 * currently has two types of account: SAVER—used to earn interest and to
 * hit savings goals, and TRANSACTIONAL—used for everyday spending.
 */
export class Accounts {
  constructor(private fetch: Fetch) {}

  /**
   * Retrieve a paginated list of all accounts for the currently authenticated
   * user. The returned list is paginated and can be scrolled by following the
   * prev and next links where present.
   * @param size The number of records to return in each page.
   */
  async list(size?: number): Promise<AccountsResponse> {
    const query = createQuerystring({}, size);
    const response = await this.fetch.get(`${Endpoint.ACCOUNTS}?${query}`);
    return await response.json();
  }

  /**
   * Retrieve a specific account by providing its unique identifier.
   * @param id The unique identifier for the account.
   */
  async get(id: string): Promise<AccountResponse> {
    const response = await this.fetch.get(`${Endpoint.ACCOUNTS}/${id}`);
    return await response.json();
  }

  /**
   *
   * @param account Retrieve a list of all transactions for a specific account.
   * The returned list is paginated and can be scrolled by following the next
   * and prev links where present. To narrow the results to a specific date
   * range pass one or both of filter[since] and filter[until] in the query
   * string. These filter parameters should not be used for pagination. Results
   * are ordered newest first to oldest last.
   * @param params
   */
  async transactions(account: string, params?: TransactionsParams): Promise<TransactionsResponse> {
    const { size, ...filters } = params;
    const query = createQuerystring(filters, size);
    const response = await this.fetch.get(
      `${Endpoint.ACCOUNTS}/${account}/${Endpoint.TRANSACTIONS}?${query}`
    );
    return await response.json();
  }
}
