// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import {
  toLch,
  getContrastingColor
} from './color-utils'
import {
  createRangePalette,
  createTextColors
} from './palett-generators'
import { cardRecipe } from './recipe-card'
import { linkRecipe, linkScopeRecipe, pageLink } from './recipe-link-scope'

/**
 * Goal:
 *  - Start with one base color per surface.
 *
 *  - accent: Selected color
 *
 *  - background: Middle value from a hueshiftpalette of 5 colors
 *
 *  TODO!
 *  - text: contrast to background bg by almost maxing out lightness contrast
 *    - Max lightness for dark background
 *    - Min lighness for light background
 *    - Keep hue & chroma
 *
 *  - link: contrast to text color
 *    - Darken a bit for base color
 *    - 1/2 of darken for hover-color
 */

/**
 * LIGHT THEME
 * @returns theme colors
 */
function createLightPalette() {
  const options = {
    base: '#C3F1AC',
    surfaceBase: '#78CA86',
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
  const pageTextColors = createTextColors(toLch(colors['200'].value), {
    textOffsets: { c: -40 },
    hoverOffsets: { l: -93 }
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
  const surfaceTextColors = createTextColors(toLch(colors.surface['200'].value),{
    linkOffsets: { l: -70 },
    hoverOffsets: { l: -100 }
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

const palettes = {
  light: createLightPalette(),
  dark: createLightPalette()
}

console.dir({ lightTheme: palettes.light }, { depth: null })

export const themeiumPreset = definePreset({
  name: 'themeium-preset',
  // Define conditions for light and dark modes
  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
  },

  // Theme configuration
  theme: {
    extend: {
      tokens: {
        colors: palettes,
        cursor: {
          click: { value: 'pointer' },
          disabled: { value: 'not-allowed' },
        }
      },
      // Semantic tokens for UI elements
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: '{colors.light.200}',
              _dark: '{colors.dark.200}',
            },
          },
          accent: {
            value: {
              base: '{colors.light.accent}',
              _dark: '{colors.dark.accent}',
            },
          },
          text: {
            value: {
              base: '{colors.light.text}',
              _dark: '{colors.dark.text}',
            },
          },
          surface: {
            background: {
              value: {
                base: '{colors.light.surface.200}',
                _dark: '{colors.dark.surface.200}',
              },
            },
            text: {
              value: {
                base: '{colors.light.surface.text}',
                _dark: '{colors.dark.surface.text}',
              },
            },
          }
        },
      },
      recipes: {
        link: linkRecipe,
        linkScope: linkScopeRecipe,
      },
      slotRecipes: {
        card: cardRecipe,
      }
    },
  },

  // Global CSS to apply the theme
  globalCss: {
    html: {
      fontFamily: 'sans-serif',
      color: 'text',
      backgroundColor: 'background',
    },
    body: {
      margin: 0,
      padding: 0,
    },
    h1: {
      fontSize: '4xl', // Maps to preset-panda's fontSizes.4xl
      fontWeight: 'bold',
      lineHeight: '1.2',
      marginBottom: '4',
    },
    h2: {
      fontSize: '2xl', // Maps to preset-panda's fontSizes.2xl
      fontWeight: 'semibold',
      lineHeight: '1.3',
      marginBottom: '3',
    },
    h3: {
      fontSize: 'xl',
      fontWeight: 'medium',
      lineHeight: '1.4',
      marginBottom: '2',
    },
    a: pageLink
  },
})

// Export for use in Panda CSS config
export default themeiumPreset