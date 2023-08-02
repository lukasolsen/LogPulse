import {LogType, TurnTextToColor} from '../types/global';
import {isBrowser, isNode} from '../utils/Common';
import {ColorManager, ModifierManager, FormatManager} from './log-modifiers';
import {LogLocation} from './logLocation';

export function turnTextToColor(
  text: string,
  logLocation?: LogLocation
): TurnTextToColor {
  const colorRegex = /\${([a-zA-Z1-9]+)}/g;
  let match;
  let lastIndex = 0;
  const result = {text: '', colors: []};

  while ((match = colorRegex.exec(text)) !== null) {
    const color = match[1].toLowerCase();
    const colorStyle =
      ColorManager.getInstance(logLocation).getColor(color) ??
      ModifierManager.getInstance(logLocation).getModifier(color);

    if (!colorStyle) {
      const startIndex = match.index + match[0].length;
      // result += `%c${text.substring(lastIndex, startIndex)}`;
      result.text += text.substring(lastIndex, startIndex - match[0].length);
    } else {
      const startIndex = match.index + match[0].length;
      // result += `%c${text.substring(lastIndex, startIndex)}`;
      result.text += text.substring(lastIndex, startIndex - match[0].length);

      //console.log(colorStyle);
      if (isNode()) {
        result.text += `${colorStyle['color']['ansi']}`;
      } else {
        result.text += `%c`;

        if (
          ColorManager.getInstance().isValidPredefinedColor(color) &&
          isBrowser()
        ) {
          result.colors.push('color: ' + colorStyle.color);
        } else {
          result.colors.push(colorStyle.color);
        }
      }
    }

    lastIndex = colorRegex.lastIndex;
  }

  result.text += text.substring(lastIndex);
  return result;
}

export function formatText(log: LogType): string {
  return FormatManager.getInstance().formatMessage(log);
}

export function formatTextAllDependencies(log: LogType): TurnTextToColor {
  const format = FormatManager.getInstance().formatMessage(log);
  const {text, colors} = turnTextToColor(format);
  return {text, colors};
}
