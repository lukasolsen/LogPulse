import {
  LevelUsageType,
  ModifiersType,
  PredefinedColorsType,
} from '../types/global';

export const PREDEFINED_COLORS: PredefinedColorsType = {
  red: {
    hex: '#FF0000',
    ansi: '\u001b[31m',
    rgb: [255, 0, 0],
    hsl: [0, 100, 50],
  },
  green: {
    hex: '#00FF00',
    ansi: '\u001b[32m',
    rgb: [0, 255, 0],
    hsl: [120, 100, 50],
  },
  blue: {
    hex: '#0000FF',
    ansi: '\u001b[34m',
    rgb: [0, 0, 255],
    hsl: [240, 100, 50],
  },
  yellow: {
    hex: '#FFFF00',
    ansi: '\u001b[33m',
    rgb: [255, 255, 0],
    hsl: [60, 100, 50],
  },
  cyan: {
    hex: '#00FFFF',
    ansi: '\u001b[36m',
    rgb: [0, 255, 255],
    hsl: [180, 100, 50],
  },
  magenta: {
    hex: '#FF00FF',
    ansi: '\u001b[35m',
    rgb: [255, 0, 255],
    hsl: [300, 100, 50],
  },
  white: {
    hex: '#FFFFFF',
    ansi: '\u001b[37m',
    rgb: [255, 255, 255],
    hsl: [0, 0, 100],
  },
  black: {
    hex: '#000000',
    ansi: '\u001b[30m',
    rgb: [0, 0, 0],
    hsl: [0, 0, 0],
  },
  gray: {
    hex: '#808080',
    ansi: '\u001b[90m',
    rgb: [128, 128, 128],
    hsl: [0, 0, 50],
  },
  grey: {
    hex: '#808080',
    ansi: '\u001b[90m',
    rgb: [128, 128, 128],
    hsl: [0, 0, 50],
  },
  orange: {
    hex: '#FFA500',
    ansi: '\u001b[38;5;208m',
    rgb: [255, 165, 0],
    hsl: [39, 100, 50],
  },
  purple: {
    hex: '#800080',
    ansi: '\u001b[35m',
    rgb: [128, 0, 128],
    hsl: [300, 100, 25],
  },
  brown: {
    hex: '#A52A2A',
    ansi: '\u001b[38;5;52m',
    rgb: [165, 42, 42],
    hsl: [0, 59, 41],
  },
  maroon: {
    hex: '#800000',
    ansi: '\u001b[38;5;88m',
    rgb: [128, 0, 0],
    hsl: [0, 100, 25],
  },
  olive: {
    hex: '#808000',
    ansi: '\u001b[38;5;100m',
    rgb: [128, 128, 0],
    hsl: [60, 100, 25],
  },
  lime: {
    hex: '#00FF00',
    ansi: '\u001b[32m',
    rgb: [0, 255, 0],
    hsl: [120, 100, 50],
  },
  aqua: {
    hex: '#00FFFF',
    ansi: '\u001b[36m',
    rgb: [0, 255, 255],
    hsl: [180, 100, 50],
  },
  teal: {
    hex: '#008080',
    ansi: '\u001b[38;5;30m',
    rgb: [0, 128, 128],
    hsl: [180, 100, 25],
  },
  navy: {
    hex: '#000080',
    ansi: '\u001b[38;5;18m',
    rgb: [0, 0, 128],
    hsl: [240, 100, 25],
  },
  fuchsia: {
    hex: '#FF00FF',
    ansi: '\u001b[35m',
    rgb: [255, 0, 255],
    hsl: [300, 100, 50],
  },
  silver: {
    hex: '#C0C0C0',
    ansi: '\u001b[90m',
    rgb: [192, 192, 192],
    hsl: [0, 0, 75],
  },
  limegreen: {
    hex: '#32CD32',
    ansi: '\u001b[38;5;118m',
    rgb: [50, 205, 50],
    hsl: [120, 61, 50],
  },
  indigo: {
    hex: '#4B0082',
    ansi: '\u001b[38;5;54m',
    rgb: [75, 0, 130],
    hsl: [275, 100, 25],
  },
  violet: {
    hex: '#EE82EE',
    ansi: '\u001b[38;5;165m',
    rgb: [238, 130, 238],
    hsl: [300, 76, 72],
  },
  pink: {
    hex: '#FFC0CB',
    ansi: '\u001b[38;5;213m',
    rgb: [255, 192, 203],
    hsl: [350, 100, 88],
  },
  salmon: {
    hex: '#FA8072',
    ansi: '\u001b[38;5;209m',
    rgb: [250, 128, 114],
    hsl: [6, 93, 71],
  },
  gold: {
    hex: '#FFD700',
    ansi: '\u001b[38;5;220m',
    rgb: [255, 215, 0],
    hsl: [51, 100, 50],
  },
  beige: {
    hex: '#F5F5DC',
    ansi: '\u001b[38;5;230m',
    rgb: [245, 245, 220],
    hsl: [60, 56, 91],
  },
  ivory: {
    hex: '#FFFFF0',
    ansi: '\u001b[38;5;231m',
    rgb: [255, 255, 240],
    hsl: [60, 100, 97],
  },
  khaki: {
    hex: '#F0E68C',
    ansi: '\u001b[38;5;228m',
    rgb: [240, 230, 140],
    hsl: [54, 77, 75],
  },
  lavender: {
    hex: '#E6E6FA',
    ansi: '\u001b[38;5;189m',
    rgb: [230, 230, 250],
    hsl: [240, 67, 94],
  },
  tan: {
    hex: '#D2B48C',
    ansi: '\u001b[38;5;180m',
    rgb: [210, 180, 140],
    hsl: [34, 44, 69],
  },
  tomato: {
    hex: '#FF6347',
    ansi: '\u001b[38;5;209m',
    rgb: [255, 99, 71],
    hsl: [9, 100, 64],
  },
  turquoise: {
    hex: '#40E0D0',
    ansi: '\u001b[38;5;80m',
    rgb: [64, 224, 208],
    hsl: [174, 72, 56],
  },
  wheat: {
    hex: '#F5DEB3',
    ansi: '\u001b[38;5;229m',
    rgb: [245, 222, 179],
    hsl: [39, 77, 83],
  },
  snow: {
    hex: '#FFFAFA',
    ansi: '\u001b[38;5;255m',
    rgb: [255, 250, 250],
    hsl: [0, 100, 99],
  },
  seashell: {
    hex: '#FFF5EE',
    ansi: '\u001b[38;5;255m',
    rgb: [255, 245, 238],
    hsl: [25, 100, 97],
  },
  sandybrown: {
    hex: '#F4A460',
    ansi: '\u001b[38;5;215m',
    rgb: [244, 164, 96],
    hsl: [28, 87, 67],
  },
  royalblue: {
    hex: '#4169E1',
    ansi: '\u001b[38;5;62m',
    rgb: [65, 105, 225],
    hsl: [225, 73, 57],
  },
  rosybrown: {
    hex: '#BC8F8F',
    ansi: '\u001b[38;5;138m',
    rgb: [188, 143, 143],
    hsl: [0, 25, 65],
  },
  powderblue: {
    hex: '#B0E0E6',
    ansi: '\u001b[38;5;153m',
    rgb: [176, 224, 230],
    hsl: [187, 52, 80],
  },
  plum: {
    hex: '#DDA0DD',
    ansi: '\u001b[38;5;176m',
    rgb: [221, 160, 221],
    hsl: [300, 47, 75],
  },
  peachpuff: {
    hex: '#FFDAB9',
    ansi: '\u001b[38;5;217m',
    rgb: [255, 218, 185],
    hsl: [28, 100, 86],
  },
  papayawhip: {
    hex: '#FFEFD5',
    ansi: '\u001b[38;5;255m',
    rgb: [255, 239, 213],
    hsl: [37, 100, 92],
  },
  palevioletred: {
    hex: '#DB7093',
    ansi: '\u001b[38;5;169m',
    rgb: [219, 112, 147],
    hsl: [340, 60, 65],
  },
  paleturquoise: {
    hex: '#AFEEEE',
    ansi: '\u001b[38;5;159m',
    rgb: [175, 238, 238],
    hsl: [180, 65, 81],
  },
  palegoldenrod: {
    hex: '#EEE8AA',
    ansi: '\u001b[38;5;222m',
    rgb: [238, 232, 170],
    hsl: [55, 67, 80],
  },
  orchid: {
    hex: '#DA70D6',
    ansi: '\u001b[38;5;170m',
    rgb: [218, 112, 214],
    hsl: [302, 59, 65],
  },
} as const;

export const TEXT_MODIFIERS: ModifiersType = {
  bold: {
    css: 'font-weight: bold',
    ansi: '\u001b[1m',
  },
  italic: {
    css: 'font-style: italic',
    ansi: '\u001b[3m',
  },
  underline: {
    css: 'text-decoration: underline',
    ansi: '\u001b[4m',
  },
  inverse: {
    css: 'filter: invert(100%)',
    ansi: '\u001b[7m',
  },
  strikethrough: {
    css: 'text-decoration: line-through',
    ansi: '\u001b[9m',
  },
  reset: {
    css: 'all: unset',
    ansi: '\u001b[0m',
  },
  visible: {
    css: 'visibility: visible',
    ansi: '\u001b[28m',
  },
  hidden: {
    css: 'visibility: hidden',
    ansi: '\u001b[8m',
  },
} as const;

export interface FormatOptions {
  timestamp?: string;
  level?: LevelUsageType;
  message?: string;
}
