import {
  generateUniqueID,
  logLevelExist,
  getLogLevel,
  getLogLevelName,
} from '../constants/LogLevels';
import {LogT, LoggerOptionsT} from '../types/logManager';

/**
 * The LogCluster class is a singleton class that is used to manipulate logs.
 * @class LogCluster
 */
export class LogCluster {
  private logClusterName: string;
  private logClusterID: string;
  private logs: LogT[];

  private static instance: LogCluster;

  private constructor(logClusterName?: string) {
    this.logClusterName = logClusterName || this.generateRandomName();
    this.logClusterID = generateUniqueID();
    this.logs = [];
  }

  public static getInstance(logClusterName?: string): LogCluster {
    if (!LogCluster.instance) {
      LogCluster.instance = logClusterName
        ? new LogCluster(logClusterName)
        : new LogCluster();
    }
    return LogCluster.instance;
  }

  /**
   * Add a log to the cluster.
   * @param {LogT} log
   * @return {void}
   * @example
   * const logCluster = new LogCluster();
   * logCluster.addLog({ logLevel: 'INFO', message: 'Hello World', timestamp: 123456789 });
   * @throws {Error} - If the log level does not exist.
   */
  public addLog(log: LogT): void {
    if (!logLevelExist(log.logLevel)) {
      throw new Error(`Log level ${log.logLevel} does not exist.`);
    }

    const logLevel = getLogLevel(log.logLevel);
    log.logLevel = logLevel;

    this.logs.push(log);
  }

  /**
   * Get all logs.
   * @return {LogT[]}
   * @example
   * const logCluster = new LogCluster();
   * logCluster.getLogs(); // [{ id: '123456789', logLevel: 'INFO', message: 'Hello World', timestamp: 123456789 }]
   * @example
   * const logCluster = new LogCluster();
   * logCluster.getLogs(); // []
   */
  public getLogs(): LogT[] {
    return this.logs;
  }

  /**
   * Get a log by its ID.
   * @param {string} id
   * @return {LogT[]} - A log object.
   * @example
   * const logCluster = new LogCluster();
   * logCluster.getLog('123456789'); // { id: '123456789', logLevel: 'INFO', message: 'Hello', timestamp: 123456789 }
   * @example
   * const logCluster = new LogCluster();
   * logCluster.getLog('123456789'); // undefined
   */
  public getLog(id: string): LogT {
    return this.logs.find((log) => log.id === id);
  }

  /**
   * Get the most recent added log.
   * @return {LogT} - A log object.
   * @example
   * const logCluster = new LogCluster();
   * logCluster.getRecentLog(); // { id: '123456789', logLevel: 'INFO', message: 'Hello World', timestamp: 123456789 }
   */
  public getRecentLog(): LogT {
    return this.logs[this.logs.length - 1];
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

  public generateLogData(message: string, options?: LoggerOptionsT): LogT {
    options = options || {};

    options.logLevel = getLogLevelName(options.logLevel) || getLogLevelName(1);

    const log: LogT = {
      id: generateUniqueID(),
      logLevel: options.logLevel || 'INFO',
      message: message,
      timestamp: Date.now(),
    };
    return log;
  }
}
