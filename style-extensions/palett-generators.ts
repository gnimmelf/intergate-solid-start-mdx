/**
 * See:
 *  https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 */

import {
  formatHex,
  parse,
  lch,
  Color
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

function map(n: number, start1: number, end1: number, start2: number, end2: number) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export function createRamp(palette: LCH[]) {
  const entries = palette.map((color: LCH, idx) => {
    const index = idx === 0 ? "50" : idx * 100;
    return [
      `${index}`,
      {
        //@ts-expect-error
        value: formatHex(ensureMode(color)),
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

export function createHueShiftPalette(baseColor: LCH, options: { minLightness: number, maxLightness: number, hueStep: number }) {
  const { minLightness, maxLightness, hueStep } = options;

  const palette = [ensureMode(baseColor)];

  for (let i = 1; i < 5; i++) {
    const hueDark = adjustHue(baseColor.h - hueStep * i);
    const hueLight = adjustHue(baseColor.h + hueStep * i);
    const lightnessDark = map(i, 0, 4, baseColor.l, minLightness);
    const lightnessLight = map(i, 0, 4, baseColor.l, maxLightness);
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