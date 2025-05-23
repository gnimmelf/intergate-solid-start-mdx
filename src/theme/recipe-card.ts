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
      color: '{colors.surface.text}',
      borderRadius: 'lg',
      boxShadow: '{shadows.2xl}',
      overflow: 'hidden',
      border: "1px solid {colors.surface.text}",
      _hover: {
        // TODO! S.th cool!
      },
    },
    header: {
      padding: '4',
      fontWeight: 'bold',
    },
    content: {
      borderTop: '1px solid {colors.surface.text}',
      padding: '4',
      color: 'text',
      flex: '1',
    },
    footer: {
      borderTop: '1px solid {colors.surface.text}',
      padding: '4',
      fontSize: 'sm',
    },
  },
})