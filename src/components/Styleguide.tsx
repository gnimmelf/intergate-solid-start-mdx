import { createMemo, For } from "solid-js";
import { Token, token } from "styled-system/tokens";
import { Dynamic } from "solid-js/web";
import { center, linkOverlay } from "styled-system/patterns";
import { Card } from "./Card";
import { CardContainer } from "./CardContainer";
import { css, cx } from "styled-system/css";
import {
  toLch,
  getContrastingLch,
} from "../../style-extensions/utils/color-utils";
import { Color, formatCss, formatHex, lch, Lch, parse } from "culori";
import { useTheme } from "./ThemeProvider";

function getContrastColor(hex: string) {
  const parsedLch = toLch(hex);
  return getContrastingLch(parsedLch);
}

function formatLCh(hex: string): string {
  const parsedLch = toLch(hex);
  return formatCss({
    l: parseFloat(Number(parsedLch.l).toFixed(2)),
    c: parseFloat(Number(parsedLch.c).toFixed(2)),
    h:
      parsedLch.h == undefined ? 0 : parseFloat(Number(parsedLch.h).toFixed(2)),
    mode: "lch",
  });
}

/**
 * Color tokens are semantic tokens retrived by dot-prop key from `token(dotPropKey)`.
 * This means we have to know the keys forehand, which is impossible unless they
 * follow a well-known pattern. The pattern must be `colors.{palettename}.{50|index*100}.
 * @param props.name palette-name
 * @returns JSX.Element
 */
function ThemePalette(props: { name: string }) {

  const palette = createMemo(() => {
    const colors: Record<string, string>[] = [];
    // Loop until the calculated index exceeds maxValue
    let idx = 0;
    while (true) {
      const cIdx = idx === 0 ? 50 : idx * 100;
      const key = `colors.${props.name}.${cIdx}`;
      const value = token(key as Token);
      if (!value) break;
      colors.push({
        key,
        value,
      });
      idx++;
    }

    // Check for other colors
    ["accent", "text", "link", "link.hover"].forEach((colorName) => {
      const key = `colors.${props.name}.${colorName}`;
      const value = token(key as Token);
      if (value) {
        colors.push({
          key,
          value,
          contrast: formatHex(getContrastColor(value)),
        });
      }
    });

    return colors;
  });

  return (
    <>
      <div
        class={cx(
          css({
            marginTop: "1rem",
          }),
          center()
        )}
      >
        {props.name.toUpperCase()} palette
      </div>

      <For
        each={palette()}
        fallback={<div>Palette "{props.name}" not found!</div>}
      >
        {(color) => {
          const textColorValue =
            color.contrast || token(`colors.${props.name}.text` as Token);

          return (
            <div
              style={{
                background: color.value,
                color: textColorValue,
              }}
              class={css({
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2",
                textAlign: "left",
                w: "full",
                px: "4",
              })}
            >
              <span class={center()}>{color.key.toLowerCase()}</span>
              <span class={center()}>{color.value.toLowerCase()}</span>
              <span class={center()}>
                {formatLCh(color.value).toLowerCase()}
              </span>
            </div>
          );
        }}
      </For>
    </>
  );
}

function Headings(props: { depth: number }) {
  return (
    <For each={Array.from({ length: props.depth }, (_, i) => i + 1)}>
      {(level) => {
        return <Dynamic component={`h${level}`}>H{level}</Dynamic>;
      }}
    </For>
  );
}

export function Styleguide() {
  const theme = useTheme();
  const themeName = createMemo(() => theme.currentTheme());

  return (
    <>
      <p class={center()}>--- Styleguide ---</p>
      <Headings depth={4} />
      How easy can you find the <a href="#">link</a> in this line?
      <CardContainer>
        <Card title="Card title" footer={() => <p>Card Footer</p>}>
          <p>Card content</p>
          <p>
            <a class={linkOverlay()} href="#">
              Card Link
            </a>
          </p>
        </Card>
      </CardContainer>
      <section>
        <ThemePalette name={themeName()} />
        <ThemePalette name={`${themeName()}.surface`} />
      </section>
    </>
  );
}
