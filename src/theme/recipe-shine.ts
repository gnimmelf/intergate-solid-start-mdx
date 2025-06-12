import { defineRecipe } from "@pandacss/dev";

export const shineRecipe = defineRecipe({
  className: "shine",
  description: "Shine effect with 45-degree wave passing through on hover",
  base: {
    "--color1": "transparent",
    "--color2": "{colors.base.hover}",
    backgroundImage: "linear-gradient(125deg, var(--color1) 25%, var(--color2) 50%, var(--color1) 75%)",
    backgroundRepeat: 'no-repeat',
    backgroundSize: "300% 100%", // Larger size for wave effect
    backgroundPosition: "150% 0%", // Start outside the element
    _hover: {
      transition: "background-position 700ms",
      backgroundPosition: "-50% 0%", // Move to opposite side, outside the element
    },
  },
});