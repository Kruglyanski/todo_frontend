import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { EModalType } from '../../enums/modal-type';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modalType: EModalType;
  constructor(public modalService: ModalService) {}
}
