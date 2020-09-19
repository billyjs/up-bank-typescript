import {
  Resource,
  ResourceType,
  RelatedResources,
  NullableRelatedResource,
  Related,
  Response,
} from '../../common/types';

interface CategoryAttributes {
  name: string;
}

interface CategoryRelationships {
  parent: NullableRelatedResource<ResourceType.CATEGORIES>;
  children: RelatedResources<ResourceType.CATEGORIES, Related>;
}

type CategoryResource = Resource<
  ResourceType.CATEGORIES,
  CategoryAttributes,
  CategoryRelationships
>;

export type CategoriesRepsonse = Response<Array<CategoryResource>>;

export type CategoryResponse = Response<CategoryResource>;
