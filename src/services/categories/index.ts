import { Fetch } from '../fetch';
import { Endpoint } from '../../common/types';

import { CategoriesRepsonse, CategoryResponse } from './types';
import { createQuerystring } from '../../utils';

/**
 * Categories enable understanding where your money goes by driving powerful
 * insights in Up. All categories in Up are pre-defined and are automatically
 * assigned to new purchases in most cases. A parent-child relationship is used
 * to represent categories, however parent categories cannot be directly
 * assigned to transactions.
 */
export class Categories {
  constructor(private fetch: Fetch) {}

  /**
   * Retrieve a list of all categories and their ancestry.
   * The returned list is not paginated.
   * @param parent The unique identifier of a parent category for which to return only its children. Providing an invalid category identifier results in a 404 response.
   */
  async list(parent: string): Promise<CategoriesRepsonse> {
    const query = createQuerystring({ parent });
    const response = await this.fetch.get(`${Endpoint.CATEGORIES}?${query}`);
    return await response.json();
  }

  /**
   * Retrieve a specific category by providing its unique identifier.
   * @param id The unique identifier for the category.
   */
  async get(id: string): Promise<CategoryResponse> {
    const response = await this.fetch.get(`${Endpoint.CATEGORIES}/${id}`);
    return await response.json();
  }
}
