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
  receivedMessages$ = new BehaviorSubject<string[]>([]);

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.connect();
    this.websocketService.getMessage().subscribe((message: string) => {
      this.receivedMessages$.next([message, ...this.receivedMessages$.value]);
    });
  }

  sendMessage() {
    this.websocketService.sendMessage(this.message);
    this.message = '';
  }
}
