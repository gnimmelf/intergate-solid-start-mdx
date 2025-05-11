import { css, cva } from "styled-system/css";
import { styled } from "styled-system/jsx";
import { formControl, shine } from "styled-system/recipes";

const FormControlButton = styled("button", formControl, {
  defaultProps: { cursor: "pointer" },
});

export const Button = styled(FormControlButton, shine);
