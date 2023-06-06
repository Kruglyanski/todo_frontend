import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    this.isVisible$.next(true);
  }

  hide() {
    this.isVisible$.next(false);
  }
}
