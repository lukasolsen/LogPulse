import {LogLevelUsageT, LogLevelValueT} from '../types/logManager';

export const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4,
  NONE: 5,
} as const;

type LogLevelKeys = keyof typeof LOG_LEVELS;

export function getLogLevels(): typeof LOG_LEVELS {
  return LOG_LEVELS;
}

export function getLogLevel(
  level: LogLevelUsageT,
): (typeof LOG_LEVELS)[LogLevelKeys] {
  return LOG_LEVELS[level as LogLevelKeys];
}

export function addLogLevel(name: LogLevelUsageT, level: LogLevelUsageT): void {
  if (logLevelExist(name.toString().toUpperCase() as LogLevelUsageT)) {
    throw new Error(`Log level ${name} already exists.`);
  }
  if (logLevelExist(level as LogLevelUsageT)) {
    throw new Error(`Log level ${level} already exists.`);
  }

  if (typeof name === 'string') {
    LOG_LEVELS[name.toString()] = level;
  }
}

export function getLogLevelName(level: LogLevelUsageT): LogLevelValueT {
  return typeof level === 'number'
    ? (Object.keys(LOG_LEVELS)[level] as unknown as LogLevelValueT)
    : (level as unknown as LogLevelValueT);
}

export function logLevelExist(level: LogLevelUsageT): boolean {
  return typeof level === 'number'
    ? Object.values(LOG_LEVELS).includes(level)
    : Object.keys(LOG_LEVELS).includes(level.toString().toUpperCase());
}

export function generateUniqueID(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
