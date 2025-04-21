import { defineRecipe } from '@pandacss/dev';

const linkBase = {
  _focusVisible: {
    outline: "none",
  },
}

export const pageLink = {
  color: '{colors.light.link.50}',
  _dark: {
    color: '{colors.dark.link.50}',
  },
  _hover: {
    color: '{colors.light.link.100}',
    _dark: {
      color: '{colors.dark.link.100}',
    },
  },
}

const surfaceLink = {
  color: '{colors.light.surface.link.50}',
  _dark: {
    color: '{colors.dark.surface.link.50}',
  },
  _hover: {
    color: '{colors.light.surface.link.100}',
    _dark: {
      color: '{colors.dark.surface.link.100}',
    },
  },
}

/**
 * Link style reciepe, apply directly to links and link-like elements.
 */
export const linkRecipe = defineRecipe({
  className: 'link',
  base: linkBase,
  variants: {
    cursor: {
      click: { cursor: 'pointer' },
      disabled: { cursor: 'not-allowed' },
    },
    area: {
      page: pageLink,
      surface: surfaceLink,
    }
  },
  defaultVariants: {
    cursor: 'click',
    area: 'surface'
  },
});

/**
 * Same as `link`, but applies styles to all child `a` elements
 */
export const linkScopeRecipe = defineRecipe({
  className: 'link-scope',
  base: {
    '& a': linkBase
  },
  variants: {
    cursor: {
      click: { '& a': { cursor: 'pointer' } },
      disabled: { '& a': { cursor: 'not-allowed' } },
    },
    area: {
      page: { '& a': pageLink },
      surface: { '& a': surfaceLink },
    }
  },
  defaultVariants: {
    cursor: 'click',
    area: 'surface'
  },
});