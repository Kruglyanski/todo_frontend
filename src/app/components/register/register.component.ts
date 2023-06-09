import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { IUserDto } from '../../models/dto/user.dto';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent {
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>(''),
    role: new FormControl<string>(''),
  });

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
    super(RegisterComponent.name);
  }

  onSubmit() {
    this.authService.register(this.form.value as IUserDto);
    this.modalService.hide();
  }

  get email() {
    return this.form.controls.email as FormControl;
  }

  get password() {
    return this.form.controls.email as FormControl;
  }
}
