import { CategoriesQuery } from '../gql/queries-generated-types';

export type ICategory = CategoriesQuery['categories'][number];
