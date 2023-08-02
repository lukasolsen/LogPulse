import Logger from '../manager/Logger';
import {TransportFunction, LogType, LevelUsageType} from '../types/global';

export function transport(): ClassDecorator {
  return function (target: Function) {
    target.prototype.addTransport = function (transportFn: TransportFunction) {
      transportFn(this);
    };
  };
}

export abstract class LogLocation {
  private id: string = this.generateId();
  private logs: LogType[] = [];

  public abstract log(message: string, colors?: string[]): void;
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

/**
 * ConsoleTransport Transport
 */
export class ConsoleTransport extends LogLocation {
  public log(message: string, colors?: string[]): void {
    console.log(message, ...colors);
  }
}

/**
 * FileTransport Transport
 */
export class FileTransport extends LogLocation {
  public log(message: string, colors?: string[]): void {
    throw new Error('Method not implemented.');
  }
}
