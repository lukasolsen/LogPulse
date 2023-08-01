import {LevelUsageType, LevelValueType} from '../types/logManager';

export const LOG_LEVELS = {
  FATAL: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  TRACE: 5,
};

type LevelKeys = keyof typeof LOG_LEVELS;

export function getLevels(): typeof LOG_LEVELS {
  return LOG_LEVELS;
}

export function getLevel(
  level: LevelUsageType
): (typeof LOG_LEVELS)[LevelKeys] {
  return LOG_LEVELS[level as LevelKeys];
}

export function addLevel(name: LevelUsageType, level: LevelUsageType): void {
  if (levelExist(name.toString().toUpperCase() as LevelUsageType)) {
    throw new Error(`Log level ${name} already exists.`);
  }
  if (levelExist(level as LevelUsageType)) {
    throw new Error(`Log level ${level} already exists.`);
  }

  if (typeof name === 'string') {
    LOG_LEVELS[name.toString()] = level;
  }
}

export function getLevelName(level: LevelUsageType): LevelValueType {
  return typeof level === 'number'
    ? (Object.keys(LOG_LEVELS)[level] as unknown as LevelValueType)
    : (level as unknown as LevelValueType);
}

export function levelExist(level: LevelUsageType): boolean {
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

export {LevelUsageType};
