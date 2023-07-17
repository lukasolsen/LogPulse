import Logger from './Logger';

declare global {
  interface Window {
    Logger: typeof Logger;
  }
}

export default Logger;
