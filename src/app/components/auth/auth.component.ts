import { Component } from '@angular/core';
import { BaseComponent } from '../base-component/base.component';
import { ModalService } from '../../services/modal.service';
import { ApiService } from '../../api.service';
import { EModalType } from '../../enums/modal-type';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseComponent {
  EModalType = EModalType;
  title = 'Welcome to todo app';
  constructor(
    public modalService: ModalService,
    public apiService: ApiService
  ) {
    super(AuthComponent.name);
  }
}
