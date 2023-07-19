import {getLogLevelName} from '../../constants/LogLevels';
import {LogLevelUsageType, LogType} from '../../types/logManager';
import {Singleton} from '../../utils/Singleton';

export class FormatManager extends Singleton<FormatManager> {
  private format: string;

  constructor() {
    super();

    const DEFAULT_FORMAT =
      '%{silver}[%{teal}%{timestamp}%{silver}] %{silver}[%{uppercase}%{logLevel}%{silver}]%{reset} %{message}';
    this.format = DEFAULT_FORMAT;
  }

  public setFormat(format: string): void {
    this.format = format;
  }

  public getFormat(): string {
    return this.format;
  }

  public formatMessage(log: LogType): string {
    const message = this.format
      .replace(
        /%\{timestamp\}/g,
        this.formatTimestamp(log.timestamp.toString())
      )
      .replace(/%\{logLevel\}/g, log.logLevel.toString())
      .replace(
        /%\{message\}/g,
        getLogLevelName(log.message as LogLevelUsageType).toString()
      );
    return message;
  }

  private getCurrentTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private formatTimestamp(timestamp: string): string {
    return new Date(parseInt(timestamp)).toLocaleString();
  }
}
