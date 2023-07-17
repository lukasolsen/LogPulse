import { LogCluster } from "./modules/logCluster";
import {
  formatTextAllDependencies,
  FormatManager,
  ColorManager,
  ModifierManager,
} from "./modules/typeHandler";
import { LoggerOptionsT } from "./types/logManager";

export default class Logger {
  private logCluster: LogCluster;

  constructor() {
    this.logCluster = LogCluster.getInstance();
  }

  public log(message: string, options?: LoggerOptionsT): void {
    options = options || {};

    const log = this.logCluster.generateLogData(message, options);
    const { text, colors } = formatTextAllDependencies(log);
    console.log(text, ...colors);
  }
}
