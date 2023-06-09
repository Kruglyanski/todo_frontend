import { ETag } from '../../enums/tag';

export interface ICreateTodoDto {
  title: string;
  description: string;
  categoryId: number;
  tag: ETag;
}
