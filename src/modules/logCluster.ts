import {ConsoleTransport, LogLocation} from './logLocation';
import {LogOptions, LogType, LoggerOptionsType} from '../types/logManager';
import {LevelUsageType} from '../types/logManager';
import {LOG_LEVELS, generateUniqueID, getLevelName} from '../constants/Levels';
import {formatTextAllDependencies} from './log-modifier';

class LogFilterManager {
  private filters: ((log: LogType, ...args: any[]) => boolean)[];
  private defaultLogOptions: LogOptions;

  constructor(defaultLogOptions: LogOptions) {
    this.filters = [];
    this.defaultLogOptions = defaultLogOptions;
  }

  public addFilter(filter: (log: LogType, ...args: any[]) => boolean): void {
    this.filters.push(filter);
  }

  public applyFilters(log: LogType, ...args: any[]): boolean {
    return this.filters.every((filter) => filter(log, ...args));
  }

  public useFilter(log: LogType, ...args: any[]): boolean {
    const filters = this.applyFilters(log, ...args);

    return filters;
  }
}

export class LogCluster {
  private logLocations: LogLocation[];
  private defaultLogInformation: LogInformation;
  private levelFilter: LevelUsageType;
  private filterManager: LogFilterManager;

  constructor(options?: LoggerOptionsType) {
    this.logLocations = options?.logLocations || [new ConsoleTransport()];
    this.defaultLogInformation = {
      level: options?.defaultLogLevel || LOG_LEVELS.INFO,
    };
    this.levelFilter = options?.levelFilter ?? LOG_LEVELS.INFO;
    this.filterManager = new LogFilterManager(this.defaultLogInformation || {});
  }

  public log(message: string, logOptions?: LogOptions, ...args: any[]): void {
    logOptions = logOptions || {};

    // Type assertion to ensure logOptions.level has the correct type
    logOptions.level =
      logOptions.level || (this.defaultLogInformation.level as LevelUsageType);

    if (this.checkLevelFilter(logOptions.level)) return;

    const log = this.generateLogData(
      logOptions.level,
      message,
      logOptions,
      ...args
    );
    const {text, colors} = formatTextAllDependencies(log);
    if (!this.filterManager.useFilter(log, ...args)) return;

    this.logLocations.forEach((logLocation) => {
      logLocation.log(text, colors);
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
  }

  private checkLevelFilter(level: LevelUsageType): boolean {
    return level > this.levelFilter;
  }

  public setFormat(format: string): void {
    // Implement the setFormat logic here or delegate it to LogLocation(s)
  }

  public addLogFilter(filter: (log: LogType, ...args: any[]) => boolean): void {
    this.filterManager.addFilter(filter);
  }

  private generateLogData(
    level: LevelUsageType,
    message: string,
    options?: LogOptions,
    ...args: any[]
  ): LogType {
    options = options || {};
    level = getLevelName(level);

    let stringified = JSON.stringify(args);
    stringified = stringified.replace(/"/g, '');
    stringified = stringified.replace(stringified.charAt(0), '');
    stringified = stringified.replace(
      stringified.charAt(stringified.length - 1),
      ''
    );

    const mes = message + ' ' + stringified;

    const log: LogType = {
      id: generateUniqueID(),
      level: level,
      message: mes,
      timestamp: Date.now(),
    };
    return log;
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
}

interface LogInformation {
  level: LevelUsageType;
}
