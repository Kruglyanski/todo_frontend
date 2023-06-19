import { EUserEvents } from '../enums/user-events';

export interface IOnEvents {
  chatMessage: { message: string; userEmail: string };
  userSign: { value: 'in' | 'out'; userEmail: string };
  userEvent: { userEvent: EUserEvents; entityTitle: string; userEmail: string };
  clientConnected: any
}

export interface IEmitEvents {
  chatMessage: string;
  userSign: { value: 'in' | 'out' };
  userEvent: { userEvent: EUserEvents; entityTitle: string | string[] };
}
