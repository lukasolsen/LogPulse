import {LOG_LEVELS} from '../constants/LogLevels';

export type LogLevelT = typeof LOG_LEVELS;
export type LogLevelKeyT = keyof LogLevelT;
export type LogLevelValueT = LogLevelT[LogLevelKeyT];
export type LogLevelUsageT = LogLevelT | LogLevelKeyT | LogLevelValueT;

export interface LoggerOptionsT {
  logLevel?: LogLevelValueT;
}

/* interface LogT {
  logLevel: LogLevelKeyT | LogLevelValueT;
  message: string;
  timestamp: number;
}*/

export type LogT = {
  id: string;
  logLevel: LogLevelUsageT;
  message: string;
  timestamp: number;
};
