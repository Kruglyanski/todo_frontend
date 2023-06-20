import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { EMessageType } from '../../enums/message-type';
import { IMessage } from '../../models/message';
import { ApiService } from '../../services/api.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent extends BaseComponent {
  public message: string;
  public editingMessageId: number | null = null;
  public messages$ = new BehaviorSubject<IMessage[]>([]);

  @ViewChild('input', { static: false, read: ElementRef })
  input: ElementRef<HTMLInputElement>;

  constructor(
    public websocketService: WebsocketService,
    public apiService: ApiService
  ) {
    super(ChatComponent.name);

    websocketService
      .on$('clientConnected')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('on$ clientConnected', data);
        this.messages$.next(data.sort((a, b) => b.id - a.id));
      });

    websocketService
      .on$('chatMessage')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.messages$.next(
          [data, ...this.messages$.value].sort((a, b) => b.id - a.id)
        );
        console.log('on$ chatMessage', data);
      });

    websocketService
      .on$('editMessage')
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => {
        this.messages$.next(
          this.messages$.value.map((m) => {
            if (m.id === msg.id) {
              return { ...m, message: msg.message };
            }
            return m;
          })
        );
        console.log('on$ editMessage', msg);
      });

    websocketService
      .on$('deleteMessage')
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgId) => {
        this.messages$.next(
          this.messages$.value.filter((msg) => msg.id !== msgId)
        );
        console.log('on$ deleteMessage', msgId);
      });
  }

  public sendMessage() {
    if (this.editingMessageId) {
      this.websocketService.emit('editMessage', {
        message: this.message,
        id: this.editingMessageId,
      });

      this.editingMessageId = null;

      console.log('emit editMessage', this.message);
    } else {
      this.websocketService.emit('chatMessage', {
        message: this.message,
        type: EMessageType.MESSAGE,
      });

      console.log('emit sendMessage', this.message);
    }

    this.message = '';
  }

  public editMessage(msg: IMessage) {
    this.editingMessageId = msg.id;
    this.message = msg.message;
    this.input.nativeElement.focus();

    console.log('editMessage', msg);
  }

  public deleteMessage(msgId: number) {
    this.websocketService.emit('deleteMessage', msgId);

    console.log('emit deleteMessage', msgId);
  }
}
