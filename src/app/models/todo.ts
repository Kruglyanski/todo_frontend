import { ETag } from '../enums/tag';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  tag: ETag;
  completed: boolean | null;
  userId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
