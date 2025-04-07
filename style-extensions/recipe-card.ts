import { defineSlotRecipe } from '@pandacss/dev'

export const cardRecipe = defineSlotRecipe({
  className: 'card',
  description: 'A semantic card component with header, content, and footer',
  slots: ['root', 'header', 'content', 'footer'], // Define the slots
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '{colors.surface.background}',
      color: '{colors.surface.foreground}',
      borderRadius: 'md',
      boxShadow: '{shadows.xl}',
      overflow: 'hidden',
      maxWidth: 'sm',
    },
    header: {
      padding: '4',
      fontWeight: 'bold',
      borderBottom: '1px solid {colors.surface.border}',
    },
    content: {
      padding: '4',
      color: 'text',
      flex: '1',
    },
    footer: {
      borderTop: '1px solid {colors.surface.border}',
      padding: '4',
      fontSize: 'sm',
    },
  },
})