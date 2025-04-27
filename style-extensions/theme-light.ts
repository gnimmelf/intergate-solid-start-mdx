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
    base: '#8FCEF1',
    surfaceBase: '#A0C8EE',
    accent: '#EE8CDE',
    isDarkTheme: false
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
    isDarkTheme
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
    isDarkTheme
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