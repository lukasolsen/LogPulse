import {LogLocation} from '../logLocation';

export class FileTransport extends LogLocation {
  public log(message: string, colors?: string[], options?): void {
    throw new Error('Method not implemented.');
  }
}
