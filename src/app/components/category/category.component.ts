import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '../../models/todo';
import { ICategory } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { BaseComponent } from '../base-component/base.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { Category } from '../../gql/global-types';
import { CategoriesQuery } from '../../gql/queries-generated-types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent extends BaseComponent {
  public category$ = new BehaviorSubject<ICategory | null>(null);
  public isOpen: boolean = true;

  @Input() set category(category: ICategory) {
    this.category$.next(category);
  }

  constructor(private categoriesService: CategoriesService) {
    super(CategoryComponent.name);
  }

  trackByFn(_: number, item: ITodo): ITodo['id'] {
    return item.id;
  }

  public deleteCategory() {
    const category = this.category$.getValue();
    category && this.categoriesService.deleteGQL(category.id);
  }

  public toggleCategory() {
    this.isOpen = !this.isOpen;
  }
}
