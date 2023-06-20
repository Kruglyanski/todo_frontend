import {
  Inject,
  Injectable,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BaseComponent implements OnDestroy, OnChanges {
  public destroy$ = new Subject<void>();

  constructor(@Inject('name') private name: string) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(this.name, changes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
