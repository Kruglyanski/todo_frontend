import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  public messages$ = new BehaviorSubject<IMessage[]>([]);

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
    this.websocketService.emit('chatMessage', {
      message: this.message,
      type: EMessageType.MESSAGE,
    });
    console.log('emit sendMessage', this.message);
    this.message = '';
  }

  public deleteMessage(msgId: number) {
    this.websocketService.emit('deleteMessage', msgId);
    console.log('emit deleteMessage', msgId);
  }
}
