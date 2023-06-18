import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { IUserDto } from '../../models/dto/user.dto';
import { BaseComponent } from '../base-component/base.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends BaseComponent {
  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>(''),
    role: new FormControl<string>(''),
  });

  constructor(
    private modalService: ModalService,
    private apiService: ApiService
  ) {
    super(RegisterComponent.name);
  }

  public onSubmit() {
    this.apiService.register(this.form.value as IUserDto);
    this.modalService.hide();
  }

  public get email() {
    return this.form.controls.email as FormControl;
  }

  public get password() {
    return this.form.controls.email as FormControl;
  }
}
