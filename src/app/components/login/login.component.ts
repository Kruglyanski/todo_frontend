import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserDto } from '../../models/dto/user.dto';
import { ModalService } from '../../services/modal.service';
import { BaseComponent } from '../base-component/base.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent {
  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>(''),
  });

  constructor(
    private modalService: ModalService,
    private apiService: ApiService
  ) {
    super(LoginComponent.name);
  }

  public onSubmit() {
    this.apiService.login(this.form.value as IUserDto);
    this.modalService.hide();
  }

  public get email() {
    return this.form.controls.email as FormControl;
  }

  public get password() {
    return this.form.controls.email as FormControl;
  }
}
