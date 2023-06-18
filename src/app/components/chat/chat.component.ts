import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message: string;
  receivedMessages$ = new BehaviorSubject<{userEmail: string, message: string}[]>([]);

  constructor(public websocketService: WebsocketService) {

    websocketService.connect();

    websocketService.on$('chatMessage').subscribe((data) => {
      this.receivedMessages$.next([data, ...this.receivedMessages$.value]);
      console.log('asd on$ data', data);
    });

    websocketService.on$('anotherMessage').subscribe((data) => {
      this.receivedMessages$.next([{message: data.text, userEmail: 'test'}, ...this.receivedMessages$.value]);
      console.log('asd on$ data', data);
    });
  }

  ngOnInit() {}

  sendMessage() {
    this.websocketService.emit('chatMessage', this.message);
    this.message = '';
  }

  sendAnotherMessage() {
    this.websocketService.emit('anotherMessage', {
      text: 'TextAnother',
      foo: { bar: 99 },
    });
  }
}
