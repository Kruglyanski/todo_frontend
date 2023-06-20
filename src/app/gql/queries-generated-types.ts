import * as Types from './global-types';

export type CategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { categories: Array<(
    Pick<Types.Category, 'title' | 'id'>
    & { todos: Array<Pick<Types.Todo, 'completed' | 'description' | 'id' | 'tag' | 'title' | 'categoryId'>> }
  )> };
