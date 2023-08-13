import {LevelUsageType, getLevelName} from '../../../constants/Levels';
import {LevelKeyType, LogType} from '../../../types/global';
import {Singleton} from '../../../utils/Singleton';

export class FormatManager extends Singleton<FormatManager> {
  private global_format: string;
  private levelFormats: Record<LevelKeyType, string>;

  constructor() {
    super();

    const DEFAULT_FORMAT =
      // eslint-disable-next-line max-len
      '${silver}[${teal}${timestamp}${silver}] ${silver}[${uppercase}${level}${silver}]${reset} ${message} ${data} ${error.stack}';
    this.global_format = DEFAULT_FORMAT;

    this.levelFormats = {
      FATAL: DEFAULT_FORMAT,
      ERROR: DEFAULT_FORMAT,
      WARN: DEFAULT_FORMAT,
      INFO: DEFAULT_FORMAT,
      DEBUG: DEFAULT_FORMAT,
      TRACE: DEFAULT_FORMAT,
    };
  }

  public setGlobalFormat(format: string): void {
    this.global_format = format;
  }

  public setLevelFormat(level: LevelUsageType, format: string): void {
    this.levelFormats[level.toString()] = format;
  }

  public getGlobalFormat(): string {
    return this.global_format;
  }

  public getLevelFormat(level: LevelUsageType): string {
    return this.levelFormats[level.toString()] || this.global_format;
  }

  public formatMessage(log: LogType): string {
    const format = this.getLevelFormat(log.level);
    const message = format
      .replaceAll(
        /\${timestamp\}/g,
        this.formatTimestamp(log.timestamp.toString())
      )
      .replaceAll(/\${level\}/g, log.level.toString())
      .replaceAll(
        /\${message\}/g,
        getLevelName(log.message as LevelUsageType).toString()
      )
      .replaceAll(
        /\${error\}/g,
        log.data.error ? JSON.stringify(log.data.error) : ''
      )
      .replaceAll(
        /\${error.message\}/g,
        log.data.error ? log.data.error.message : ''
      )
      .replaceAll(
        /\${error.stack\}/g,
        log.data.error ? log.data.error.stack : ''
      )
      .replaceAll(/\${error.name\}/g, log.data.error ? log.data.error.name : '')
      .replaceAll(
        /\${error.cause\}/g,
        log.data.error ? JSON.stringify(log.data.error.cause) : ''
      )
      .replaceAll(/\${tag\}/g, log.tag ? log.tag : '')
      .replaceAll(/\${id\}/g, log.id)
      .replaceAll(/\${reset\}/g, '\x1b[0m');

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
