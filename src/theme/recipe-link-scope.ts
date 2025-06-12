import { defineRecipe } from '@pandacss/dev';

const linkBase = {
  _focusVisible: {
    outline: "none",
  },
}

export const pageLink = {
  textDecoration: 'underline',
  color: '{colors.text.tinted}',
  _hover: {
    color: '{colors.text.default}',
  },
}

const surfaceLink = {
  ...pageLink
}

const menuLink = {
  ...pageLink,
  textDecoration: 'none',
  color: '{colors.text.subtle}',
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