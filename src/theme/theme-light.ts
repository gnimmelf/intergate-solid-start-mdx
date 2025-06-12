import {
  getContrastingLch,
  toLch,
  formatHex,
} from './utils/color-utils'
import {
  createRangeColors,
  createTextColors
} from './utils/color-generators'


/**
 * LIGHT THEME
 * @returns theme colors
 */
export function createLightPalette() {
  const colors = {
    ...createRangeColors('#F1DA8F', {
      range: 8,
      lightnessRange: -60,
    }),
    surface: {
      ...createRangeColors('#F7E4A5', {
        range: 4,
        lightnessRange: -30,
      })
    },
  }
  colors.accent = { value: '#A8FF9D' }
  colors.border = { value:  formatHex(getContrastingLch(toLch(colors.accent.value))) }

  /**
   * Text and links
   */
  const colorSettings = {
    textValues: toLch('#292C32'),
    linkOffsets: { l: -10, c: 100 },
    hoverOffsets: { l: 10, c: 100 }
  }

  // Page text
  const pageTextColors = createTextColors({
    ...colorSettings
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
    ...colorSettings,
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

  // Menu link
  const menuTextColors = createTextColors({
    textValues: toLch('#003652'),
    hoverOffsets: { l: 20, c: 0 }
  })
  colors.menuLink = {
    value: menuTextColors.link,
    hover: {
      value: menuTextColors.hover
    }
  }

  return colors
}