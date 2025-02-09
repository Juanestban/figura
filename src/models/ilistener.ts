import { Observable } from 'figura/utils/observable';

export interface ListenerContextTypes {
  listener: Observable;
}

export enum ICommandName {
  DELETE = 'DELETE',
  CANCEL = 'CANCEL',
  COPY = 'COPY',
  SAVE = 'SAVE',
  PASTE = 'PASTE',
}
