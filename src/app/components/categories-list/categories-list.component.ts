import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICategory } from '../../models/category';
import { BehaviorSubject, combineLatest, map, takeUntil } from 'rxjs';
import { BaseComponent } from '../base-component/base.component';
import { CategoriesService } from '../../services/categories.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent extends BaseComponent implements OnInit {
  private filterValue$ = new BehaviorSubject<string>('');

  public filteredCategories$ = combineLatest([
    this.categoriesService.categories$,
    this.filterValue$,
  ]).pipe(
    map(([categories, value]) =>
      categories.map((category) => {
        if (!value) {
          return category;
        }

        const todos = category.todos.filter((t) =>
          t.title.toLowerCase().includes(value.toLowerCase())
        );

        return { ...category, todos };
      })
    )
  );

  @Input() set filterValue(value: string) {
    this.filterValue$.next(value);
  }

  constructor(
    public categoriesService: CategoriesService,
    private apiService: ApiService
  ) {
    super(CategoriesListComponent.name);
  }

  public trackByFn(_: number, item: ICategory) {
    return item.id;
  }

  ngOnInit() {
    this.apiService.token$.pipe(takeUntil(this.destroy$)).subscribe((token) => {
      if (token) {
        this.categoriesService.getAllGQL();
      }
    });
  }
}
