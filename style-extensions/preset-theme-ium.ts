// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import {
  toLch,
  createHueShiftPalette,
  createHueRangePalette,
} from './palett-generators'
import { cardRecipe } from './recipe-card'
import { linkRecipe } from './recipe-link'

const palettes = {
  light: {
    text: { value: '#363636' },
    link: createHueRangePalette(toLch('#022419'), {
      range: 1,
      lightnessRange: 30,
    }),
    accent: { value: '#EC1480' },
    ...createHueRangePalette(toLch('#AAEED2'), {
      range: 4,
      lightnessRange: -30,
    }),
    surface: {
      text: { value: '#363636' },
      ...createHueRangePalette(toLch('#79DB81'), {
        range: 4,
        lightnessRange: 30,
      })
    },

  },
  dark: {
    text: { value: '#D4D4D4' },
    link: createHueRangePalette(toLch('rgb(211 147 181)'), {
      range: 1,
      lightnessRange: 30,
    }),
    accent: { value: '#EC1480' },
    ...createHueRangePalette(toLch('#35574A'), {
      range: 4,
      lightnessRange: -30,
    }),
    surface: {
      text: { value: '#D4D4D4' },
      ...createHueRangePalette(toLch('#7c1b4b'), {
        range: 4,
        lightnessRange: 40,
      })
    },
  }
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
              base: '{colors.light.300}',
              _dark: '{colors.dark.300}',
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
                base: '{colors.light.surface.300}',
                _dark: '{colors.dark.surface.300}',
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