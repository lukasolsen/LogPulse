import {LOG_LEVELS} from '../constants/LogLevels';
import {LogLocation} from '../modules/logLocation';

export type LogLevelType = typeof LOG_LEVELS;
export type LogLevelKeyType = keyof LogLevelType;
export type LogLevelValueType = LogLevelType[LogLevelKeyType];
export type LogLevelUsageType =
  | LogLevelType
  | LogLevelKeyType
  | LogLevelValueType;

export interface LoggerOptionsType {
  logLevel: LogLevelUsageType;
  logLocations: LogLocation | LogLocation[];
}

export interface LogOptions {
  logLevel?: LogLevelValueType;
}

/* interface LogType {
  logLevel: LogLevelKeyT | LogLevelValueT;
  message: string;
  timestamp: number;
}*/

export type LogType = {
  id: string;
  logLevel: LogLevelUsageType;
  message: string;
  timestamp: number;
};
