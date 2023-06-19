import { EMessageType } from '../enums/message-type';

export interface IMessage {
  id: number;
  message: string;
  userEmail: string;
  type: EMessageType;
}
