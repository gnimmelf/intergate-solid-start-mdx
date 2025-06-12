/**
 * See:
 *  https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 */

import chroma from 'chroma-js';
import { LCh, HexColor } from './types';

export const COLOR_MODE = 'lch'
export const defaultFormatFn = (color: LCh) => chroma.lch(color.l, color.c, color.h).hex()

export const formatHex = (color: LCh | string) => {
  if (typeof color === 'string') {
    return chroma(color).hex();
  }
  return chroma.lch(color.l, color.c, color.h).hex();
};

export const formatCss = (color: LCh | string) => {
  if (typeof color === 'string') {
    return chroma(color).css();
  }
  return chroma.lch(color.l, color.c, color.h).css('lch');
};

/**
 * Create a ramp of colors by accending integer keys starting at 50 then index * 100
 * @param palette colors
 * @param formatFn css format function
 * @returns ramp of colors with ascenign numeric keys
 */
export function createRamp(palette: LCh[], formatFn = defaultFormatFn) {
  const entries = palette.map((color: LCh, idx) => {
    const index = idx === 0 ? "50" : idx * 100;
    return [
      `${index}`,
      {
        value: formatFn(color)
      },
    ];
  });
  const ramp = Object.fromEntries(entries);
  return ramp
}

export function toLch(colorString: string): LCh {
  const [l, c, h] = chroma(colorString).lch();
  return {
    l: l || 0,
    c: c || 0,
    h: h || 0
  }
}

export function clampLch(color: LCh): LCh {
  return {
    ...color,
    l: clamp(color.l, 0, 100),
    c: clamp(color.c, 0, 150),
    h: adjustHue(color.h)
  }
}

/**
 * Adjusts hue to within bounds
 * @param val Hue value
 * @returns Adjusted hue value
 */
export function adjustHue(val: number) {
  if (val < 0) val += Math.ceil(-val / 360) * 360;
  return val % 360;
}

/**
 * Interpolate value for step n in [0, maxSteps-1] to [startValue, targetValue]
 * @param step
 * @param maxSteps
 * @param startValue
 * @param targetValue
 * @returns Value for step
 */
export function lerpStepValue(
  step: number,
  maxSteps: number,
  startValue: number,
  targetValue: number
) {
  return startValue + (step / (maxSteps - 1)) * (targetValue - startValue);
}

/**
 * Clamps value between min and max
 * @param value
 * @param min
 * @param max
 * @returns
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get a contrasting LCh color
 * @param input
 * @returns
 */
export function getContrastingLch(input: LCh): LCh {
  const contrast = 50;

  const newL = input.l > 50
    ? input.l - contrast
    : Math.min(100, input.l + contrast);
  const newH = (input.h + 180) % 360;

  // Create the target color
  const target: LCh = {
    l: newL,
    c: input.c,
    h: newH
  };

  // chroma-js automatically clamps to valid gamut when creating colors
  // We'll use chroma to ensure the color is valid and then convert back to LCh
  try {
    const chromaColor = chroma.lch(target.l, target.c, target.h);
    const [l, c, h] = chromaColor.lch();
    return {
      l: l || target.l,
      c: c || target.c,
      h: h || target.h
    };
  } catch (error) {
    // If the color is out of gamut, reduce chroma until it's valid
    let adjustedC = target.c;
    while (adjustedC > 0) {
      try {
        const chromaColor = chroma.lch(target.l, adjustedC, target.h);
        const [l, c, h] = chromaColor.lch();
        return {
          l: l || target.l,
          c: c || adjustedC,
          h: h || target.h
        };
      } catch {
        adjustedC -= 5;
      }
    }
    // Fallback to grayscale if all else fails
    return {
      l: target.l,
      c: 0,
      h: target.h
    };
  }
}

/**
 * Get the lightness from a HEX color
 *
 * @param hex The hex color
 */
export const getLightnessFromHex = (hex: HexColor) => {
  const [l] = chroma(hex).lch();
  return l;
};

/**
 * Get the luminance value from a lightness value
 *
 * @param lightness The lightness value
 */
export const getLuminanceFromLightness = (lightness: number) => {
  // Create a neutral gray color with the given lightness (c=0, h=0 for gray)
  return chroma.lch(lightness, 0, 0).luminance();
};