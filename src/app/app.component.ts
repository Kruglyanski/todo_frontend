import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory } from './models/category';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoFilterDataService } from './services/todo-filter-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular todo';
  filterValue = '';
  categories$: Observable<ICategory[]>;

  constructor(private categoriesService: CategoriesService) {}

  trackByFn(_: number, item: ICategory): ICategory['id'] {
    return item.id;
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
  }
}
