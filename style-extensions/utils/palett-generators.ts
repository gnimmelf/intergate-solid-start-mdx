/**
 * See:
 *  https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/
 */

import { clampChroma } from 'culori'
import { adjustHue, clamp, createRamp, defaultFormatFn, ensureLchMode, lerpStepValue } from './color-utils'

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
 * Calculate text, link and hover colors based on the given backgroundColor.
 * @param bgColor { l,h,c }
 * @param options.lightnessThreshold The bg lightness threshold to determine if bg is light or dark
 * @param options.textOffsets { l,h,c } offsets relative to backgroundColor
 * @param options.linkOffsets { l,h,c } offsets relative to calcucalted textColor
 * @param options.hoverOffsets { l,h,c } offsets relative to calcucalted linkColor
 * @returns
*/
export function createTextColors(bgColor: LCh, options: {
  lightnessThreshold?: number
  textOffsets?: Partial<LCh>
  linkOffsets?: Partial<LCh>
  hoverOffsets?: Partial<LCh>
} = {}) {

  const { lightnessThreshold } = Object.assign({
    lightnessThreshold: 60,
  }, options);

  const bgIsDark = bgColor.l < lightnessThreshold;

  // Defaults
  const textOffsets = Object.assign({
    l: bgIsDark ? 60 : -60,  // Much lighter text on dark, darker on light
    c: -bgColor.c,           // Pull toward neutral gray
    h: 0
  }, options.textOffsets || {});

  const linkOffsets = Object.assign({
    l: bgIsDark ? -10 : 12,  // Slight difference from text
    c: 50,                   // More chroma than text for standout
    h: 220                   // Blue-ish hue (typical link)
  }, options.linkOffsets || {});

  const hoverOffsets = Object.assign({
    l: bgIsDark ? -5 : 20,    // Subtle hover lightness change
    c: 10,                   // More saturation on hover
    h: 20                    // Small hue shift for variation
  }, options.hoverOffsets || {});

  const textColor = clampChroma({
    mode: 'lch',
    l: clamp(bgColor.l + textOffsets.l, 0, 100),
    c: clamp(bgColor.c + textOffsets.c, 0, 150),
    h: adjustHue(bgColor.h + textOffsets.h)
  });

  const linkColor = clampChroma({
    mode: 'lch',
    l: clamp(textColor.l + linkOffsets.l, 0, 100),
    c: clamp(textColor.c + linkOffsets.c, 0, 150),
    h: adjustHue(textColor.h + linkOffsets.h)
  });

  const hoverColor = clampChroma({
    mode: 'lch',
    l: clamp(linkColor.l + hoverOffsets.l, 0, 100),
    c: clamp(linkColor.c + hoverOffsets.c, 0, 150),
    h: adjustHue(linkColor.h + hoverOffsets.h)
  });

  return {
    text: defaultFormatFn(textColor),
    link: defaultFormatFn(linkColor),
    hover: defaultFormatFn(hoverColor),
  }
}