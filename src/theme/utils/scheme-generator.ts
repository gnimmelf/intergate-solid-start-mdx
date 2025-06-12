import chroma from 'chroma-js';
import { setProperty } from 'dot-prop';
import { colorMetadata, getColorMetadataByNumber } from './scheme-color-meta-data';
import type { CssColor, Color, ColorNumber, ColorScheme, ThemeInfo, ColorMetadata } from './types';
import { getLightnessFromHex, getLuminanceFromLightness } from './color-utils';

export const RESERVED_COLORS = [
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
];

/**
 * Generates scheme color tokens based on a base color.
 *
 * @param color The base color that is used to generate the color scale
 * @returns
 */
export function createSchemeColorTokens(color: CssColor) {
  const schemes: ThemeInfo = {
    light: genereateColorScheme(color, 'light'),
    dark: genereateColorScheme(color, 'dark'),
  }

  console.log(schemes.light)

  const colorTokens = Object.values(colorMetadata).reduce((acc, meta: ColorMetadata) => {
    console.log(meta)
    const token = {
      base: schemes.light.find(({ name }) => name == meta.name)!.hex,
      _dark: schemes.dark.find(({ name }) => name == meta.name)!.hex,
      description: meta.description
    }
    const dotPath = meta.name.replaceAll('-', '.')
    setProperty(acc, dotPath, { value: token })
    return acc
  }, {})


  return colorTokens
}


/**
 * Generates a color scheme based on a base color and a color mode.
 *
 * @param color The base color that is used to generate the color scale
 * @param colorScheme The color scheme to generate a scale for
 */
export const genereateColorScheme = (color: CssColor, colorScheme: ColorScheme): Color[] => {
  let interpolationColor = color;

  // Reduce saturation in dark mode for the interpolation colors
  if (colorScheme === 'dark') {
    const [L, C, H] = chroma(color).oklch();
    const chromaModifier = 0.7;
    interpolationColor = chroma(L, C * chromaModifier, H, 'oklch').hex() as CssColor;
  }

  const colors = Object.entries(colorMetadata).reduce((acc, [key, colorData]: any) => {
    const luminance = colorData.luminance[colorScheme];
    acc[key] = {
      ...colorData,
      hex: chroma(interpolationColor).luminance(luminance).hex() as CssColor,
    };
    return acc;
  }, {} as Record<string, Color>);

  // Generate base colors
  const baseColors = generateBaseColors(color, colorScheme);

  colors['base-default'] = { ...colors['base-default'], hex: baseColors.default };
  colors['base-hover'] = { ...colors['base-hover'], hex: baseColors.hover };
  colors['base-active'] = { ...colors['base-active'], hex: baseColors.active };
  colors['base-contrast-subtle'] = {
    ...colors['base-contrast-subtle'],
    hex: generateColorContrast(baseColors.default, 'subtle'),
  };
  colors['base-contrast-default'] = {
    ...colors['base-contrast-default'],
    hex: generateColorContrast(baseColors.default, 'default'),
  };

  return Object.values(colors)
};

/**
 * Returns the base colors for a color and color scheme.
 *
 * @param color The base color
 * @param colorScheme The color scheme to generate the base colors for
 * @returns
 */
const generateBaseColors = (color: CssColor, colorScheme: ColorScheme) => {
  let colorLightness = getLightnessFromHex(color);
  if (colorScheme !== 'light') {
    colorLightness = colorLightness <= 30 ? 70 : 100 - colorLightness;
  }

  const modifier = colorLightness <= 30 || (colorLightness >= 49 && colorLightness <= 65) ? -8 : 8;
  const calculateLightness = (base: number, mod: number) => base - mod;

  return {
    default:
      colorScheme === 'light'
        ? color
        : (chroma(color).luminance(getLuminanceFromLightness(colorLightness)).hex() as CssColor),
    hover: chroma(color)
      .luminance(getLuminanceFromLightness(calculateLightness(colorLightness, modifier)))
      .hex() as CssColor,
    active: chroma(color)
      .luminance(getLuminanceFromLightness(calculateLightness(colorLightness, modifier * 2)))
      .hex() as CssColor,
  };
};

/**
 * Generates contrast color for given color
 *
 * @param color color
 * @param type 'default' | 'subtle'
 */
export const generateColorContrast = (color: CssColor, type: 'default' | 'subtle'): CssColor => {
  if (type === 'default') {
    return chroma.contrast(color, '#ffffff') >= chroma.contrast(color, '#000000') ? '#ffffff' : '#000000';
  }

  if (type === 'subtle') {
    const contrastWhite = chroma.contrast(color, '#ffffff');
    const contrastBlack = chroma.contrast(color, '#000000');
    const lightness = getLightnessFromHex(color);
    const modifier = lightness <= 40 || lightness >= 60 ? 60 : 50;
    const targetLightness = contrastWhite >= contrastBlack ? lightness + modifier : lightness - modifier;

    return chroma(color).luminance(getLuminanceFromLightness(targetLightness)).hex() as CssColor;
  }

  return color;
};

/**
 * Returns the css variable for a color.
 * TODO: deprecate this
 * @param colorType The type of color
 * @param colorNumber The number of the color
 */
export const getCssVariable = (colorType: string, colorNumber: ColorNumber) => {
  return `--ds-color-${colorType}-${getColorMetadataByNumber(colorNumber).displayName.toLowerCase().replace(/\s/g, '-')}`;
};