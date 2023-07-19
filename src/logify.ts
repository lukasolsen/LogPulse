import Logger from './Logger';
import {LogCluster} from './modules/logCluster';
import {ConsoleTransport, FileTransport} from './modules/logLocation';
import {ColorManager} from './modules/log-modifiers';
import {LOG_LEVELS} from './constants/LogLevels';
/*
const logger = new Logger();

logger.configure({
  logLevel: LOG_LEVELS.FATAL,
  logLocations: [new ConsoleTransport()],
});

const newLogCluster = new LogCluster({
  logLocations: [new ConsoleTransport()],
});

logger.log('DEBUG', 'Sending message from default log cluster.');

logger.setDefaultLogCluster(newLogCluster); //Setting a new logCluster as the sender.
//logger.addLogLocation(new ConsoleTransport());

logger.setFormat('Hello, %{red}%{message}!');

logger.log('INFO', 'Sending message from new log cluster.');*/

const Logify = new Logger();

export {Logify, ConsoleTransport, FileTransport, ColorManager, LogCluster};
