import { defineRecipe } from '@pandacss/dev';

const linkBase = {
  _focusVisible: {
    outline: "none",
  },
}

export const pageLink = {
  color: '{colors.light.link}',
  _dark: {
    color: '{colors.dark.link}',
  },
  _hover: {
    color: '{colors.light.link.hover}',
    _dark: {
      color: '{colors.dark.link.hover}',
    },
  },
}

const surfaceLink = {
  color: '{colors.light.surface.link}',
  _dark: {
    color: '{colors.dark.surface.link}',
  },
  _hover: {
    color: '{colors.light.surface.link.hover}',
    _dark: {
      color: '{colors.dark.surface.link.hover}',
    },
  },
}

const menuLink = {
  color: '{colors.menu.link}',
  _hover: {
    color: '{colors.light.menuLink.hover}',
    _dark: {
      color: '{colors.dark.menuLink.hover}',
    },
  },
}

/**
 * Link style reciepe, apply directly to links and link-like elements.
 */
export const linkRecipe = defineRecipe({
  className: 'link',
  description: "Link style reciepe, apply directly to links and link-like elements",
  base: linkBase,
  variants: {
    cursor: {
      click: { cursor: 'pointer' },
      disabled: { cursor: 'not-allowed' },
    },
    area: {
      page: pageLink,
      surface: surfaceLink,
      menu: menuLink
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
  description: "Same as `recipe-link`, but applies styles to all child `a` elements",
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
      menu: { '& a': menuLink },
    }
  },
  defaultVariants: {
    cursor: 'click',
    area: 'surface'
  },
});