import {
  Money,
  ResourceType,
  Links,
  Related,
  Resource,
  Response,
  PaginatedResponse,
} from '../../common/types';

enum AccountType {
  SAVER = 'SAVER',
  TRANSACTIONAL = 'TRANSACTIONAL',
}

interface AccountAttributes {
  displayName: string;
  accountType: AccountType;
  balance: Money;
  createdAt: string;
}

interface AccountRelationships {
  transactions: Links<Related>;
}

type AccountResource = Resource<ResourceType.ACCOUNTS, AccountAttributes, AccountRelationships>;

export type AccountsResponse = PaginatedResponse<AccountResource>;

export type AccountResponse = Response<AccountResource>;
