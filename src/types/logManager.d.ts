import {LOG_LEVELS} from '../constants/Levels';
import {LogCluster} from '../modules/logCluster';
import {LogLocation} from '../modules/logLocation';

export type LevelType = typeof LOG_LEVELS;
export type LevelKeyType = keyof LevelType;
export type LevelValueType = LevelType[LevelKeyType];
export type LevelUsageType = LevelType | LevelKeyType | LevelValueType;

export interface LoggerOptionsType {
  levelFilter?: LevelUsageType;
  defaultLogLevel?: LevelUsageType;
  logLocations?: LogLocation[];
  logCluster?: LogCluster;
  allowDebug?: boolean;
}

export interface LogOptions {
  level?: LevelUsageType;
}

/* interface LogType {
  level: LevelKeyT | LevelValueT;
  message: string;
  timestamp: number;
}*/

export type LogType = {
  id: string;
  level: LevelUsageType;
  message: string;
  timestamp: number;
};
