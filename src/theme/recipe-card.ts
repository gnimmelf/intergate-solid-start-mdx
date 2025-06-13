import { defineSlotRecipe } from '@pandacss/dev'

export const cardRecipe = defineSlotRecipe({
  className: 'card',
  description: 'A semantic card component with header, content, and footer',
  slots: ['root', 'header', 'content', 'footer'], // Define the slots
  base: {
    root: {
      position: "relative", // Important when using `linkOverlay` in children
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '{colors.surface.tinted}',
      borderRadius: 'lg',
      boxShadow: '{shadows.2xl}',
      overflow: 'hidden',
      border: "1px solid {colors.border.default}",
    },
    header: {
      padding: '4',
      fontWeight: 'bold',
      color: '{colors.text.default}'
    },
    content: {
      borderTop: '1px solid {colors.border.subtle}',
      padding: '4',
      flex: '1',
    },
    footer: {
      borderTop: '1px solid {colors.border.subtle}',
      padding: '4',
      fontSize: 'sm',
    },
  },
  variants: {
    centerContent: {
      true: {
        root: { textAlign: 'center' },
      },
    },
  },
  defaultVariants: {
    centerContent: false, // Set default value
  },
})