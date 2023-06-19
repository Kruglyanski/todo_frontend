import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserDto } from '../../models/dto/user.dto';
import { ModalService } from '../../services/modal.service';
import { BaseComponent } from '../base-component/base.component';
import { ApiService } from '../../services/api.service';
import { WebsocketService } from '../../services/websocket.service';
import { EMessageType } from '../../enums/message-type';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignComponent extends BaseComponent {
  public isSubmitClicked = false;
  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>(''),
  });

  @Input() type: 'register' | 'login';

  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
    private wss: WebsocketService
  ) {
    super(SignComponent.name);
  }

  public onSubmit() {
    this.isSubmitClicked = true;

    if (this.form.valid) {
      switch (this.type) {
        case 'register': {
          this.apiService.registerGQL(this.form.value as IUserDto);
          break;
        }
        case 'login': {
          this.apiService.loginGQL(this.form.value as IUserDto);
          break;
        }
      }

      this.modalService.hide();
      this.isSubmitClicked = false;
      this.wss.emit('chatMessage', { type: EMessageType.SIGN_IN });
    }
  }

  public get email() {
    return this.form.controls.email as FormControl;
  }

  public get password() {
    return this.form.controls.email as FormControl;
  }
}
