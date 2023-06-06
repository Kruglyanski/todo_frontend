import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory } from './models/category';
import { Observable } from 'rxjs';
import { ModalService } from './services/modal.service';
import { TodosService } from './services/todos.service';
import { EModalType } from './enums/modal-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // title = 'angular todo';
  filterValue = '';
  //categories$: Observable<ICategory[]>;
  EModalType = EModalType;
  constructor(
    public categoriesService: CategoriesService,
    public modalService: ModalService,
    public todoService: TodosService
  ) {}

  trackByFn(_: number, item: ICategory): ICategory['id'] {
    return item.id;
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe();
  }

  deleteSelectedTodos() {
    this.todoService.deleteMany().subscribe();
  }
}
