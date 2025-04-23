import {
  toLch,
} from './utils/color-utils'
import {
  createRangePalette,
  createTextColors
} from './utils/palett-generators'


/**
 * LIGHT THEME
 * @returns theme colors
 */
export function createLightPalette() {
  const options = {
    base: '#FFFEB5',
    surfaceBase: '#D3D48C',
    accent: '#EE8CDE',
  }
  const colors = {
    ...createRangePalette(toLch(options.base), {
      range: 4,
      lightnessRange: -30,
    }),
    surface: {
      ...createRangePalette(toLch(options.surfaceBase), {
        range: 4,
        lightnessRange: -30,
      })
    },
    accent: { value: options.accent },
  }

  // Page text
  const pageTextColors = createTextColors(toLch(colors['200'].value))
  colors.text = {
    value: pageTextColors.text
  }
  colors.link = {
    value: pageTextColors.link,
    hover: {
      value: pageTextColors.hover
    }
  }

  // Surface text
  const surfaceTextColors = createTextColors(toLch(colors.surface['200'].value))
  colors.surface.text = {
    value: surfaceTextColors.text
  }
  colors.surface.link = {
    value: surfaceTextColors.link,
    hover: {
      value: surfaceTextColors.hover
    }
  }

  return colors
}