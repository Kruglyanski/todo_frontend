import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { BehaviorSubject } from 'rxjs';
import { EUserEvents } from '../../enums/user-events';
import { EMessageColors } from '../../enums/message-colors';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  public message: string;
  public receivedMessages$ = new BehaviorSubject<
    { message: string; color: EMessageColors }[]
  >([]);

  constructor(public websocketService: WebsocketService) {
    websocketService.connect();

    websocketService.on$('clientConnected').subscribe((data) => {
     
      console.log('asd on$ clientConnected', data);
    });

    websocketService.on$('chatMessage').subscribe((data) => {
      const message = `User "${data.userEmail}": msg: ${data.message}`;

      this.receivedMessages$.next([
        { message, color: EMessageColors.BLUE },
        ...this.receivedMessages$.value,
      ]);
      console.log('asd on$ chatMessage', data);
    });

    websocketService.on$('userSign').subscribe((data) => {
      const message = `User "${
        data.userEmail
      }": sign ${data.value.toUpperCase()}`;
      const color =
        data.value === 'in' ? EMessageColors.VIOLET : EMessageColors.BROWN;

      this.receivedMessages$.next([
        { message, color },
        ...this.receivedMessages$.value,
      ]);
      console.log('asd on$ userSign', data);
    });

    websocketService
      .on$('userEvent')
      .subscribe(({ userEmail, userEvent, entityTitle }) => {
        let message: string;
        if (Array.isArray(entityTitle) && entityTitle.length > 1) {
          message = `User "${userEmail}": ${userEvent.toLowerCase()}s: ${entityTitle.join(
            ' , '
          )}`;
        } else {
          message = `User "${userEmail}": ${userEvent.toLowerCase()} ${entityTitle}`;
        }

        const getColor = () => {
          switch (userEvent) {
            case EUserEvents.CREATE_CATEGORY:
              return EMessageColors.SKYBLUE;
            case EUserEvents.CREATE_TODO:
              return EMessageColors.GREEN;
            case EUserEvents.DELETE_CATEGORY:
              return EMessageColors.ORANGE;
            case EUserEvents.DELETE_TODO:
              return EMessageColors.RED;
            default:
              return EMessageColors.BLUE;
          }
        };

        this.receivedMessages$.next([
          { message, color: getColor() },
          ...this.receivedMessages$.value,
        ]);
        console.log('asd on$ userEvent', { userEmail, userEvent, entityTitle });
      });
  }

  public sendMessage() {
    this.websocketService.emit('chatMessage', this.message);
    this.message = '';
  }
}
