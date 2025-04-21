/**
 * See:
 *  https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 */

import {
  formatHex,
  parse,
  lch,
  Color,
  clampChroma,

} from "culori"

type LCh = {
  l: number // 0-100 - Percieved brightness
  c: number // 0-150 - Chroma (roughly representing the "amount of color")
  h: number // 0-360 - Hue angle, see https://luncheon.github.io/lch-color-wheel/
  /**
   * LCh 40 deg samples
   * lch(80% 150 30deg)
   * lch(80% 150 60deg)
   * lch(80% 150 120deg)
   * lch(80% 150 180deg)
   * lch(80% 150 240deg)
   * lch(80% 150 360deg)
   */
}

const COLOR_MODE = 'lch'

export function toLch(colorString: string) {
  return lch(parse(colorString), COLOR_MODE) as LCh
}

export function ensureLchMode(color: LCh) {
  return {
    ...color,
    mode: COLOR_MODE
  } as LCh & { mode: string }
}

function adjustHue(val: number) {
  if (val < 0) val += Math.ceil(-val / 360) * 360;
  return val % 360;
}

function lerpStepValue(
  step: number,
  maxSteps: number,
  startValue: number,
  targetValue: number
) {
  // Interpolate value for step n in [0, maxSteps-1] to [startValue, targetValue]
  return startValue + (step / (maxSteps - 1)) * (targetValue - startValue);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function createRamp(palette: LCh[], formatFn = formatHex) {
  const entries = palette.map((color: LCh, idx) => {
    const index = idx === 0 ? "50" : idx * 100;
    return [
      `${index}`,
      {
        //@ts-expect-error
        value: formatFn(ensureLchMode(color))
      },
    ];
  });
  const ramp = Object.fromEntries(entries);
  return ramp
}

/**
 * Create a range of hues, starting with basColor and adding the range
 * @param baseColor LHC color
 * @param options range Number of steps to create palette
 * @param options lightnessRange +/- value for lightness of final step
 * @param options hueRange +/- value for hue of final step
 * @returns
 */
export function createHueShiftPalette(baseColor: LCh, options: {
  range?: number
  lightnessRange?: number,
  hueRange?: number,
  chromaRange?: number
  baseColorPos?: 'start' | 'center' | 'end'
} = {}) {
  const { lightnessRange, hueRange, chromaRange, range, baseColorPos } = Object.assign({
    range: 1,
    hueRange: 0,
    lightnessRange: 0,
    chromaRange: 0,
    baseColorPos: 'start'
  }, options);

  // Add base color
  const palette = [ensureLchMode(baseColor)];

  const chroma = baseColor.c;
  const maxSteps = range + 1;
  for (let i = 1; i < maxSteps; i++) {
    // Interpolate hueValue
    const hueValue = adjustHue(lerpStepValue(i, maxSteps, baseColor.h, baseColor.h + hueRange));
    // Interpolate lightnessValue
    const lightnessValue = lerpStepValue(i, maxSteps, baseColor.l, clamp(baseColor.l + lightnessRange, 0, 100));
    // Interpolate lightnessValue
    const chromaValue = lerpStepValue(i, maxSteps, baseColor.c, clamp(baseColor.c + chromaRange, 0, 150));

    palette[baseColorPos == 'start' ? 'push' : 'unshift'](ensureLchMode({
      l: lightnessValue,
      h: hueValue,
      c: chromaValue,
    }));

    if (baseColorPos === 'center') {
      // Interpolate hueValue
      const hueValue = adjustHue(lerpStepValue(i, maxSteps, baseColor.h, baseColor.h - hueRange));
      // Interpolate lightnessValue
      const lightnessValue = lerpStepValue(i, maxSteps, baseColor.l, baseColor.l - lightnessRange);
      palette.unshift(ensureLchMode({
        l: lightnessValue,
        h: hueValue,
        c: chroma,
      }));
    }
  }

  return createRamp(palette);
}

export function getContrastingLch(input: LCh) {
  const contrast = 50;
  const newL = input.l > 50
    ? input.l - contrast
    : Math.min(100, input.l + contrast);
  const newH = (input.h + 180) % 360;

  // build an LCh object
  const target: LCh & { mode: 'lch' } = {
    mode: 'lch',
    l: newL,
    c: input.c,
    h: newH
  };

  // clampChroma will find the highest c ≤ input.c
  // that stays in sRGB gamut :contentReference[oaicite:0]{index=0}
  const safeLch = clampChroma(target);

  // formatHex converts to sRGB under the hood and returns #RRGGBB
  return safeLch;
}

export function getContrastingHex(hexColor: string) {
  const lch = toLch(hexColor)
  const lchContrast = getContrastingLch(lch)
  const hexContrast = formatHex(lchContrast)
  return hexContrast
}
