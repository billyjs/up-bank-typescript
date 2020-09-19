import {
  Related,
  Links,
  Resource,
  ResourceType,
  PaginatedResponse,
  ResourceIdentifier,
} from '../../common/types';

interface TagRelationships {
  transactions: Links<Related>;
}

type TagResource = Resource<ResourceType.TAGS, {}, TagRelationships>;

export type TagsResponse = PaginatedResponse<TagResource>;

export type TagIdentifier = ResourceIdentifier<ResourceType.TAGS>;
