// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import {
  createScientificPalettes,
  ScientificPaletteType,
  createHueShiftPalette,
  toLch,
} from './palett-generators'
import { cardRecipe } from './recipe-card'

const palettes = {
  brand: createHueShiftPalette(toLch('#315F4C'), {
    range: 4,
    maxLightness: 80,
    minLightness: 15,
    maxHue: 80,
    minHue: 20,
  }),
  surface: createHueShiftPalette(toLch('#5b969b'), {
    range: 4,
    maxLightness: 100,
    minLightness: 20,
    maxHue: 80,
    minHue: 60,
  }),
}

// console.dir({palettes}, { depth: null })

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
              base: '{colors.brand.100}',
              _dark: '{colors.brand.500}',
            },
          },
          foreground: {
            value: {
              base: '{colors.brand.500}',
              _dark: '{colors.brand.100}',
            },
          },
          accent: {
            value: {
              base: '{colors.brand.800}',
              _dark: '{colors.brand.50}',
            },
          },
          surface: {
            background: {
              value: {
                base: '{colors.surface.100}',
                _dark: '{colors.surface.500}',
              },
            },
            foreground: {
              value: {
                base: '{colors.surface.500}',
                _dark: '{colors.surface.100}',
              },
            },
            accent: {
              value: {
                base: '{colors.surface.600}',
                _dark: '{colors.surface.50}',
              },
            },
          }
        },
      },
      slotRecipes: {
        card: cardRecipe
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
  },
})

// Export for use in Panda CSS config
export default themeiumPreset