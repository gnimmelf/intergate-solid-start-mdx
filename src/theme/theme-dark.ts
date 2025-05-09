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
  const colors = {
    ...createRangePalette('#09121F', {
      range: 8,
      lightnessRange: 30,
      baseColorPos: 'start'
    }),
    surface: {
      ...createRangePalette('#57606D', {
        range: 4,
        lightnessRange: -30,
        baseColorPos: 'start'
      })
    },
    accent: { value: 'lch(92.77 56.05 137.02)' },
  }

  /**
   * Text and links
   */

  const colorSettings = {
    textValues: toLch('lch(72.45 8.09 258.29)'),
    linkOffsets: { c: 100 },
    hoverOffsets: { l: 10, c: 100 }
  }

  // Page text
  const pageTextColors = createTextColors({
    ...colorSettings,
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
    textValues: toLch('lch(51 26.73 221.56)'),
    hoverOffsets: { l: 20, c: 0 },
  })
  colors.menuLink = {
    value: menuTextColors.link,
    hover: {
      value: menuTextColors.hover
    }
  }

  return colors
}