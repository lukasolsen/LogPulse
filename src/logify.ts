import Logger from './manager/Logger';
import {LogCluster} from './manager/logCluster';
import {ConsoleTransport, FileTransport} from './modules/logLocation';
import {ColorManager} from './modules/log-modifiers';
import {LOG_LEVELS} from './constants/Levels';
import {LogOptionsBuilder} from './modules/logOptionsBuilder';

const logger = new Logger();

logger.configure({
  defaultLogLevel: LOG_LEVELS.INFO,
  levelFilter: LOG_LEVELS.WARN,
  logLocations: [new ConsoleTransport()],
});
logger.error('An error occurred', {error: new Error('Sample Error')}, 'asd');
logger.info('Nice information', {customData: 'additional information'});

/*
console.log(Logify.getLogCluster().getAllLogs());
console.log(Logify.getLogCluster().getLogsByLevel('INFO'));
*/
const Logify = new LogCluster();

export {
  Logify,
  ConsoleTransport,
  FileTransport,
  ColorManager,
  LogCluster,
  LogOptionsBuilder,
};
