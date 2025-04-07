// panda.config.ts or similar preset file
import { definePreset } from '@pandacss/dev'

export const beachThemePreset = definePreset({
  name: 'beach-preset',
  // Define conditions for light and dark modes
  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
  },

  // Theme configuration
  theme: {
    // Semantic tokens for UI elements
    semanticTokens: {
      colors: {
        background: {
          value: {
            base: '{colors.slate.200}',
            _dark: '{colors.slate.700}',
          },
        },
        foreground: {
          value: {
            base: '{colors.teal.950}',
            _dark: '{colors.teal.100}',
          },
        },
        accent: {
          value: {
            base: '{colors.lime.600}',
            _dark: '{colors.lime.200}',
          },
        },
        text: {
          value: {
            base: '{colors.slate.700}',
            _dark: '{colors.slate.200}',
          },
        },
        surface: {
          foreground: {
            value: {
              base: '{colors.gray.900}',
              _dark: '{colors.blue.200}',
            },
          },
          background: {
            value: {
              base: '{colors.zinc.300}',
              _dark: '{colors.zinc.700}',
            },
          },
          border: {
            value: {
              base: '{colors.slate.600}',
              _dark: '{colors.slate.600}',
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
export default beachThemePreset