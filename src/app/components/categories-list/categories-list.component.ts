import { Component, OnInit } from '@angular/core';
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
})
export class CategoriesListComponent extends BaseComponent implements OnInit {
  categories$ = new BehaviorSubject<ICategory[] | null>(null);

  constructor(
    public todoService: TodosService,
    public categoriesService: CategoriesService,
    private apiService: ApiService
  ) {
    super(CategoriesListComponent.name);
  }

  trackByFn(_: number, item: ICategory): ICategory['id'] {
    return item.id;
  }

  ngOnInit() {
    this.categoriesService.categories$.subscribe((categories) => {
      this.categories$.next(categories);
    });

    this.apiService.token$.subscribe((token) => {
      if (token) {
        this.categoriesService.getAll();
      }
    });
  }
}
