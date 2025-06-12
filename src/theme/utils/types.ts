export type ColorScheme = 'light' | 'dark' | 'contrast';
export type ContrastMode = 'aa' | 'aaa';
export type ColorNumber = SemanticColorNumberMap[keyof SemanticColorNumberMap];
export type ColorNames = keyof SemanticColorNumberMap;
export type GlobalColors = 'red' | 'blue' | 'green' | 'orange' | 'purple';
export type ColorError = 'none' | 'decorative' | 'interaction';

export type LCh = {
  l: number // 0-100 - Percieved brightness
  c: number // 0-150 - Chroma (roughly representing the "amount of color")
  h: number // 0-360 - Hue angle, see https://luncheon.github.io/lch-color-wheel/
  /**
   * LCh step samples
   * lch(80% 150 30deg)
   * lch(80% 150 60deg)
   * lch(80% 150 120deg)
   * lch(80% 150 180deg)
   * lch(80% 150 240deg)
   * lch(80% 150 360deg)
   */
}

type SemanticColorNumberMap = {
  'background-default': 1;
  'background-tinted': 2;
  'surface-default': 3;
  'surface-tinted': 4;
  'surface-hover': 5;
  'surface-active': 6;
  'border-subtle': 7;
  'border-default': 8;
  'border-strong': 9;
  'text-subtle': 10;
  'text-default': 11;
  'base-default': 12;
  'base-hover': 13;
  'base-active': 14;
  'base-contrast-subtle': 15;
  'base-contrast-default': 16;
};

type SemanticColorMapping = {
  [K in keyof SemanticColorNumberMap]: {
    name: K;
    number: SemanticColorNumberMap[K];
  };
};

export type ColorMetadataByName = {
  [P in keyof SemanticColorMapping]: SemanticColorMapping[P] & ColorMetadata;
};

export type ColorMetadata = {
  name: ColorNames;
  number: ColorNumber;
  displayName: string;
  description: {
    short: string;
    long: string;
  };
  group: string;
  luminance: {
    light: number;
    dark: number;
    contrast: number;
  };
};

export type Color = ColorMetadata & {
  hex: CssColor;
};

export type ThemeInfo = {
  light: Color[];
  dark: Color[];
};

/**
 * Supported CSS colors in `designsystemet/color`
 */
export type CssColor = HexColor;

/**
 * Different color formats.
 */
export type HexColor = `#${string}`;

export type RgbColor = `rgb(${number} ${number} ${number})`;
export type HslColor = `hsl(${Degrees} ${Percent} ${Percent})`;
export type HsvColor = `hsv(${Degrees} ${Percent} ${Percent})`;
export type HsluvColor = `hsluv(${number} ${number} ${number})`;
export type LabColor = `lab(${Percent} ${number} ${number})`;
export type LchColor = `lch(${Percent} ${number} ${Degrees})`;
export type OkLabColor = `oklab(${Percent} ${number} ${number})`;
export type OkLchColor = `oklch(${Percent} ${number} ${Degrees})`;
export type Cam02Color = `jab(${Percent} ${number} ${number})`;
export type Cam02pColor = `jch(${Percent} ${number} ${Degrees})`;
export type RgbaColor = `rgba(${number}, ${number}, ${number}, ${number})`;

export type Percent = `${number}%`;
export type Degrees = `${number}deg`;