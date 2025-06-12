import { adjustHue, clamp, createRamp, lerpStepValue, toLch } from './color-utils'

/**
 * Create a range of hues, starting with basColor and adding the range
 * @param baseColor Color-string
 * @param options.range range Number of steps to create palette
 * @param options.lightnessRange lightnessRange +/- value for lightness of final step
 * @param options.hueRange hueRange +/- value for hue of final step
 * @param options.chromaRange chromaRange +/- value for chroma of final step
 * @param options.baseColorPos 'end' reverses the order of palette hues, 'center' adds range hues up and down
 * @returns
 */
export function createRangeColors(baseColor: string, options: {
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

  const baseLch = toLch(baseColor)
  // Add base color
  const palette = [baseLch];

  const maxSteps = range + 1;
  for (let i = 1; i < maxSteps; i++) {
    // Interpolate hueValue
    const hueValue = adjustHue(lerpStepValue(i, maxSteps, baseLch.h, baseLch.h + hueRange));
    // Interpolate lightnessValue
    const lightnessValue = lerpStepValue(i, maxSteps, baseLch.l, clamp(baseLch.l + lightnessRange, 0, 100));
    // Interpolate chromaValue
    const chromaValue = lerpStepValue(i, maxSteps, baseLch.c, clamp(baseLch.c + chromaRange, 0, 150));

    palette[baseColorPos == 'start' ? 'push' : 'unshift']({
      l: lightnessValue,
      h: hueValue,
      c: chromaValue,
    });

    if (baseColorPos === 'center') {
      // Interpolate hueValue
      const hueValue = adjustHue(lerpStepValue(i, maxSteps, baseLch.h, baseLch.h - hueRange));
      // Interpolate lightnessValue
      const lightnessValue = lerpStepValue(i, maxSteps, baseLch.l, clamp(baseLch.l - lightnessRange, 0, 100));
      // Interpolate chromaValue
      const chromaValue = lerpStepValue(i, maxSteps, baseLch.c, clamp(baseLch.c - chromaRange, 0, 150));
      // Since baseColorPos
      palette.push({
        l: lightnessValue,
        h: hueValue,
        c: chromaValue,
      });
    }
  }

  return createRamp(palette);
}
