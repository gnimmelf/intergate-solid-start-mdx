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
  const colors = {
    ...createRangePalette('#8FCEF1', {
      range: 8,
      lightnessRange: -60,
    }),
    surface: {
      ...createRangePalette('#A0C8EE', {
        range: 4,
        lightnessRange: -30,
      })
    },
    accent: { value: '#db35f8' },
  }

  /**
   * Text and links
   */
  const colorSettings = {
    textValues: toLch('lch(18 4 260)'),
    linkOffsets: { c: 100 },
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
    textValues: toLch('lch(40.07 34.6 267.61)'),
    hoverOffsets: { l: 10, c: 0 },
  })
  colors.menuLink = {
    value: menuTextColors.link,
    hover: {
      value: menuTextColors.hover
    }
  }

  return colors
}