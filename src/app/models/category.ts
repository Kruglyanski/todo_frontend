import { ITodo } from './todo';
import { IUser } from './user';

export interface ICategory {
  id: number;
  title: string;
  todos: ITodo[];
  user?: IUser;
}
