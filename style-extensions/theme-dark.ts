import {
  toLch,
} from './utils/color-utils'
import {
  createRangePalette,
  createTextColors
} from './utils/palett-generators'

/**
 * DARK THEME
 * @returns theme colors
 */
export function createDarkPalette() {
  const options = {
    base: '#2D3B7E',
    surfaceBase: '#43618A',
    accent: 'lch(71.04 53.06 345)',
    isDarkTheme: true
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

  const { isDarkTheme } = options

  // Page text
  const pageTextColors = createTextColors({
    isDarkTheme,
  })
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
  const surfaceTextColors = createTextColors({
    isDarkTheme,
  })
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