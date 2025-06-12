// panda.config.ts or similar preset file
import chroma from 'chroma-js';
import { definePreset } from "@pandacss/dev";
import { cardRecipe } from "./recipe-card";
import { linkRecipe, linkScopeRecipe, pageLink } from "./recipe-link-scope";
import { formControlRecipe } from "./recipe-form-control";
import { shineRecipe } from "./recipe-shine";
import { createSchemeColorTokens } from "./utils/scheme-generator";
import { createRangeColors } from "./utils/color-generators";


const basecolor = "#3E9F5E"
const schemeColorTokens = createSchemeColorTokens(basecolor);

const schemeColors = {
  light: {
    ramp: createRangeColors(chroma(basecolor).set('hsl.l', 0.65).hex(), {
      range: 8,
      lightnessRange: 60,
      baseColorPos: "end",
      chromaRange: -50,
    }),
  },
  dark: {
    ramp: createRangeColors(chroma(basecolor).set('hsl.l', 0.2).hex(), {
      range: 8,
      lightnessRange: -60,
      baseColorPos: "start",
      chromaRange: -50,
    }),
  }
};

console.dir({
  // schemeColors,
  schemeColorTokens
}, { depth: null });

export const themeiumPreset = definePreset({
  name: "themeium-preset",
  // Define conditions for light and dark modes
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },

  // Theme configuration
  theme: {
    extend: {
      tokens: {
        colors: schemeColors,
        cursor: {
          click: { value: "pointer" },
          disabled: { value: "not-allowed" },
        },
      },
      // Semantic tokens for UI elements
      semanticTokens: {
        colors: schemeColorTokens
      },
      recipes: {
        link: linkRecipe,
        linkScope: linkScopeRecipe,
        formControl: formControlRecipe,
        shine: shineRecipe,
      },
      slotRecipes: {
        card: cardRecipe,
      },
    },
  },

  // Global CSS to apply the theme
  globalCss: {
    html: {
      fontFamily: "sans-serif",
      color: "text.subtle",
      backgroundColor: "background.tinted",
    },
    body: {
      margin: 0,
      padding: 0,
    },
    h1: {
      fontSize: "4xl", // Maps to preset-panda's fontSizes.4xl
      fontWeight: "bold",
      lineHeight: "1.2",
      marginBottom: "4",
    },
    h2: {
      fontSize: "2xl", // Maps to preset-panda's fontSizes.2xl
      fontWeight: "semibold",
      lineHeight: "1.3",
      marginBottom: "3",
    },
    h3: {
      fontSize: "xl",
      fontWeight: "medium",
      lineHeight: "1.4",
      marginBottom: "2",
    },
    a: pageLink,
  },
});

// Export for use in Panda CSS config
export default themeiumPreset;
