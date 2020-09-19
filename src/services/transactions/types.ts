import {
  RelatedResource,
  Money,
  Resource,
  ResourceType,
  PaginatedResponse,
  NullableRelatedResource,
  RelatedResources,
  Self,
  Params,
  Response,
} from '../../common/types';

export enum TransactionStatus {
  HELD = 'HELD',
  SETTLED = 'SETTLED',
}

export interface TransactionsParams extends Params {
  status?: TransactionStatus;
  since?: string;
  until?: string;
  category?: string;
  tag?: string;
}

interface HoldInfo {
  amount: Money;
  foreignAmount: Money | null;
}

interface RoundUp {
  amount: Money;
  boostPortion: Money | null;
}

interface Cashback {
  description: string;
  amount: Money;
}

interface TransactionAttributes {
  status: TransactionStatus;
  rawText: string | null;
  description: string;
  message: string | null;
  holdInfo: HoldInfo | null;
  roundUp: RoundUp | null;
  cashback: Cashback | null;
  amount: Money;
  foreignAmount: Money | null;
  settledAt: string;
  createdAt: string;
}

interface TransactionRelationships {
  account: RelatedResource<ResourceType.ACCOUNTS>;
  category: NullableRelatedResource<ResourceType.CATEGORIES>;
  parentCategory: NullableRelatedResource<ResourceType.CATEGORIES>;
  tags: RelatedResources<ResourceType.TAGS, Self>;
}

type TransactionResource = Resource<
  ResourceType.TRANSACTIONS,
  TransactionAttributes,
  TransactionRelationships
>;

export type TransactionsResponse = PaginatedResponse<TransactionResource>;

export type TransactionResponse = Response<TransactionResource>;
