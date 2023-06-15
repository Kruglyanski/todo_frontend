import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICategory } from '../../models/category';
import { TodosService } from '../../services/todos.service';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../base-component/base.component';
import { CategoriesService } from '../../services/categories.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent extends BaseComponent implements OnInit {
  categories$ = new BehaviorSubject<ICategory[]>([]);
  @Input() filterValue: string = '';

  constructor(
    public todoService: TodosService,
    public categoriesService: CategoriesService,
    private apiService: ApiService
  ) {
    super(CategoriesListComponent.name);
  }

  trackByFn(_: number, item: ICategory): ICategory['id'] {
    return item?.id;
  }

  filterCategories() {
    const filteredCategories = this.todoService.filterTodos(
      this.categoriesService.categories$.getValue(),
      this.filterValue
    );
    this.categories$.next(filteredCategories);
  }

  ngOnInit() {
    this.categoriesService.categories$.subscribe((categories) => {
      this.categories$.next(categories);
    });

    this.apiService.token$.subscribe((token) => {
      if (token) {
        this.categoriesService.getAllGQL();
        //this.categoriesService.getAll(); //REST
      }
    });
  }

  override ngOnChanges() {
    this.filterCategories();
  }
}
