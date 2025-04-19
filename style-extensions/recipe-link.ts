import { defineRecipe } from '@pandacss/dev';

export const linkRecipe = defineRecipe({
  className: 'link',
  base: {
    color: '{colors.light.100}',
    _dark: {
      color: '{colors.dark.100}',
    },
    _hover: {
      color: '{colors.light.50}',
      _dark: {
        color: '{colors.dark.50}',
      },
    },
    _focusVisible: {
      outline: "none",
    },
  },
  variants: {
    cursor: {
      click: { cursor: 'pointer' },
      disabled: { cursor: 'not-allowed' },
    },
  },
  defaultVariants: {
    cursor: 'click',
  },
});