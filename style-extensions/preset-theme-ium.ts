// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import {
  toLch,
  getContrastingHex,
  createHueShiftPalette,
} from './palett-generators'
import { cardRecipe } from './recipe-card'
import { linkRecipe } from './recipe-link'

/**
 * Goal:
 *   - Start with one base color per surface.
 *
 * - text: contrast to surface bg
 * - link
 * - accent
 *
 */

function createLightPalette() {
  const options = {
    base: '#2F7291',
    surfaceBase: '#78B0CA',
    accent: '#D68DCA',
  }
  const colors = {
    ...createHueShiftPalette(toLch(options.base), {
      range: 4,
      lightnessRange: -30,
    }),
    surface: {
      ...createHueShiftPalette(toLch(options.surfaceBase), {
        range: 4,
        lightnessRange: -30,
      })
    },
    accent: { value: options.accent },
  }

  // Computed
  colors.text = {
    value: getContrastingHex(colors['200'].value)
  }
  colors.link = createHueShiftPalette(toLch(colors.text.value), {
    range: 1,
    baseColorPos: 'center',
    lightnessRange: 10,
  })
  colors.surface.text = {
    value: getContrastingHex(colors.surface['200'].value)
  }
  colors.surface.link = createHueShiftPalette(toLch(colors.surface.text.value), {
    range: 1,
    baseColorPos: 'center',
    lightnessRange: 10,
  })
  return colors
}

function createDarkPalette() {
  const options = {
    base: '#1F4C61',
    surfaceBase: '#456F83',
    accent: '#D68DCA',
  }
  const colors = {
    ...createHueShiftPalette(toLch(options.base), {
      range: 4,
      lightnessRange: 30,
    }),
    surface: {
      ...createHueShiftPalette(toLch(options.surfaceBase), {
        range: 4,
        lightnessRange: 30,
      })
    },
    accent: { value: options.accent },
  }
  // Computed
  colors.text = {
    value: getContrastingHex(colors['200'].value)
  }
  colors.link = createHueShiftPalette(toLch(colors.text.value), {
    range: 1,
    baseColorPos: 'center',
    lightnessRange: 10,
  })
  colors.surface.text = {
    value: getContrastingHex(colors.surface['200'].value)
  }
  colors.surface.link = createHueShiftPalette(toLch(colors.surface.text.value), {
    range: 1,
    baseColorPos: 'center',
    lightnessRange: 10,
  })
  return colors
}

const palettes = {
  light: createLightPalette(),
  dark: createDarkPalette()
}

// console.dir({ palettes }, { depth: null })

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
          foreground: {
            value: {
              base: '{colors.light.text}',
              _dark: '{colors.dark.text}',
            },
          },
          accent: {
            value: {
              base: '{colors.light.accent}',
              _dark: '{colors.dark.accent}',
            },
          },
          surface: {
            background: {
              value: {
                base: '{colors.light.surface.200}',
                _dark: '{colors.dark.surface.200}',
              },
            },
            foreground: {
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
      color: 'foreground',
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
    a: {
      _hover: {
        color: '{'
      }
    }
  },
})

// Export for use in Panda CSS config
export default themeiumPreset