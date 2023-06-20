import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { EModalType } from '../../enums/modal-type';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContentComponent extends BaseComponent {
  public EModalType = EModalType;

  constructor(public modalService: ModalService) {
    super(ModalContentComponent.name);
  }
}
