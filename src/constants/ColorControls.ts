import {LogLevelUsageT} from '../types/logManager';

export type HexT = string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RGBT = [number, number, number];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type HSLT = [number, number, number];

export type PredefinedColorsT = {
  [key: string]: HexT;
};

export type ColorModifiersT = {
  [key: string]: HexT;
};

export const PREDEFINED_COLORS: PredefinedColorsT = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  grey: '#808080',
  orange: '#FFA500',
  purple: '#800080',
  brown: '#A52A2A',
  maroon: '#800000',
  olive: '#808000',
  lime: '#00FF00',
  aqua: '#00FFFF',
  teal: '#008080',
  navy: '#000080',
  fuchsia: '#FF00FF',
  silver: '#C0C0C0',
  limegreen: '#32CD32',
  indigo: '#4B0082',
  violet: '#EE82EE',
  pink: '#FFC0CB',
  salmon: '#FA8072',
  gold: '#FFD700',
  beige: '#F5F5DC',
  ivory: '#FFFFF0',
  khaki: '#F0E68C',
  lavender: '#E6E6FA',
  tan: '#D2B48C',
  tomato: '#FF6347',
  turquoise: '#40E0D0',
  wheat: '#F5DEB3',
  snow: '#FFFAFA',
  seashell: '#FFF5EE',
  sandybrown: '#F4A460',
  royalblue: '#4169E1',
  rosybrown: '#BC8F8F',
  powderblue: '#B0E0E6',
  plum: '#DDA0DD',
  peachpuff: '#FFDAB9',
  papayawhip: '#FFEFD5',
  palevioletred: '#DB7093',
  paleturquoise: '#AFEEEE',
  palegoldenrod: '#EEE8AA',
  orchid: '#DA70D6',
} as const;

export const TEXT_MODIFIERS: ColorModifiersT = {
  bold: 'font-weight: bold',
  italic: 'font-style: italic',
  underline: 'text-decoration: underline',
  strikethrough: 'text-decoration: line-through',
  blink: 'text-decoration: blink',
  inverse: 'filter: invert(100%)',
  hidden: 'visibility: hidden',
  visible: 'visibility: visible',
  reset: 'all: unset',
  uppercase: 'text-transform: uppercase',
  lowercase: 'text-transform: lowercase',
  capitalize: 'text-transform: capitalize',
  'no-wrap': 'white-space: nowrap',
} as const;

export interface ColorT {
  name: string;
  hex: HexT;
}

export interface turnTextToColorConsoleT {
  text: string;
  colors: string[];
}

export interface FormatOptions {
  timestamp?: string;
  logLevel?: LogLevelUsageT;
  message?: string;
}
