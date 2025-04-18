import { defineRecipe } from '@pandacss/dev';

export const linkRecipe = defineRecipe({
  className: 'link',
  base: {
    color: '{colors.brand.200}',
    _dark: {
      color: '{colors.brand.100}',
    },
    _hover: {
      color: '{colors.accent}',
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