import {LogCluster} from './modules/logCluster';
import {ConsoleTransport, LogLocation} from './modules/logLocation';
import {LOG_LEVELS} from './constants/LogLevels';

import {
  LogLevelUsageType,
  LogLevelValueType,
  LogOptions,
  LoggerOptionsType,
} from './types/logManager';

export interface ILogger {
  configure(options: LoggerOptionsType): void;
  log(
    logLevel: LogLevelUsageType,
    message: string,
    logOptions?: LogOptions
  ): void;
  addLogLocation(logLocation: LogLocation): void;
  setDefaultLogCluster(logCluster: LogCluster): void;
}

export class Logger implements ILogger {
  private logCluster: LogCluster;
  private logLocations: LogLocation[];
  private logLevel: LogLevelValueType;

  constructor(options?: LoggerOptionsType) {
    this.logCluster = options?.logCluster || new LogCluster();
    this.logLocations = options?.logLocations
      ? Array.isArray(options.logLocations)
        ? options.logLocations
        : [options.logLocations]
      : [new ConsoleTransport()];

    this.logCluster.addLogLocation(this.logLocations);
    Object.keys(LOG_LEVELS).forEach((logLevel) => {
      (this as any)[logLevel.toLowerCase()] = (
        message: string,
        logOptions?: LogOptions
      ) => {
        this.log(logLevel as LogLevelUsageType, message, logOptions);
      };
    });
  }

  public log(
    logLevel: LogLevelUsageType,
    message: string,
    logOptions?: LogOptions
  ): void {
    this.logCluster.log(logLevel, message, logOptions);
  }

  public addLogLocation(logLocation: LogLocation): void {
    this.logCluster.addLogLocation(logLocation);
  }

  public configure(options: LoggerOptionsType): void {
    this.logLocations = Array.isArray(options.logLocations)
      ? options.logLocations
      : [options.logLocations];

    this.logLevel = options.logLevel as LogLevelValueType;
  }

  public setDefaultLogCluster(logCluster: LogCluster): void {
    this.logCluster = logCluster;
  }

  public setFormat(format: string): void {
    this.logCluster.setFormat(format);
  }
}

export default Logger;
