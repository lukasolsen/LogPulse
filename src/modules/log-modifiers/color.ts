import {ConsoleTransport, LogLocation} from '../logLocation';
import {Singleton} from '../../utils/Singleton';
import {PREDEFINED_COLORS} from '../../constants/ColorControls';

export class ColorManager extends Singleton<ColorManager> {
  private logLocation: LogLocation;
  private predefinedColors: PredefinedColorsType;
  private colors: Color[];

  constructor(logLocation?: LogLocation) {
    super();

    this.logLocation = logLocation || new ConsoleTransport();
    this.predefinedColors = PREDEFINED_COLORS;

    this.colors = [];

    Object.keys(this.predefinedColors).forEach((color) => {
      this.colors.push({
        name: color,
        color: this.predefinedColors[color] as unknown as string,
      });
    });
  }

  /**
   * The function checks if a given string is a valid hexadecimal color code.
   * @param {string} hex - The `hex` parameter is a string representing a hexadecimal color code.
   * @return {boolean} The function returns a boolean value. If the `hex` parameter is a valid
   * hexadecimal color code, the function returns true. Otherwise, it returns false.
   * @example
   * Colors.getInstance().isValidHex("#FF0000");
   * // returns true
   * Colors.getInstance().isValidHex("FALSE");
   * // returns false
   */
  private isValidHex(hex: string): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  }

  /**
   * The function checks if a given name is a valid predefined color.
   * @param {string} name - The name parameter is a string that represents the name of a color.
   * @return {boolean} The function returns a boolean value. If the name is a valid predefined color,
   * the function returns true. Otherwise, it returns false.
   * @example
   * Colors.getInstance().isValidPredefinedColor("red");
   * // returns true
   * Colors.getInstance().isValidPredefinedColor("purple");
   * // returns false
   */
  public isValidPredefinedColor(name: string): boolean {
    return Object.keys(this.predefinedColors).includes(name);
  }

  /**
   * The function "getColors" returns an array of ColorT objects.
   * @return {Color} The `getColors()` function is returning an array of `ColorT` objects.
   * @example
   * Colors.getInstance().getColors();
   * // returns [{name: "red", hex: "#FF0000"}, {name: "blue", hex: "#0000FF"}]
   */
  public getColors(): Color[] {
    return this.colors;
  }

  /**
   * The function `getColor` takes a name as input and returns the corresponding color object from an
   * array of colors.
   * @param {string} name - A string representing the name of the color to search for.
   * @return {Color} a ColorT object that matches the given name.
   * @example
   * Colors.getInstance().getColor("red");
   */
  public getColor(name: string): Color {
    return this.colors.find(
      (color) => color.name.toLowerCase() === name.toLowerCase()
    );
  }

  /**
   * The addColor function adds a new color to an array of colors if the hex value is valid and the
   * name is not already taken.
   * @param {string} name - A string representing the name of the color to be added.
   * @param {ColorFormatType} [color] - The `hex` parameter is an optional parameter of type `HexT`. It represents
   * the hexadecimal color value that will be associated with the color name. If a valid `hex` value is
   * provided, it will be used to create a new color object and add it to the `colors` array.
   * @return {void}
   * @example
   * Colors.getInstance().addColor("red", "#FF0000");
   */
  public addColor(name: string, color?: ColorFormatType): void {
    // Check if the name is already taken
    if (this.colors.find((color) => color.name === name)) {
      throw new Error(`Color name ${name} is already taken.`);
    }

    if (color) {
      this.colors.push({name, color: color as unknown as string});
    }
  }
}
