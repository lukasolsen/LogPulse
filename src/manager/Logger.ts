import {LogCluster} from './logCluster';
import {LogLocation} from '../modules/logLocation';
import {LogOptions, LoggerOptionsType} from '../types/global';

export class Logger {
  private logCluster: LogCluster;

  constructor(options?: LoggerOptionsType) {
    this.logCluster = options?.logCluster || new LogCluster();
  }

  public log(
    message: string,
    logOptions?: LogOptions,
    ...data: any[] | any
  ): void {
    this.logCluster.log(message, logOptions, ...data);
  }

  public info(message: string, ...data: any[]): void {
    this.logCluster.log(message, {level: 'INFO'}, ...data);
  }

  public warn(message: string, ...data: any[]): void {
    this.logCluster.log(message, {level: 'WARN'}, ...data);
  }

  public error(message: string, ...data: any[]): void {
    this.logCluster.log(message, {level: 'ERROR'}, ...data);
  }

  public debug(message: string, ...data: any[]): void {
    this.logCluster.log(message, {level: 'DEBUG'}, ...data);
  }

  public fatal(message: string, ...data: any[]): void {
    this.logCluster.log(message, {level: 'FATAL'}, ...data);
  }

  public trace(message: string, ...data: any[]): void {
    this.logCluster.log(message, {level: 'TRACE'}, ...data);
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
