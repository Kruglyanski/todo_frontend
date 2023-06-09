import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { ICategory } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { BaseComponent } from '../base-component/base.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent extends BaseComponent {
  c: ICategory[] = [];
  category$ = new BehaviorSubject<ICategory | null>(null);
  isOpen: boolean = false;
  // @Input() category: ICategory;
  @Input() set category(category: ICategory) {
    this.category$.next(category);
  }

  constructor(private categoriesService: CategoriesService) {
    super(CategoryComponent.name);
    this.categoriesService.categories$.subscribe((c) => (this.c = c));
  }

  trackByFn(_: number, item: ITodo): ITodo['id'] {
    return item.id;
  }

  deleteCategory() {
    const category = this.category$.getValue();
    category && this.categoriesService.delete(category.id);
  }

  openCategory() {
    this.isOpen = !this.isOpen;
  }
}
