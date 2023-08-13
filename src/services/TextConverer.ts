import {LogHandleOptions} from '../types/global';

function convertArgsToOptions(...args: any[]): LogHandleOptions {
  const options: LogHandleOptions = {};

  if (args.length === 0) return options;

  args.map((arg) => {
    switch (typeof arg) {
      case 'string':
        if (options.data === undefined) {
          options.data = arg;
        } else {
          options.data += arg;
        }

        break;
      case 'object':
        // Check if it's an Error or Date object using switch and case
        const keys = Object.keys(arg);

        // Loop around each key and check if it's an Error or Date object
        keys.forEach((key) => {
          switch (arg[key].constructor.name) {
            case 'Error':
              options.error = arg[key];
              break;
            case 'Date':
              options.timestamp = arg[key];
              break;
            default:
              options.object = arg[key];
              break;
          }
        });
    }
  });

  options.arguments_ = args;

  return options;
}

function supportText(text: any[] | any): string {
  function stringify(arg: any, indent: string = ''): string {
    if (typeof arg === 'object' && arg !== null) {
      if (arg instanceof Error) {
        const stack = arg.stack
          ? arg.stack.replace(/\n/g, `\n${indent}  `)
          : '';
        const message = arg.message ? `"message": "${arg.message}",` : '';
        return `{\n${indent}  ${message}\n${indent}  "stack": "${stack}"\n${indent}}`;
      } else {
        const properties = Object.keys(arg).map((key) => {
          const value = stringify(arg[key], `${indent}  `);
          return `${key}: ${value}`;
        });
        return `{\n${indent}  ${properties.join(
          ',\n' + indent + '  '
        )}\n${indent}}`;
      }
    } else {
      return JSON.stringify(arg);
    }
  }

  const textAsString = Array.isArray(text)
    ? text.map((arg) => stringify(arg)).join(' ')
    : stringify(text);

  return textAsString;
}

export {convertArgsToOptions, supportText};
