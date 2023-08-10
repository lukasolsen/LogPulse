import {generateUniqueID, getLevelName} from '../constants/Levels';
import {LevelUsageType, LogType} from '../types/global.d';
import {convertArgsToOptions, convertArgsToText} from './TextConverer';

function generateLogData(
  level: LevelUsageType,
  message: string,
  ...args: any[]
): LogType {
  level = getLevelName(level);

  let mes = message;
  mes += ' ' + convertArgsToText(args);

  const handleOptions = convertArgsToOptions(args);

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
