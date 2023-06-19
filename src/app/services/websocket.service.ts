import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IEmitEvents, IOnEvents } from '../interfaces/events';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket = io('http://localhost:5000', { auth: { token: '' } });

  constructor(private apiService: ApiService) {
    apiService.token$.pipe(distinctUntilChanged()).subscribe((token) => {
      !!token ? this.connect(token) : this.disconnect();
    });
  }

  public connect(token: string) {
    (this.socket.io.opts as any).auth.token = `Bearer ${token}`;

    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('WebsocketService connect');
    });

    this.socket.on('connect_error', (error) => {
      console.log('WebsocketService connect_error', error);
    });

    this.socket.on('disconnect', () => {
      console.log('WebsocketService disconnect');
    });
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket.close();
  }

  public on$<E extends keyof IOnEvents>(event: E) {
    return new Observable<IOnEvents[E]>((observer) => {
      const callBack = (data: IOnEvents[E]) => observer.next(data);
      this.socket.on(event, callBack as any);

      return () => this.socket.off(event, callBack as any);
    });
  }

  public emit<T extends keyof IEmitEvents>(event: T, data: IEmitEvents[T]) {
    this.socket.emit(event, data);
  }
}
