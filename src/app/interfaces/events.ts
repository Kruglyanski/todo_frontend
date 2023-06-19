import { EMessageType } from '../enums/message-type';
import { IMessage } from '../models/message';

export interface IOnEvents {
  chatMessage: IMessage;
  editMessage: { id: number; message: string };
  deleteMessage: number;
  clientConnected: IMessage[];
}

export interface IEmitEvents {
  chatMessage: {
    message?: string;
    type: EMessageType;
    entityTitle?: string[];
  };
  editMessage: { id: number; message: string };
  deleteMessage: number;
}
