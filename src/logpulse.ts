import Logger from './core/Logger';
import {LogCluster} from './core/logCluster';
import {LogOptionsBuilder} from './modules/logOptionsBuilder';
import {ConsoleTransport} from './modules/locations/ConsoleTransport';
import {FileTransport} from './modules/locations/FileTransport';
import {ColorManager} from './modules/modifications';
import {LOG_LEVELS} from './types';

/*
const logger = new Logger();

logger.configure({
  defaultLogLevel: LOG_LEVELS.INFO,
  levelFilter: LOG_LEVELS.WARN,
  logLocations: [new ConsoleTransport()],
  allowDebug: false,
  allowJSON: true,
  allowSummary: true,
  huggingFaceToken: 'api',
});

logger.setTag('diamond');
logger.removeTag('diamond');

//logger.info('An info message', {info: 'Sample Info', info2: logger});
//logger.trace('A trace message', {trace: 'Sample Trace'});
logger.info(`An error message Uncaught`);
*/

const LogPulse = new Logger();

export {
  LogPulse,
  ConsoleTransport,
  FileTransport,
  ColorManager,
  LogCluster,
  LogOptionsBuilder,
};
