import { defineRecipe } from '@pandacss/dev';


export const linkBase = {
  color: '{colors.light.link.50}',
  _dark: {
    color: '{colors.dark.link.50}',
  },
  _hover: {
    color: '{colors.light.link.200}',
    _dark: {
      color: '{colors.dark.link.200}',
    },
  },
  _focusVisible: {
    outline: "none",
  },
}

export const linkRecipe = defineRecipe({
  className: 'link',
  base: linkBase,
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