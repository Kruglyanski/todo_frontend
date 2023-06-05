import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { ICategory } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category: ICategory;

  trackByFn(_: number, item: ITodo): ITodo['id'] {
    return item.id;
  }
}
