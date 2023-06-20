import { CategoriesQuery } from '../gql/queries-generated-types';

export type ITodo = CategoriesQuery['categories'][number]['todos'][number];
