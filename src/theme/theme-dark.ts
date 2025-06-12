import {
  getContrastingLch,
  toLch,
  formatHex,
} from "./utils/color-utils";
import {
  createRangeColors,
  createTextColors,
} from "./utils/color-generators";

/**
 * DARK THEME
 * @returns theme colors
 */
export function createDarkPalette() {
  const colors = {
    ...createRangeColors("#09121F", {
      range: 8,
      lightnessRange: 30,
      baseColorPos: "start",
    }),
    surface: {
      ...createRangeColors("#57606D", {
        range: 4,
        lightnessRange: -30,
        baseColorPos: "start",
      }),
    },
  };
  colors.accent = { value: "#A8FF9D" };
  colors.border = {
    value: formatHex(getContrastingLch(toLch(colors.accent.value))),
  };

  /**
   * Text and links
   */

  const colorSettings = {
    textValues: toLch("lch(72.45 8.09 258.29)"),
    linkOffsets: { c: 100 },
    hoverOffsets: { l: 20, c: 70 },
  };

  // Page text
  const pageTextColors = createTextColors({
    ...colorSettings,
  });
  colors.text = {
    value: pageTextColors.text,
  };
  colors.link = {
    value: pageTextColors.link,
    hover: {
      value: pageTextColors.hover,
    },
  };

  // Surface text
  const surfaceTextColors = createTextColors({
    ...colorSettings,
  });
  colors.surface.text = {
    value: surfaceTextColors.text,
  };
  colors.surface.link = {
    value: surfaceTextColors.link,
    hover: {
      value: surfaceTextColors.hover,
    },
  };

  // Menu link
  const menuTextColors = createTextColors({
    textValues: colorSettings.textValues,
    hoverOffsets: { l: 20, c: 0 },
  });
  colors.menuLink = {
    value: menuTextColors.link,
    hover: {
      value: menuTextColors.hover,
    },
  };

  return colors;
}
