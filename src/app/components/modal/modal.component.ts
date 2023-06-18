import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { EModalType } from '../../enums/modal-type';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent extends BaseComponent {
  @Input() public modalType: EModalType;

  constructor(public modalService: ModalService) {
    super(ModalComponent.name);
  }
}
