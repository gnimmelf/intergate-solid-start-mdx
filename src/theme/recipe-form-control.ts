import { defineRecipe } from '@pandacss/dev';

export const formControlRecipe = defineRecipe({
  className: 'form-control',
  description: 'Basis styling for formcontrols',
  base: {
    outline: 'none',
    fontSize: '{md}',
    margin: '{2}',
    paddingY: '{2}',
    paddingX: '{3}',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: '{lg}',
    backgroundColor: '{colors.surface.tinted}',
    color: '{colors.text.default}',
    _hover: {
      borderColor: '{colors.surface.hover}',
    },
    _focus: {
      borderColor: '{colors.surface.active}',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
  },
  variants: {
    cursor: {
      pointer: { cursor: 'pointer' },
      text: { cursor: 'text' },
    },
  },
  defaultVariants: {
    cursor: 'pointer',
  },
});
