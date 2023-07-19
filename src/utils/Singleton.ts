export abstract class Singleton<T> {
  private static instance: any;

  public static getInstance<T>(
    this: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    if (!(this as any).instance) {
      (this as any).instance = new this(...args);
    }
    return (this as any).instance;
  }
}
