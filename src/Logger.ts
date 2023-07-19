import {LogCluster} from './modules/logCluster';
import {ConsoleTransport, LogLocation} from './modules/logLocation';

import {formatTextAllDependencies} from './modules/log-modifier';
import {
  LogLevelValueType,
  LogOptions,
  LoggerOptionsType,
} from './types/logManager';

export default class Logger {
  private logCluster: LogCluster;
  private logLocations: LogLocation[];
  logLevel: LogLevelValueType;

  constructor(options?: LoggerOptionsType) {
    this.logCluster = options?.logCluster || new LogCluster();
    this.logLocations = options?.logLocations
      ? Array.isArray(options.logLocations)
        ? options.logLocations
        : [options.logLocations]
      : [new ConsoleTransport()];

    this.logCluster.addLogLocation(this.logLocations);
  }

  public log(message: string, logOptions?: LogOptions): void {
    this.logCluster.log(message, logOptions);
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
}
