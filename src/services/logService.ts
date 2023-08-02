import {generateUniqueID, getLevelName} from '../constants/Levels';
import {LevelUsageType, LogType, LogHandleOptions} from '../types/global.d';
import {convertArgsToText} from './BetterOptions';

function generateLogData(
  level: LevelUsageType,
  message: string,
  handleOptions?: LogHandleOptions,
  ...args: any[]
): LogType {
  level = getLevelName(level);
  handleOptions = handleOptions || {};

  let mes = message;
  mes += ' ' + convertArgsToText(args);

  const log: LogType = {
    id: generateUniqueID(),
    level: level,
    message: mes,
    timestamp: Date.now(),
    data: handleOptions,
  };

  return log;
}

export {generateLogData};
