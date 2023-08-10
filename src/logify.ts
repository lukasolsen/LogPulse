import Logger from './core/Logger';
import {LogCluster} from './core/logCluster';
import {LOG_LEVELS} from './constants/Levels';
import {LogOptionsBuilder} from './modules/logOptionsBuilder';
import {ConsoleTransport} from './modules/locations/ConsoleTransport';
import {FileTransport} from './modules/locations/FileTransport';
import {ColorManager} from './modules/modifications';

const logger = new Logger();

logger.configure({
  defaultLogLevel: LOG_LEVELS.INFO,
  levelFilter: LOG_LEVELS.WARN,
  logLocations: [new ConsoleTransport()],
  allowDebug: false,
  allowJSON: true,
  allowSummary: true,
});

//logger.info('An info message', {info: 'Sample Info', info2: logger});
//logger.trace('A trace message', {trace: 'Sample Trace'});
logger.info(`An error message`, {error: 'Sample Error'});

const Logify = new Logger();

export {
  Logify,
  ConsoleTransport,
  FileTransport,
  ColorManager,
  LogCluster,
  LogOptionsBuilder,
};
