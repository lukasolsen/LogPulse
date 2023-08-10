import {LogLocation} from '../modules/logLocation';
import {LOG_LEVELS} from '../constants/Levels';
import {formatTextAllDependencies} from '../modules/log-modifier';
import {
  LevelUsageType,
  LogInformation,
  LogOptions,
  LogType,
  LoggerOptionsType,
} from '../types/global';
import {generateLogData} from '../services/logService';
import {ConsoleTransport} from '../modules/locations/ConsoleTransport';
import {FormatManager} from '../modules/modifications';

import LogFilterManager from '../modules/filters/Filter';

export class LogCluster {
  private logLocations: LogLocation[];
  private defaultLogInformation: LogInformation;
  private levelFilter: LevelUsageType;
  private filterManager: LogFilterManager;
  private formatManager: FormatManager;

  private allowJSON: boolean;

  constructor(options?: LoggerOptionsType) {
    this.logLocations = options?.logLocations || [new ConsoleTransport()];
    this.defaultLogInformation = {
      level: options?.defaultLogLevel || LOG_LEVELS.INFO,
    };
    this.levelFilter = options?.levelFilter ?? LOG_LEVELS.INFO;
    this.filterManager = new LogFilterManager(this.defaultLogInformation || {});
    this.formatManager = FormatManager.getInstance();
    this.allowJSON = options?.allowJSON || false;
  }

  public log(message: string, logOptions?: LogOptions, ...args: any[]): void {
    logOptions = logOptions || {};

    logOptions.level =
      logOptions.level || (this.defaultLogInformation.level as LevelUsageType);

    if (this.checkLevelFilter(logOptions.level)) return;

    const log = generateLogData(logOptions.level, message, ...args);
    const {text, colors} = formatTextAllDependencies(log);
    if (!this.filterManager.useFilter(log, ...args)) return;

    if (this.allowJSON && this.logLocations.length !== 0) {
      log.message = text;
      console.log(JSON.stringify(log, null, 2));
    }

    this.logLocations.forEach((logLocation) => {
      logLocation.log(text, colors, logOptions);
      logLocation.addLog(log);
    });
  }

  public addLogLocation(logLocation: LogLocation | LogLocation[]): void {
    if (Array.isArray(logLocation)) {
      this.logLocations.push(...logLocation);
    } else {
      this.logLocations.push(logLocation);
    }
  }

  public configure(options: LoggerOptionsType): void {
    this.logLocations = Array.isArray(options.logLocations)
      ? options.logLocations
      : [options.logLocations];

    this.defaultLogInformation.level =
      options.defaultLogLevel || LOG_LEVELS.INFO;

    // Set the level filter based on the allowDebug property if provided
    this.levelFilter = options.allowDebug ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;
    this.allowJSON = options.allowJSON || false;
  }

  private checkLevelFilter(level: LevelUsageType): boolean {
    return level > this.levelFilter;
  }

  public setGlobalFormat(format: string): void {
    this.formatManager.setGlobalFormat(format);
  }

  public addLogFilter(filter: (log: LogType, ...args: any[]) => boolean): void {
    this.filterManager.addFilter(filter);
  }

  public getAllLogs(): LogType[] {
    const logs = [];
    this.logLocations.forEach((logLocation) => {
      logs.push(logLocation.getAllLogs());
    });
    return logs;
  }

  public getLogsByLevel(level: LevelUsageType): LogType[] {
    const logs = [];
    this.logLocations.forEach((logLocation) => {
      logs.push(logLocation.getLogByLevel(level));
    });
    return logs;
  }

  public getLogsByMessage(message: string): LogType[] {
    const logs = [];
    this.logLocations.forEach((logLocation) => {
      logs.push(logLocation.getLogByMessage(message));
    });
    return logs;
  }

  public getLogsByTimestamp(timestamp: number): LogType[] {
    const logs = [];
    this.logLocations.forEach((logLocation) => {
      logs.push(logLocation.getLogByTimestamp(timestamp));
    });
    return logs;
  }

  public getLogsByTimestampRange(
    startTimestamp: number,
    endTimestamp: number
  ): LogType[] {
    const logs = [];
    this.logLocations.forEach((logLocation) => {
      logs.push(
        logLocation.getLogByTimestampRange(startTimestamp, endTimestamp)
      );
    });
    return logs;
  }

  public setFormat(level: LevelUsageType, format: string) {
    this.formatManager.setLevelFormat(level, format);
  }
}
