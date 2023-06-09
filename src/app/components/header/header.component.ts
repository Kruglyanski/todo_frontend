import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { BaseComponent } from '../base-component/base.component';
import { ApiService } from '../../api.service';
import { ModalService } from '../../services/modal.service';
import { EModalType } from '../../enums/modal-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
  EModalType = EModalType;

  constructor(
    public todoService: TodosService,
    private apiService: ApiService,
    public modalService: ModalService
  ) {
    super(HeaderComponent.name);
  }

  deleteSelectedTodos() {
    this.todoService.deleteMany();
  }

  logout() {
    this.apiService.token$.next('');
    localStorage.removeItem('token');
  }
}
