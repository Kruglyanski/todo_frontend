import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { BaseComponent } from '../base-component/base.component';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { EModalType } from '../../enums/modal-type';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import { CategoriesService } from '../../services/categories.service';
import { EMessageType } from '../../enums/message-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
  public EModalType = EModalType;
  public showDeleteButton$ = new BehaviorSubject<boolean>(false);
  public filterValue$ = new BehaviorSubject<string>('');

  @Input() public set filterValue(value: string) {
    this.filterValue$.next(value);
  }

  @Output() public filterChanged: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    public todoService: TodosService,
    public categoriesService: CategoriesService,
    private apiService: ApiService,
    public modalService: ModalService,
    public wss: WebsocketService
  ) {
    super(HeaderComponent.name);
  }

  ngOnInit() {
    this.filterValue$
      .pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.filterChanged.emit(value);
      });

    this.todoService.selectedTodos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((array) => {
        this.showDeleteButton$.next(!!array.length);
      });
  }

  public deleteSelectedTodos() {
    this.todoService.deleteManyGQL();
  }

  public logout() {
    this.wss.emit('chatMessage', { type: EMessageType.SIGN_OUT });
    this.apiService.token$.next('');
    this.apiService.email$.next('');
    localStorage.clear();
  }
}
