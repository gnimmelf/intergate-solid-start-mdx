import { setProperty } from 'dot-prop';
import type { CssColor, ThemeInfo, ColorMetadata } from '@digdir/designsystemet/color';
import { colorMetadata, generateColorScale } from '@digdir/designsystemet/color'

/**
 * Utilize Designsystemet.no to create colors scheme colors.
 * Generates scheme color tokens based on a base color.
 *
 * @param color The base color that is used to generate the color scale
 * @returns
 */
export function createSchemeColorTokens(color: CssColor) {
  const schemes: Pick<ThemeInfo, 'light' | 'dark' > = {
    light: generateColorScale(color, 'light'),
    dark: generateColorScale(color, 'dark'),
  }
  const colorTokens = Object.values(colorMetadata).reduce((acc, meta: ColorMetadata) => {
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
