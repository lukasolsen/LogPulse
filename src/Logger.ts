import {LogCluster} from './modules/logCluster';
import {ConsoleTransport, LogLocation} from './modules/logLocation';

import {LogOptions, LoggerOptionsType} from './types/logManager';

export interface ILogger {
  configure(options: LoggerOptionsType): void;
  log(message: string, logOptions?: LogOptions): void;
  addLogLocation(logLocation: LogLocation): void;
  setDefaultLogCluster(logCluster: LogCluster): void;
}

export class Logger implements ILogger {
  private logCluster: LogCluster;
  private logLocations: LogLocation[];

  constructor(options?: LoggerOptionsType) {
    this.logCluster = options?.logCluster || new LogCluster();
    this.logLocations = options?.logLocations
      ? Array.isArray(options.logLocations)
        ? options.logLocations
        : [options.logLocations]
      : [new ConsoleTransport()];

    this.logCluster.addLogLocation(this.logLocations);
  }

  public log(
    message: string,
    logOptions?: LogOptions,
    ...args: any[] | any
  ): void {
    this.logCluster.log(message, logOptions, ...args);
  }

  public addLogLocation(logLocation: LogLocation): void {
    this.logCluster.addLogLocation(logLocation);
  }

  public configure(options: LoggerOptionsType): void {
    this.logCluster.configure(options);
  }

  public setDefaultLogCluster(logCluster: LogCluster): void {
    this.logCluster = logCluster;
  }

  public setFormat(format: string): void {
    this.logCluster.setFormat(format);
  }

  public addLogFilter(fn: (...args: any[]) => boolean): void {
    this.logCluster.addLogFilter(fn);
  }

  public getLogCluster(): LogCluster {
    return this.logCluster;
  }
}

export default Logger;
