import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {}

  public connect(): void {
    this.socket = io('http://localhost:5000');
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendMessage(message: string): void {
    console.log('sendMessage', message);
    this.socket.emit('message', message);
  }

  public getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (data: string) => {
        console.log('getMessage', data);
        observer.next(data);
      });
    });
  }
}
