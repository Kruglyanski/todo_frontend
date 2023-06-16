import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { BehaviorSubject } from 'rxjs';
import { IListenEvents } from '../../interfaces/events';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message: string;
  receivedMessages$ = new BehaviorSubject<string[]>([]);

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.connect();
    this.websocketService.getMessage().subscribe(({ data, event }) => {
      console.log('GETMESS data', data);
      console.log('GETMESS data', event);
      if (event === 'chatMessage') {
        this.receivedMessages$.next([
          data as IListenEvents[typeof event],
          ...this.receivedMessages$.value,
        ]);
      } else {
        console.log('ELSE');
      }
    });
    // <
    //   T extends IListenEventsMap = IListenEventsMap,
    //   E extends keyof IListenEventsMap = keyof IListenEventsMap
    // >(
    //   event: E,
    //   fn: T[E]
    // this.websocketService.getConnectedMessage().subscribe((message: string) => {
    //   console.log('CONNECTED')
    //   //this.receivedMessages$.next([message, ...this.receivedMessages$.value]);
    // });

    // this.websocketService.getAnotherMessage().subscribe((data: any) => {
    //   console.log('asd getAnotherMessage', )
    //   this.receivedMessages$.next([data.text, ...this.receivedMessages$.value]);
    // });
  }

  sendMessage() {
    this.websocketService.sendMessage('chatMessage', this.message);
    this.message = '';
  }

  sendAnotherMessage() {
    this.websocketService.sendMessage('anotherMessage', {
      text: 'TextAnother',
      foo: { bar: 99 },
    });
    this.message = '';
  }
}
