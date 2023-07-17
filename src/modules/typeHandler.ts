import {
  ColorT,
  HexT,
  PREDEFINED_COLORS,
  ColorModifiersT,
  TEXT_MODIFIERS,
  turnTextToColorConsoleT,
} from "../constants/ColorControls";

import { LogT, LogLevelUsageT } from "../types/logManager";

import { getLogLevelName } from "../constants/LogLevels";

export class ColorManager {
  private colors: ColorT[];
  static instance: ColorManager;

  constructor() {
    this.colors = [];

    Object.keys(PREDEFINED_COLORS).forEach((color) => {
      this.colors.push({ name: color, hex: PREDEFINED_COLORS[color] });
    });
  }

  public static getInstance(): ColorManager {
    if (!this.instance) {
      this.instance = new ColorManager();
    }
    return this.instance;
  }

  /**
   *
   * @param name
   * @param hex
   * @description Adds a color to the color manager.
   * @example
   * Colors.getInstance().addColor("red", "#FF0000");
   * @memberof Colors
   * @instance
   * @method addColor
   * @public
   * @since 1.0.0
   * @version 1.0.0
   * @throws {Error} If the hex is not a valid hex.
   * @throws {Error} If the name is already taken.
   * @throws {Error} If the hex is not a valid hex.
   * @throws {Error} If the name is already taken.
   * @throws {Error} If the hex is not a valid hex.
   * @throws {Error} If the name is already taken.
   *
   */
  public addColor(name: string, hex?: HexT): void {
    //Check if the hex is valid
    if (!this.isValidHex(hex)) {
      throw new Error(`Hex ${hex} is not a valid hex.`);
    }

    //Check if the name is already taken
    if (this.colors.find((color) => color.name === name)) {
      throw new Error(`Color name ${name} is already taken.`);
    }

    if (hex) {
      this.colors.push({ name, hex });
    }
  }

  /**
   *
   * @param name
   * @returns ColorT
   * @description Returns a color by name.
   * @example
   * const color = Colors.getInstance().getColor("red");
   * console.log(color);
   *
   * // { name: 'red', hex: '#FF0000' }
   * @memberof Colors
   * @instance
   * @method getColor
   * @public
   * @since 1.0.0
   * @version 1.0.0
   */
  public getColor(name: string): ColorT {
    return this.colors.find(
      (color) => color.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   *
   * @returns ColorT[]
   * @description Returns all colors.
   * @example
   * const colors = Colors.getInstance().getColors();
   * console.log(colors);
   * // [
   * //   { name: 'red', hex: '#FF0000' },
   * //   { name: 'green', hex: '#00FF00' },
   * //   { name: 'blue', hex: '#0000FF' },
   * //   { name: 'yellow', hex: '#FFFF00' },
   * //   { name: 'cyan', hex: '#00FFFF' },
   * //   { name: 'magenta', hex: '#FF00FF' },
   * // ]
   * @memberof Colors
   * @instance
   * @method getColors
   * @public
   * @since 1.0.0
   * @version 1.0.0
   *
   */
  public getColors(): ColorT[] {
    return this.colors;
  }

  public isValidHex(hex: string): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  }

  public isValidPredefinedColor(name: string): boolean {
    return Object.keys(PREDEFINED_COLORS).includes(name);
  }
}

export class ModifierManager {
  private modifiers: ColorModifiersT[];

  constructor() {
    this.modifiers = [];

    //Add predefined modifiers
    Object.keys(TEXT_MODIFIERS).forEach((modifier) => {
      this.modifiers.push({ func: TEXT_MODIFIERS[modifier] });
    });
  }

  public addModifier(name: string, style: string): void {
    if (this.modifiers.find((modifier) => modifier.name === name)) {
      throw new Error(`Modifier name ${name} is already taken.`);
    }

    this.modifiers.push({ name, style });
  }

  public getModifiers(): ColorModifiersT[] {
    return this.modifiers;
  }

  public isValidModifier(name: string): boolean {
    return !!this.modifiers.find(
      (modifier) => modifier.name.toLowerCase() === name.toLowerCase()
    );
  }

  public getModifier(name: string): ColorModifiersT {
    const modifier = this.modifiers.find((modifier) => modifier.name === name);

    if (!modifier) {
      throw new Error(`Modifier ${name} does not exist.`);
    }

    return modifier;
  }
}

export class FormatManager {
  private format: string;
  static instance: FormatManager;

  constructor() {
    const DEFAULT_FORMAT =
      "%{silver}[%{teal}%{timestamp}%{silver}] %{silver}[%{uppercase}%{logLevel}%{silver}]%{reset} %{message}";
    this.format = DEFAULT_FORMAT;
  }

  public static getInstance(): FormatManager {
    if (!this.instance) {
      this.instance = new FormatManager();
    }
    return this.instance;
  }

  public setFormat(format: string): void {
    this.format = format;
  }

  public getFormat(): string {
    return this.format;
  }

  public formatMessage(log: LogT): string {
    const message = this.format
      .replace(
        /%\{timestamp\}/g,
        this.formatTimestamp(log.timestamp.toString())
      )
      .replace(/%\{logLevel\}/g, log.logLevel.toString())
      .replace(
        /%\{message\}/g,
        getLogLevelName(log.message as LogLevelUsageT).toString()
      );

    return message;
  }

  private getCurrentTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private formatTimestamp(timestamp: string): string {
    return new Date(parseInt(timestamp)).toLocaleString();
  }
}

export function turnTextToColorConsole(text: string): turnTextToColorConsoleT {
  const colorRegex = /%\{([a-zA-Z]+)\}/g;
  let match;
  let lastIndex = 0;
  let result = { text: "", colors: [] };

  while ((match = colorRegex.exec(text)) !== null) {
    const color = match[1].toLowerCase();
    const colorStyle = PREDEFINED_COLORS[color] || TEXT_MODIFIERS[color] || "";
    const startIndex = match.index + match[0].length;
    const endIndex = colorRegex.lastIndex - match[0].length;

    //result += `%c${text.substring(lastIndex, startIndex)}`;
    result.text += text.substring(lastIndex, startIndex - match[0].length);
    result.text += `%c`; //${text.substring(startIndex, endIndex)}`;

    //check if the color is a color, or a modifier
    if (this.colorManager.isValidPredefinedColor(color)) {
      result.colors.push("color: " + colorStyle);
    } else {
      result.colors.push(colorStyle);
    }

    lastIndex = colorRegex.lastIndex;
  }

  result.text += text.substring(lastIndex);
  return result;
}

export function formatText(log: LogT): string {
  return FormatManager.getInstance().formatMessage(log);
}

export function formatTextAllDependencies(log: LogT): turnTextToColorConsoleT {
  const format = FormatManager.getInstance().formatMessage(log);
  const { text, colors } = turnTextToColorConsole(format);
  return { text, colors };
}
