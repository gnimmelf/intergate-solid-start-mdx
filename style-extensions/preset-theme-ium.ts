// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import { createScientificPalettes, createHueShiftPalette, toLch } from './palett-generators'

const colors = {
  brand: createHueShiftPalette(toLch('#f16c9b'), {
    minLightness: 10,
    maxLightness: 80,
    hueStep: 5
   }),
   accent: createScientificPalettes(toLch('#FFD102'), 'tetradic')
}

console.log()

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
      },
      // Semantic tokens for UI elements
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: '{colors.brand.50}',
              _dark: '{colors.brand.800}',
            },
          },
          foreground: {
            value: {
              base: '{colors.brand.800}',
              _dark: '{colors.brand.100}',
            },
          },
          accent: {
            value: {
              base: '{colors.accent.100}',
              _dark: '{colors.accent.200}',
            },
          },
          text: {
            value: {
              base: '{colors.brand.700}',
              _dark: '{colors.brand.200}',
            },
          },
          surface: {
            foreground: {
              value: {
                base: '{colors.brand.800}',
                _dark: '{colors.brand.200}',
              },
            },
            background: {
              value: {
                base: '{colors.brand.300}',
                _dark: '{colors.brand.700}',
              },
            },
            border: {
              value: {
                base: '{colors.brand.600}',
                _dark: '{colors.brand.600}',
              },
            },
          },
        },
      },
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
  },
})

// Export for use in Panda CSS config
export default themeiumPreset