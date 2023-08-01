import Logger from './Logger';
import {LogCluster} from './modules/logCluster';
import {ConsoleTransport, FileTransport} from './modules/logLocation';
import {ColorManager} from './modules/log-modifiers';
import {LOG_LEVELS} from './constants/Levels';
import {LogOptionsBuilder} from './modules/logOptionsBuilder';
import {LogType} from './types/logManager';

const logger = new Logger();

logger.configure({
  defaultLogLevel: LOG_LEVELS.INFO,
  levelFilter: LOG_LEVELS.WARN,
  logLocations: [new ConsoleTransport()],
});

logger.log(
  'asd',
  {
    level: LOG_LEVELS.WARN,
  },
  {test: 'test'}
);

const newLogCluster = new LogCluster({
  logLocations: [new ConsoleTransport()],
  levelFilter: LOG_LEVELS.TRACE,
});

logger.setDefaultLogCluster(newLogCluster);

function customLogFilter(log: LogType): boolean {
  return log.level === 'TRACE';
}

logger.addLogFilter(customLogFilter);

logger.log('Sending message from new log cluster.', {
  level: LOG_LEVELS.TRACE,
});

const customLogBuilder = new LogOptionsBuilder()
  .setLevel(LOG_LEVELS.TRACE)
  .build();

logger.log(`Sending a example message`, customLogBuilder);

const Logify = new Logger();

Logify.configure({
  allowDebug: true,
  levelFilter: LOG_LEVELS.TRACE,
  defaultLogLevel: LOG_LEVELS.INFO,
  logLocations: [new ConsoleTransport()],
});

Logify.log('Sending a test message.');

/*
console.log(Logify.getLogCluster().getAllLogs());
console.log(Logify.getLogCluster().getLogsByLevel('INFO'));
*/

export {
  Logify,
  ConsoleTransport,
  FileTransport,
  ColorManager,
  LogCluster,
  LogOptionsBuilder,
};
