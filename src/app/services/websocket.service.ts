import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IEmitEvents, IOnEvents } from '../interfaces/events';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket = io('http://localhost:5000');

  public connected$ = new BehaviorSubject(false);

  constructor() {}

  public connect() {
    this.socket.connect();

    this.socket.on('connect', () => {
      this.connected$.next(true);
      console.log('WebsocketService connect');
    });

    this.socket.on('connect_error', (error) => {
      console.log('WebsocketService connect_error', error);
    });

    this.socket.on('disconnect', () => {
      this.connected$.next(false);
      console.log('WebsocketService disconnect');
    });

    return this.connected$;
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket.close();

    return this.connected$;
  }

  public on$<E extends keyof IOnEvents>(event: E) {
    return new Observable<IOnEvents[E]>((observer) => {
      const callBack = (data: IOnEvents[E]) => observer.next(data);
      this.socket.on(event, callBack as any);

      return () => this.socket.off(event, callBack as any);
    });
  }

  public emit<T extends keyof IEmitEvents>(event: T, data: IEmitEvents[T]) {
    console.log('emit DATA', data);
    this.socket.emit('message', { action: event, data });
  }
}