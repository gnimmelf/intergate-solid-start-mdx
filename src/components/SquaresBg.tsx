import { createEffect, createMemo, JSXElement } from "solid-js";
import { css, cx } from "styled-system/css";
import { linkScope } from "styled-system/recipes";
import { useTheme } from "./ThemeProvider";
import { extractPandaPalette } from "~/utils/extractPandaPalette";

const styles = {
  container: css({
    "& > *": {
      textShadow: '0 0 8px {colors.background.default}'
    },
  }),
  fullWidth: css({
    width: "100%"
  })
};

export function SquaresBg(props: {
  children: JSXElement
  bgColors?: string[];
  squareSize?: number
  useFullWidth?: boolean
}) {
  const theme = useTheme();

  const bgColors = props.bgColors
    ? () => props.bgColors
    : createMemo(() => extractPandaPalette(`colors.${theme.currentTheme()}.ramp`).map(({value}) => value).slice(0, 4))

  let containerRef;

  createEffect(() => {
    const container: HTMLDivElement = containerRef!;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const squareSize = props.squareSize || 10;
    const cols = Math.floor(container.clientWidth / squareSize);
    const rows = Math.floor(container.clientHeight / squareSize);
    const colors = bgColors()!;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        const rectColor =
          x === 0 || x === cols - 1 || y === 0 || y === rows - 1
            ? Math.random() < 0.88
              ? "none"
              : colors[Math.floor(Math.random() * (colors.length - 1))]
            : colors[Math.floor(Math.random() * colors.length)];

        rect.setAttribute("x", String(x * squareSize));
        rect.setAttribute("y", String(y * squareSize));
        rect.setAttribute("width", String(squareSize));
        rect.setAttribute("height", String(squareSize));
        rect.setAttribute("fill", rectColor);
        svg.appendChild(rect);
      }
    }

    const svgString = new XMLSerializer().serializeToString(svg);
    const encodedSVG = `data:image/svg+xml;base64,${btoa(svgString)}`;
    container.style.backgroundImage = `url(${encodedSVG})`;
  });

  return (
    <div class={cx(props.useFullWidth && styles.fullWidth)}>
      <div
        ref={containerRef}
        style={{display: props.useFullWidth ? 'unset' : 'inline-block'}}
        class={cx(linkScope({ area: "surface" }), styles.container)}
      >
        {props.children}
      </div>
    </div>
  );
}
