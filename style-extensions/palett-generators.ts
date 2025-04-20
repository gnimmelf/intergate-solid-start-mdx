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
  return lch(parse(hexColor), COLOR_MODE) as LCH
}

export function ensureLchMode(color: LCH) {
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
        value: formatFn(ensureLchMode(color))
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

  const palette = createRamp(targetHueSteps[type].map((step: number) => ensureLchMode({
    l: baseColor.l,
    c: baseColor.c,
    h: adjustHue(baseColor.h + step),
  })))

  return palette
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

/**
 * Create a range of hues, starting with basColor and adding the range
 * @param baseColor LHC color
 * @param options range Number of steps to create palette
 * @param options lightnessRange +/- value for lightness of final step
 * @param options hueRange +/- value for hue of final step
 * @returns
 */
export function createHueShiftPalette(baseColor: LCH,  options?: {
  range: number
  lightnessRange: number,
  hueRange?: number,
  baseColorPos?: 'start' | 'center'
}) {
  const { lightnessRange, hueRange, range, baseColorPos } = Object.assign({
    hueRange: 0,
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
    const lightnessValue = lerpStepValue(i, maxSteps, baseColor.l, baseColor.l + lightnessRange);
    palette.push(ensureLchMode({
      l: lightnessValue,
      h: hueValue,
      c: chroma,
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

export function getContrastingLch(input: LCH) {
  const contrast = 50;
  const newL = input.l > 50
    ? input.l - contrast
    : Math.min(100, input.l + contrast);
  const newH = (input.h + 180) % 360;

  // build an LCh object
  const target: LCH & { mode: 'lch' } = {
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
