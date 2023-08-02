interface ToStringOptions {
  indent?: number;
  replaceQuotes?: boolean;
}

function toString(obj: any, options: ToStringOptions = {}): string {
  if (typeof obj === 'string') {
    return obj;
  }

  let str;
  if (obj instanceof Error) {
    str = obj.stack || obj.message || '';
  } else if (typeof obj === 'object') {
    str = JSON.stringify(obj, null, options.indent || 2);
    if (options.replaceQuotes) {
      str = str.replace(/"/g, '');
    }
  } else {
    str = String(obj);
  }

  return str;
}

function toJSON<T>(jsonStr: string): T {
  return JSON.parse(jsonStr) as T;
}

function stringifyArg(arg: any): string {
  switch (typeof arg) {
    case 'string':
      return arg;
    case 'number':
      return arg.toString();
    case 'object':
      if (arg instanceof Error) {
        return arg.stack || arg.message || '';
      } else if (arg instanceof Date) {
        return arg.toISOString();
      } else {
        return JSON.stringify(arg);
      }
    default:
      return arg.toString();
  }
}

export {toString, toJSON, stringifyArg};
