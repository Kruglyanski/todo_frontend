import { ETag } from '../../enums/tag';

export interface CreateTodoDto {
  title: string;
  description: string;
  categoryId: number;
  tag: ETag;
}
