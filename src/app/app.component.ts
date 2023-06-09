import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory } from './models/category';
import { Observable } from 'rxjs';
import { ModalService } from './services/modal.service';
import { TodosService } from './services/todos.service';
import { EModalType } from './enums/modal-type';
import { AuthService } from './services/auth.service';
import { ApiService } from './api.service';
import { BaseComponent } from './components/base-component/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'Welcome to todo app';
  token = '';
  filterValue = '';
  //categories$: Observable<ICategory[]>;
  EModalType = EModalType;
  constructor(
    public categoriesService: CategoriesService,
    public modalService: ModalService,
    public todoService: TodosService,
    public authService: AuthService,
    public apiService: ApiService
  ) {
    super(AppComponent.name);
  }

  trackByFn(_: number, item: ICategory): ICategory['id'] {
    return item.id;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.apiService.token$.next(token);
    }

    this.apiService.token$.subscribe((token) => {
      this.token = token;
      if (this.token) {
        this.categoriesService.getAll();
      }
    });
  }

  deleteSelectedTodos() {
    this.todoService.deleteMany();
  }

  logout() {
    this.apiService.token$.next('');
    localStorage.removeItem('token');
  }
}
