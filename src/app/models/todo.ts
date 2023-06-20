import { ETag } from '../enums/tag';
import { CategoriesQuery } from '../gql/queries-generated-types';
import { ICategory } from './category';

export type ITodo = CategoriesQuery['categories'][number]['todos'][number];
// {
//   id: number;
//   title: string;
//   description: string;
//   tag: ETag;
//   completed: boolean | null;
//   userId: number;
//   category?: Pick<ICategory, 'id' | 'title'>;
//   categoryId: number;
// }
