import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { BaseComponent } from '../base-component/base.component';
import { ApiService } from '../../api.service';
import { ModalService } from '../../services/modal.service';
import { EModalType } from '../../enums/modal-type';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
  EModalType = EModalType;
  showDeleteButton$ = new BehaviorSubject<boolean>(false);
  filterValue$ = new BehaviorSubject<string>('');

  @Input() set filterValue(value: string) {
    this.filterValue$.next(value);
  }

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public todoService: TodosService,
    private apiService: ApiService,
    public modalService: ModalService
  ) {
    super(HeaderComponent.name);
  }

  ngOnInit() {
    this.filterValue$
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        console.log('EMIT filterChanged', value);
        this.filterChanged.emit(value);
      });

//ПЕРЕДЕЛАТЬ?

    this.todoService.selectedTodos$
    .pipe(takeUntil(this.destroy$))
    .subscribe(array => {
      if(array.length) {
        this.showDeleteButton$.next(true);
      } else {
        this.showDeleteButton$.next(false);
      }
    })
  }

  deleteSelectedTodos() {
    this.todoService.deleteManyGQL();
  }

  logout() {
    this.apiService.token$.next('');
    localStorage.removeItem('token');
  }
}
