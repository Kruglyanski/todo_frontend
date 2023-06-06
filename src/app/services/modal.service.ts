import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EModalType } from '../enums/modal-type';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);
  modalType: EModalType;

  constructor() {}

  show(modalType: EModalType) {
    this.modalType = modalType;
    this.isVisible$.next(true);
  }

  hide() {
    this.isVisible$.next(false);
  }
}
