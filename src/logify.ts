import Logger from './core/Logger';
import {LogCluster} from './core/logCluster';
import {LOG_LEVELS} from './constants/Levels';
import {LogOptionsBuilder} from './modules/logOptionsBuilder';
import {ConsoleTransport} from './modules/locations/ConsoleTransport';
import {FileTransport} from './modules/locations/FileTransport';
import {ColorManager} from './modules/modifications';
import Helper from './modules/ai';

const logger = new Logger();

logger.configure({
  defaultLogLevel: LOG_LEVELS.INFO,
  levelFilter: LOG_LEVELS.WARN,
  logLocations: [new ConsoleTransport()],
  allowDebug: false,
  allowJSON: false,
});

//logger.info('An info message', {info: 'Sample Info', info2: logger});
//logger.trace('A trace message', {trace: 'Sample Trace'});
/*logger.info(`An error message`, 'asdasd');

const helper = new Helper();

console.log(
  helper.summarizeMessage(
    'An error occurred while making processing transaction ID 12345.'
  )
);*/

const Logify = new Logger();

export {
  Logify,
  ConsoleTransport,
  FileTransport,
  ColorManager,
  LogCluster,
  LogOptionsBuilder,
};
