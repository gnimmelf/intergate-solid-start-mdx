// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import {
  createScientificPalettes,
  createHueShiftPalette,
  ScientificPaletteType,
  toLch,
} from './palett-generators'
import { cardRecipe } from './recipe-card'

const colors = {
  brand: createHueShiftPalette(toLch('#3A315F'), {
    minLightness: 10,
    maxLightness: 80,
    hueStep: 20
  }),
  surface: createHueShiftPalette(toLch('#753F8F'), {
    minLightness: 10,
    maxLightness: 80,
    hueStep: 20
  }),
  accent: createScientificPalettes(toLch('#E0A45F'), ScientificPaletteType.Complementary)
}

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
        colors,
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
              _dark: '{colors.brand.700}',
            },
          },
          foreground: {
            value: {
              base: '{colors.brand.800}',
              _dark: '{colors.brand.50}',
            },
          },
          accent: {
            value: {
              base: '{colors.accent.50}',
              _dark: '{colors.accent.100}',
            },
          },
          menu: {
            foreground: {
              value: {
                base: '{colors.surface.50}',
                _dark: '{colors.surface.800}',
              },
            },
            background: {
              value: {
                base: '{colors.surface.200}',
                _dark: '{colors.surface.100}',
              },
            },
            hover: {
              value: {
                base: '{colors.surface.500}',
                _dark: '{colors.surface.300}',
              },
            },
          },
          surface: {
            foreground: {
              value: {
                base: '{colors.surface.800}',
                _dark: '{colors.surface.50}',
              },
            },
            background: {
              value: {
                base: '{colors.surface.300}',
                _dark: '{colors.surface.700}',
              },
            },
            border: {
              value: {
                base: '{colors.surface.600}',
              },
            },
          },
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