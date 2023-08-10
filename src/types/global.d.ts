import {LOG_LEVELS} from '../constants/Levels';
import {LogCluster} from '../core/logCluster';
import {LogLocation} from '../modules/logLocation';
import Logger from '../core/Logger';

/**
 * logManager.d.ts
 */

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
  allowJSON?: boolean;
}

export interface LogOptions {
  level?: LevelUsageType;
}

export type LogType = {
  id: string;
  level: LevelUsageType;
  message: string;
  timestamp: number;
  data?: LogHandleOptions;
};

/**
 * // logManager.d.ts
 */

/**
 * logCluster.d.ts
 */

export type HexType = string;
export type ANSIType = string;
export type RGBType = readonly [number, number, number];
export type HSLType = readonly [number, number, number];

export type ColorFormatType = {
  hex?: HexType;
  ansi?: ANSIType;
  rgb?: RGBType;
  hsl?: HSLType;
} & ({hex: HexType} | {ansi: ANSIType} | {rgb: RGBType} | {hsl: HSLType});

export type ModifierFormatType = {
  css: string;
  ansi: ANSIType;
};

export type PredefinedColorsType = {
  [key: string]: ColorFormatType;
};

export type ModifiersType = {
  [key: string]: ModifierFormatType;
};

export interface Color {
  name: string;
  color: HexType | ANSIType;
}

export interface TurnTextToColor {
  text: string;
  colors: HexType[] | ANSIType[];
}

/**
 * // logCluster.d.ts
 */

/**
 * logLocation.d.ts
 */

export type TransportFunction = (logger: Logger) => void;

/**
 * // logLocation.d.ts
 */

/**
 * logCluster.d.ts
 */

export interface LogClusterOptions {
  logClusterName?: string;
  logLocations?: LogLocation | LogLocation[];
}

export interface LogInformation {
  level: LevelUsageType;
}

export interface LogHandleOptions {
  error?: Error;
  timestamp?: number;
  data?: any;
  object?: object;
  arguments_?: any[];
}

/**
 * // logCluster.d.ts
 */
