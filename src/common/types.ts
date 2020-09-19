export interface Resource<T extends ResourceType, U, V> extends ResourceIdentifier<T>, Links<Self> {
  attributes: U;
  relationships: V;
}

export interface ResourceIdentifier<T extends ResourceType> {
  type: T;
  id: string;
}

export interface Links<T> {
  links?: T;
}
export type Self = { self: string };
export type Related = { related: string };

export interface Money {
  currencyCode: string;
  value: string;
  valueInBaseUnits: number;
}

export interface PaginationLinks {
  prev: string | null;
  next: string | null;
}

export interface RelatedResourceData<T extends ResourceType> {
  type: T;
  id: string;
}

export interface PaginatedResponse<T> {
  data: Array<T>;
  links: PaginationLinks;
}

export interface Response<T> {
  data: T;
}

export interface RelatedResource<T extends ResourceType> extends Links<Related> {
  data: RelatedResourceData<T>;
}

export interface NullableRelatedResource<T extends ResourceType> extends Links<Related> {
  data: RelatedResourceData<T> | null;
}

export interface RelatedResources<T extends ResourceType, L> extends Links<L> {
  data: Array<RelatedResourceData<T>>;
}

export enum ResourceType {
  ACCOUNTS = 'accounts',
  CATEGORIES = 'categories',
  TAGS = 'tags',
  TRANSACTIONS = 'transactions',
  WEBHOOK = 'webhook',
  WEBHOOK_EVENTS = 'webhook-events',
  WEBHOOK_DELIVERY_LOGS = 'webhook-delivery-logs',
}

export enum Endpoint {
  ACCOUNTS = 'accounts',
  CATEGORIES = 'categories',
  TAGS = 'tags',
  TRANSACTIONS = 'transactions',
  UTIL = 'util',
  WEBHOOKS = 'webhooks',
}

export interface Params {
  size?: number;
}
