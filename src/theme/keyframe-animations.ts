import { defineAnimationStyles, defineKeyframes } from '@pandacss/dev'

export const keyframes = defineKeyframes({
  shine: {
    "0%": { backgroundPosition: "100% 100%" }, // Bottom-right (start)
    "50%": { backgroundPosition: "0% 0%" }, // Top-left (max shine)
    "100%": { backgroundPosition: "100% 100%" }, // Stay at max
  },
  shineReverse: {
    "0%": { backgroundPosition: "0% 0%" }, // Top-left (max shine)
    "100%": { backgroundPosition: "100% 100%" }, // Back to bottom-right
  },
})

export const animationStyles = defineAnimationStyles({
  shine: {
    value: {
      animation: "shine 500ms ease-in-out forwards", // Roll to max on hover
    },
  },
  shineReverse: {
    value: {
      animation: "shineReverse 500ms ease-in-out forwards", // Reverse when hover ends
    },
  },
})