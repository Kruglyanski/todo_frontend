import { CategoriesQuery } from '../gql/queries-generated-types';
import { ITodo } from './todo';
import { IUser } from './user';

export type ICategory = CategoriesQuery['categories'][number];
//{
// id: number;
// title: string;
// todos: ITodo[];
// user?: IUser;
//}
