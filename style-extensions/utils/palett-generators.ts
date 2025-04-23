/**
 * See:
 *  https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 */

import { clampChroma, formatHex, parse } from 'culori'
import { adjustHue, clamp, createRamp, ensureLchMode, lerpStepValue } from './color-utils'

type LCh = {
  l: number // 0-100 - Percieved brightness
  c: number // 0-150 - Chroma (roughly representing the "amount of color")
  h: number // 0-360 - Hue angle, see https://luncheon.github.io/lch-color-wheel/
  mode?: string
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

/**
 * Create a range of hues, starting with basColor and adding the range
 * @param baseColor LHC color
 * @param options.range range Number of steps to create palette
 * @param options.lightnessRange lightnessRange +/- value for lightness of final step
 * @param options.hueRange hueRange +/- value for hue of final step
 * @param options.chromaRange chromaRange +/- value for chroma of final step
 * @param options.baseColorPos 'end' reverses the order of palette hues, 'center' add range hues up and down
 * @returns
 */
export function createRangePalette(baseColor: LCh, options: {
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

/**
 *
 * @param baseColor
 * @param options
 * @returns
 */
export function createTextColors(baseColor: LCh, options: {
  lightnessThreshold?: number
  textOffsets?: Partial<LCh>
  linkOffsets?: Partial<LCh>
  hoverOffsets?: Partial<LCh>
} = {}) {

  const { lightnessThreshold } = Object.assign({
    lightnessThreshold: 50,
  }, options);

  const textOffsets = Object.assign({ l: 5, c: -20, h: 0 }, options.textOffsets || {})
  const linkOffsets = Object.assign({ l: 20, c: 0, h: 0 }, options.linkOffsets || {})
  const hoverOffsets = Object.assign({ l: -90, c: 0, h: 0 }, options.hoverOffsets || {})

  const useLightText = baseColor.l < lightnessThreshold

  console.log({ useLightText, lightnessThreshold, baseColorL: baseColor.l })

  const text = clampChroma({
    mode: 'lch',
    l: clamp((useLightText ? 100 - textOffsets.l : 0 + textOffsets.l), 0, 100),
    c: clamp(baseColor.c + textOffsets.c, 0, 150),
    h: adjustHue(baseColor.h + textOffsets.h)
  })

  const link = clampChroma({
    mode: 'lch',
    l: clamp(text.l + (useLightText ? -1 : 1) * linkOffsets.l, 0, 100),
    c: clamp(baseColor.c + linkOffsets.c, 0, 150),
    h: adjustHue(baseColor.h + linkOffsets.h)
  })

  const hover = clampChroma({
    mode: 'lch',
    l: clamp(text.l + (useLightText ? 1 : -1) * hoverOffsets.l, 0, 100),
    c: clamp(link.c + hoverOffsets.c, 0, 150),
    h: adjustHue(link.h + hoverOffsets.h)
  })

  return {
    text: formatHex(text),
    link: formatHex(link),
    hover: formatHex(hover),
  }
}