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
    extend: {
      // Semantic tokens for colors
      tokens: {
        colors: {
          // Core beach-inspired colors
          sand: {
            base: { value: '#d9c2a7' }, // Warm sandy beige
            light: { value: '#f4e1c9' }, // Lighter sand for sunny day
            dark: { value: '#a68c6d' }, // Darker sand for night
          },
          water: {
            base: { value: '#4a90e2' }, // Bright ocean blue
            light: { value: '#6ab0ff' }, // Sparkling water in sunlight
            dark: { value: '#2c5e8c' }, // Deep ocean at night
          },
          sky: {
            base: { value: '#87ceeb' }, // Clear sky blue
            light: { value: '#b3e0ff' }, // Bright daytime sky
            dark: { value: '#1e3a5f' }, // Night sky with moon
          },
          sun: {
            base: { value: '#ffca28' }, // Sunny yellow
          },
          moon: {
            base: { value: '#d8e2eb' }, // Silvery moonlight
          },
          barWood: {
            base: { value: '#8b5e3c' }, // Warm wooden bar tone
          },
          neon: {
            base: { value: '#ff6f61' }, // Beach bar neon accent (coral)
          },
        },
      },

      // Semantic tokens for UI elements
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: '{colors.sand.base}',
              _light: '{colors.sand.light}',
              _dark: '{colors.sky.dark}',
            },
          },
          foreground: {
            value: {
              base: '{colors.water.base}',
              _light: '{colors.water.dark}',
              _dark: '{colors.moon.base}',
            },
          },
          accent: {
            value: {
              base: '{colors.sun.base}',
              _light: '{colors.sun.base}',
              _dark: '{colors.neon.base}',
            },
          },
          text: {
            value: {
              base: '{colors.sky.dark}',
              _light: '{colors.water.dark}',
              _dark: '{colors.sand.light}',
            },
          },
          surface: {
            value: {
              base: '{colors.sand.base}',
              _light: '{colors.sand.light}',
              _dark: '{colors.barWood.base}',
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