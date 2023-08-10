import { LogOptions, LogType } from "../../types/global";

class LogFilterManager {
  private filters: ((log: LogType, ...args: any[]) => boolean)[];
  private defaultLogOptions: LogOptions;

  constructor(defaultLogOptions: LogOptions) {
    this.filters = [];
    this.defaultLogOptions = defaultLogOptions;
  }

  public addFilter(filter: (log: LogType, ...args: any[]) => boolean): void {
    this.filters.push(filter);
  }

  public applyFilters(log: LogType, ...args: any[]): boolean {
    return this.filters.every((filter) => filter(log, ...args));
  }

  public useFilter(log: LogType, ...args: any[]): boolean {
    const filters = this.applyFilters(log, ...args);

    return filters;
  }
}

export default LogFilterManager;