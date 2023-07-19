export {};

declare global {
  type HexType = string;
  type ANSIType = string;
  type RGBType = readonly [number, number, number];
  type HSLType = readonly [number, number, number];

  type ColorFormatType = {
    hex?: HexType;
    ansi?: ANSIType;
    rgb?: RGBType;
    hsl?: HSLType;
  } & ({hex: HexType} | {ansi: ANSIType} | {rgb: RGBType} | {hsl: HSLType});

  type ModifierFormatType = {
    css: string;
    ansi: ANSIType;
  };

  type PredefinedColorsType = {
    [key: string]: ColorFormatType;
  };

  type ModifiersType = {
    [key: string]: ModifierFormatType;
  };

  interface Color {
    name: string;
    color: HexType | ANSIType;
  }
}

export interface TurnTextToColor {
  text: string;
  colors: HexType[] | ANSIType[];
}
