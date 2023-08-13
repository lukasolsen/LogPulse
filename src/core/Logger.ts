/* eslint-disable max-len */
import {LogCluster} from './logCluster';
import {LogLocation} from '../modules/logLocation';
import {LevelUsageType, LogOptions, LoggerOptionsType} from '../types/global';

export class Logger {
  private logCluster: LogCluster;

  constructor(options?: LoggerOptionsType) {
    this.logCluster = options?.logCluster || new LogCluster();
  }

  public log(
    message: any,
    logOptions?: LogOptions,
    ...data: any[] | any
  ): void {
    this.logCluster.log(message, logOptions, ...data);
  }

  public info(message: any, ...data: any[]): void {
    this.logCluster.log(message, {level: 'INFO'}, ...data);
  }

  public setTag(tag: string): void {
    this.logCluster.setTag(tag);
  }

  public removeTag(tag: string): void {
    this.logCluster.removeTag(tag);
  }

  public warn(message: any, ...data: any[]): void {
    this.logCluster.log(message, {level: 'WARN'}, ...data);
  }

  public error(message: any, ...data: any[]): void {
    this.logCluster.log(message, {level: 'ERROR'}, ...data);
  }

  public debug(message: any, ...data: any[]): void {
    this.logCluster.log(message, {level: 'DEBUG'}, ...data);
  }

  public fatal(message: any, ...data: any[]): void {
    this.logCluster.log(message, {level: 'FATAL'}, ...data);
  }

  public trace(message: any, ...data: any[]): void {
    this.logCluster.log(message, {level: 'TRACE'}, ...data);
  }

  public addLogLocation(logLocation: LogLocation): void {
    this.logCluster.addLogLocation(logLocation);
  }

  /**
   * Configure the logger with options
   * @param options LoggerOptionsType
   * @returns void
   * @option allowSummary - Allow the logger to print a summary of the logs ? requires `allowJSON` to be true and `huggingFaceToken` to be set
   * @option huggingFaceToken - The token to use for the HuggingFace API (https://huggingface.co/)
   */
  public configure(options: LoggerOptionsType): void {
    this.logCluster.configure(options);
  }

  public setDefaultLogCluster(logCluster: LogCluster): void {
    this.logCluster = logCluster;
  }

  public setGlobalFormat(format: string): void {
    this.logCluster.setGlobalFormat(format);
  }

  public addLogFilter(fn: (...args: any[]) => boolean): void {
    this.logCluster.addLogFilter(fn);
  }

  public getLogCluster(): LogCluster {
    return this.logCluster;
  }

  public setFormat(level: LevelUsageType, format: string) {
    this.logCluster.setFormat(level, format);
  }
}

export default Logger;
