// panda.config.ts or similar preset file
import chroma from 'chroma-js';
import { definePreset, defineTextStyles } from "@pandacss/dev";
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

const textStyles = defineTextStyles({
  intro: {
    description: 'The intro text - used on frontmatter-intro prop',
    value: {
      fontFamily: 'Inter',
      fontWeight: '500',
      fontSize: '16px',
      fontStyle: 'italic',
      lineHeight: '24px',
      letterSpacing: '0',
      textDecoration: 'None',
      textTransform: 'None'
    }
  }
})

export const themeiumPreset = definePreset({
  name: "themeium-preset",
  // Define conditions for light and dark modes
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },

  // Theme configuration
  theme: {
    textStyles,
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

  // Theme Global Styles
  globalCss: {
    ':root': {
      fontSize: '16px', // NOTE! Basis for all fontsizes
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    html: {
      color: "text.subtle",
      backgroundColor: "background.tinted",
    },
    body: {
      margin: 0,
      padding: 0,
      fontSize: {
        base: "{fontSizes.lg}",
        mdToXl: "{fontSizes.md}",
      },
    },
    h1: {
      fontSize: {
        base: "{fontSizes.2xl}",
        mdToXl: "{fontSizes.3xl}",
      },
      fontWeight: "bold",
      lineHeight: "1.2",
      marginBottom: "4",
    },
    h2: {
      fontSize: {
        base: "{fontSizes.xl}",
        mdToXl: "{fontSizes.2xl}",
      },
      fontWeight: "semibold",
      lineHeight: "1.3",
      marginBottom: "3",
    },
    h3: {
      fontSize: {
        base: "{fontSizes.lg}",
        mdToXl: "{fontSizes.xl}",
      },
      fontWeight: "medium",
      lineHeight: "1.4",
      marginBottom: "2",
    },
    a: pageLink,
    p: {
      marginY: '{2}',
      overflow: 'auto',
      minWidth: '{xs}'
    },
    'h1, h2, h3, h4': {
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      hyphens: 'auto',
    }
  },
});

// Export for use in Panda CSS config
export default themeiumPreset;
