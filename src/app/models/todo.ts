import { ETag } from '../enums/tag';
import { ICategory } from './category';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  tag: ETag;
  completed: boolean | null;
  userId: number;
  category: Pick<ICategory, 'id' | 'title'>;
  createdAt: string;
  updatedAt: string;
}
