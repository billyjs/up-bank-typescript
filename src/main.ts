import { Fetch } from './services/fetch';
import { Accounts } from './services/accounts';
import { Categories } from './services/categories';
import { Tags } from './services/tags';
import { Transactions } from './services/transactions';
import { Util } from './services/util';

const baseUrl = 'https://api.up.com.au/api/v1';

export class Up {
  private fetch: Fetch;

  accounts: Accounts;
  categories: Categories;
  tags: Tags;
  transactions: Transactions;
  util: Util;

  constructor(apiKey: string) {
    this.fetch = new Fetch(baseUrl, apiKey);
    this.accounts = new Accounts(this.fetch);
    this.categories = new Categories(this.fetch);
    this.tags = new Tags(this.fetch);
    this.transactions = new Transactions(this.fetch);
    this.util = new Util(this.fetch);
  }
}
