import { generateColorRamp as generate, colorToCSS, GenerateColorRampArgument, GenerateColorRampArgumentFixedHues } from 'rampensau';

/**
 * See:
 *   https://southcla.ws/colour-ramps-with-panda-css/
 *   https://meodai.github.io/rampensau/
 */

type Options = GenerateColorRampArgument | GenerateColorRampArgumentFixedHues | undefined;

export function generateColorRamps(ramps: Record<string, Options>) {
  const generated = {}
  for (const key in ramps) {
    // Generate hues
    const colors = generate(ramps[key])
    // Index hues
    const entries = colors.reverse().map((color, idx) => {
      const index = idx === 0 ? "50" : idx * 100;
      return [
        `${index}`,
        {
          value: colorToCSS(color, "lch"),
        },
      ];
    });
    generated[key] = Object.fromEntries(entries);
  }

  return generated
}
