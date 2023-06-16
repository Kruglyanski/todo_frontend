import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IEmitEvents, IListenEvents } from '../interfaces/events';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {}

  public connect(): void {
    this.socket = io('http://localhost:5000');

    const request = async (
      event: string,
      data: { [key: string]: unknown } = {}
    ) => {
      console.log('WSS request: ', data);
      return await new Promise((resolve) => {
        this.socket.emit(event, data, resolve);
      });
    };

    //   const on = <
    //   T extends IListenEventsMap = IListenEventsMap,
    //   E extends keyof IListenEventsMap = keyof IListenEventsMap
    // >(
    //   event: E,
    //   fn: T[E]
    // ) => {
    //   return socket.on(event as string, data => {
    //     this.logger.log(event, data);
    //     return fn(data);
    //   });
    // };

    // on('resetActivity', data => {
    //   IndicatorService.removeActivityIndicators(data.id);
    // });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendMessage(
    eventName: keyof IEmitEvents,
    data: IEmitEvents[keyof IEmitEvents]
  ): void {
    console.log('sendMessage', data, eventName);
    this.socket.emit('message', { action: eventName, data });
  }

  public getMessage(): Observable<{
    data: IListenEvents[keyof IListenEvents];
    event: keyof IListenEvents;
  }> {
    return new Observable((observer) => {
      const on = (event: keyof IListenEvents) => {
        this.socket.on(event, (data) => {
          observer.next({ data, event });
        });
      };

      on('chatMessage');
      on('anotherMessage');
    });
  }

  // public getAnotherMessage(): Observable<string> {
  //   return new Observable<string>((observer) => {
  //     this.socket.on('anotherMessage', (data: any) => {
  //       console.log('getanotherMessage', data);
  //       observer.next(data);
  //     });
  //   });
  // }

  // public getConnectedMessage(): Observable<string> {
  //   return new Observable<string>((observer) => {
  //     this.socket.on('clientConnected', (data: any) => {
  //       console.log('clientConnected', data);
  //       observer.next(data);
  //     });
  //   });
  // }
}
