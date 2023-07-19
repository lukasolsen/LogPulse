import {
  generateUniqueID,
  logLevelExist,
  getLogLevel,
  getLogLevelName,
} from '../constants/LogLevels';
import {LogType, LogOptions} from '../types/logManager';
import {formatTextAllDependencies} from './log-modifier';
import {LogLocation, transport} from './logLocation';

/**
 * A class that represents a log cluster.
 * @class LogCluster
 */
export class LogCluster {
  private logClusterName: string;
  private logClusterID: string;
  private logLocations: LogLocation[];

  constructor(logClusterName?: string) {
    this.logClusterName = logClusterName || this.generateRandomName();
    this.logClusterID = generateUniqueID();
    this.logLocations = [];
  }

  /**
   * Add a log to the cluster.
   * @param {LogType} log
   * @return {void}
   * @example
   * const logCluster = new LogCluster();
   * logCluster.addLog({ logLevel: 'INFO', message: 'Hello World', timestamp: 123456789 });
   * @throws {Error} - If the log level does not exist.
   */
  private addLog(logLocation: LogLocation, log: LogType): void {
    if (!logLevelExist(log.logLevel)) {
      throw new Error(`Log level ${log.logLevel} does not exist.`);
    }

    const logLevel = getLogLevel(log.logLevel);
    log.logLevel = logLevel;

    logLocation.addLog(log);
  }

  /**
   * Generates a random name for the log cluster.
   * @deprecated
   * @return {string} - A string representing the name of the log cluster.
   * @example
   * const logCluster = new LogCluster();
   * logCluster.generateRandomName(); // LogCluster-123456789
   */
  private generateRandomName(): string {
    return 'LogCluster-' + generateUniqueID();
  }

  public addLogLocation(logLocations: LogLocation | LogLocation[]) {
    if (Array.isArray(logLocations)) {
      this.logLocations.push(...logLocations);
    } else {
      this.logLocations.push(logLocations);
    }
  }

  public log(message: string, options?: LogOptions): void {
    options = options || {};

    const log = this.generateLogData(message, options);
    const {text, colors} = formatTextAllDependencies(log);

    for (const logLocations of this.logLocations) {
      this.addLog(this.logLocations[0], log);
      logLocations.log(text, colors);
    }
    //console.log(text, ...colors);
  }

  public generateLogData(message: string, options?: LogOptions): LogType {
    options = options || {};

    options.logLevel = getLogLevelName(options.logLevel) || getLogLevelName(1);

    const log: LogType = {
      id: generateUniqueID(),
      logLevel: options.logLevel || 'INFO',
      message: message,
      timestamp: Date.now(),
    };
    return log;
  }
}

//TODO: Need to add logLocation support
//TODO: Will be used from Logger, and will hold the LogLocations, aka the loggers. Each logger will hold each logs.
