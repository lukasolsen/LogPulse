import {
  generateUniqueID,
  logLevelExist,
  getLogLevel,
  getLogLevelName,
} from "../constants/LogLevels";
import { LogT, LoggerOptionsT } from "../types/logManager";

/**
 * Log Cluster is used to hold a collection of logs. Contains various methods for both calling, and manipulating the logs.
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
   * @param log
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
   * @returns LogT[]
   */
  public getLogs(): LogT[] {
    return this.logs;
  }

  /**
   * Get a log by its ID.
   * @param id
   * @returns LogT[]
   */
  public getLog(id: string): LogT {
    return this.logs.find((log) => log.id === id);
  }

  /**
   * Get the most recent added log.
   * @returns LogT
   */
  public getRecentLog(): LogT {
    return this.logs[this.logs.length - 1];
  }

  /**
   * Generates a random name for the log cluster.
   * @deprecated
   * @returns string
   */
  private generateRandomName(): string {
    return "LogCluster-" + generateUniqueID();
  }

  public generateLogData(message: string, options?: LoggerOptionsT): LogT {
    options = options || {};

    options.logLevel = getLogLevelName(options.logLevel) || getLogLevelName(1);

    const log: LogT = {
      id: generateUniqueID(),
      logLevel: options.logLevel || "INFO",
      message: message,
      timestamp: Date.now(),
    };
    return log;
  }
}
