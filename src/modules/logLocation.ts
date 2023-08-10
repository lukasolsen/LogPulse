import {LogType, LevelUsageType, LogOptions} from '../types/global';

export abstract class LogLocation {
  private id: string = this.generateId();
  private logs: LogType[] = [];

  public abstract log(
    message: string,

    colors?: string[],
    options?: LogOptions
  ): void;

  //Make a custom id without having to require the transport or anything making it.

  private generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  public getId(): string {
    return this.id;
  }

  public addLog(log: LogType): void {
    this.logs.push(log);
  }

  public getLogs(): LogType[] {
    return this.logs;
  }

  public getLog(id: string): LogType {
    return this.logs.find((log) => log.id === id);
  }

  public getRecentLog(): LogType {
    return this.logs[this.logs.length - 1];
  }

  public getAllLogs(): LogType[] {
    return this.logs;
  }

  public getLogByLevel(level: LevelUsageType): LogType[] {
    return this.logs.filter((log) => log.level === level);
  }

  public getLogByMessage(message: string): LogType[] {
    return this.logs.filter((log) => log.message === message);
  }

  public getLogByTimestamp(timestamp: number): LogType[] {
    return this.logs.filter((log) => log.timestamp === timestamp);
  }

  public getLogByTimestampRange(start: number, end: number): LogType[] {
    return this.logs.filter(
      (log) => log.timestamp >= start && log.timestamp <= end
    );
  }
}
