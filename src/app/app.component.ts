import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
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
  EModalType = EModalType;
  filterValue: string = '';

  constructor(
    public categoriesService: CategoriesService,
    public modalService: ModalService,
    public todoService: TodosService,
    public authService: AuthService,
    public apiService: ApiService
  ) {
    super(AppComponent.name);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('HEADER', { Authorization: `Bearer ${token}` });

    if (token) {
      this.apiService.token$.next(token);
    }
  }

  onFilterChanged(filterValue: string) {
    this.filterValue = filterValue;
  }
}
