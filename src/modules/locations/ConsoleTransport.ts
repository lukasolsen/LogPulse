import {LogLocation} from '../logLocation';
import {LogOptions} from '../../types/global';

export class ConsoleTransport extends LogLocation {
  public log(message: string, colors?: string[], options?: LogOptions): void {
    if (
      options.level === 'ERROR' ||
      options.level === 'FATAL' ||
      options.level === 'TRACE' ||
      options.level === 'WARN'
    ) {
      console.trace(message, ...(colors ?? []));
    } else {
      console.log(message, ...(colors ?? []));
    }
  }
}
