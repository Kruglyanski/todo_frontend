import { Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { ICategory } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category: ICategory;

  constructor(private categoriesService: CategoriesService) {}

  trackByFn(_: number, item: ITodo): ITodo['id'] {
    return item.id;
  }

  deleteCategory() {
    this.categoriesService.delete(this.category).subscribe();
  }
}
