export enum THEMES {
  DARK = 'dark',
  LIGHT = 'light'
}
export const DEFAULT_THEME = THEMES.DARK

export const SITE_TITLE = "Flemming H"
export const PRIMARY_MENU_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Resume",
    href: "/resume",
  },
  {
    label: "Articles",
    href: "/articles",
  },
];
export const BLOB_MENU_PARAMS ={
  baseRadius: 25,
  maxRadius: 400,
  radiusOffset: 12,
  angleOffset: 0.10, // slow spiral
  // Additional padding to prevent overlap
  spacingPadding: 4,
  // Blob area scale factors
  boxScaleFactorX: 110,
  boxScaleFactorY: 110
}
