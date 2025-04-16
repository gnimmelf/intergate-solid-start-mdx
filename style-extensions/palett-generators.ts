/**
 * See:
 *  https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 */

import {
  formatHex,
  parse,
  lch,
  formatCss,
} from "culori"

type LCH = {
  l: number
  c: number
  h: number
}

export enum ScientificPaletteType {
  Analogous = 'analogous',
  Triadic = 'triadic',
  Tetradic = 'tetradic',
  Complementary = 'complementary',
  SplitComplementary = 'splitComplementary'
}

const COLOR_MODE = 'lch'

export function toLch(hexColor: string) {
  return lch(parse(hexColor)) as LCH
}

function ensureMode(color: LCH) {
  return {
    ...color,
    mode: COLOR_MODE
  } as LCH & { mode: string }
}

function adjustHue(val: number) {
  if (val < 0) val += Math.ceil(-val / 360) * 360;

  return val % 360;
}

export function createRamp(palette: LCH[], formatFn = formatHex) {
  const entries = palette.map((color: LCH, idx) => {
    const index = idx === 0 ? "50" : idx * 100;
    return [
      `${index}`,
      {
        //@ts-expect-error
        value: formatFn(ensureMode(color))
      },
    ];
  });
  const ramp = Object.fromEntries(entries);
  return ramp
}

export function createMonoChromatic(fromColor: LCH, adjustments: 'darker' | 'ligher' | Pick<LCH, 'l' | 'c'>) {
  const ligher = {
    l: 98,
    c: 10
  }
  const darker = {
    l: 10,
    c: 20
  }

  let adjusted: LCH
  switch (adjustments) {
    case 'darker':
      adjusted = {
        ...fromColor,
        ...darker
      }
    case 'ligher':
      adjusted = {
        ...fromColor,
        ...ligher
      }
    default:
      adjusted = {
        ...fromColor,
        ...adjustments as any
      }
  }

  return adjusted
}

export function createScientificPalettes(baseColor: LCH, type: ScientificPaletteType) {
  const targetHueSteps = {
    analogous: [0, 30, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210]
  };

  const palette = createRamp(targetHueSteps[type].map((step: number) => ensureMode({
    l: baseColor.l,
    c: baseColor.c,
    h: adjustHue(baseColor.h + step),
  })))

  return palette
}

function mapRangeValue(
  step: number,
  maxSteps: number,
  startValue: number,
  targetValue: number
) {
  // Map n from [0, maxSteps-1] to [startValue, targetValue]
  return startValue + (step / (maxSteps - 1)) * (targetValue - startValue);
}

/**
 * Creates a palette by adding shifted colors
 * @param baseColor
 * @param options.range The number of hues to add on each side of the base color
 * @param options.minLightness The minimum lightness for the darkest hue
 * @param options.maxLightness The maximum lightness for the lightest hue
 * @param options.maxHue The hue deviation from the base color, distributed linearly across the hues
 * @returns
 */
export function createHueShiftPalette(baseColor: LCH,  options?: {
  range?: number
  minLightness?: number,
  maxLightness?: number,
  minHue?: number,
  maxHue?: number,
}) {
  const { minLightness, maxLightness, maxHue, minHue, range } = Object.assign({
    range: 4,
    maxLightness: 80,
    minLightness: 10,
    maxHue: 80,
    minHue: 80,
  }, options ?? {});

  const palette = [ensureMode(baseColor)];
  const maxSteps = range + 1;

  for (let i = 1; i < maxSteps; i++) {
    // Map hue for darker and lighter hues
    const hueDark = adjustHue(mapRangeValue(i, maxSteps, baseColor.h, baseColor.h - minHue));
    const hueLight = adjustHue(mapRangeValue(i, maxSteps, baseColor.h, baseColor.h + maxHue));
    // Map lightness for darker and lighter hues
    const lightnessDark = mapRangeValue(i, maxSteps, baseColor.l, minLightness);
    const lightnessLight = mapRangeValue(i, maxSteps, baseColor.l, maxLightness);
    const chroma = baseColor.c;

    palette.push(ensureMode({
      l: lightnessDark,
      c: chroma,
      h: hueDark,
    }));

    palette.unshift(ensureMode({
      l: lightnessLight,
      c: chroma,
      h: hueLight,
    }));
  }

  return createRamp(palette);
}