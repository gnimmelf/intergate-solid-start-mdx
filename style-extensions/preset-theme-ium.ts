// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'
import { colorHarmonies } from 'rampensau'
import { generateColorRamps } from './color-ramp'

const colors = generateColorRamps({
  brand: {
    total: 10,
    hStart: 272.700,
    hStartCenter: 0.000,
    hEasing:
      x => x,
    hCycles: -0.130,

    sRange: [0.172, 0.935],
    sEasing:
      x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    lRange: [0.000, 0.704],
    lEasing:
      x => x,
  },
  accent: {
    total: 4,
    hStart: 68.200,
    hStartCenter: 0.000,
    hEasing:
      x => x,
    hCycles: -0.107,

    sRange: [0.172, 0.935],
    sEasing:
      x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    lRange: [0.000, 1.000],
    lEasing:
      x => x,
  }
})

console.dir({ colors }, { depth: null })

export const themeiumPreset = definePreset({
  name: 'beach-preset',
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
              base: '{colors.brand.900}',
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
                base: '{colors.brand.900}',
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