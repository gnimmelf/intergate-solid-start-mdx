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
      backgroundColor: '{colors.surface.background}',
      color: '{colors.surface.foreground}',
      borderRadius: 'lg',
      boxShadow: '{shadows.2xl}',
      overflow: 'hidden',
      border: "1px solid {colors.surface.background}",
      _hover: {
        borderColor: "{colors.surface.accent}",
      },
    },
    header: {
      padding: '4',
      fontWeight: 'bold',
      borderBottom: '1px solid {colors.surface.accent}',
    },
    content: {
      padding: '4',
      color: 'text',
      flex: '1',
    },
    footer: {
      borderTop: '1px solid {colors.surface.accent}',
      padding: '4',
      fontSize: 'sm',
    },
  },
})