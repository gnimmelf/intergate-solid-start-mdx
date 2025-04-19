import { For } from "solid-js";
import { Token, token } from "styled-system/tokens";
import { Dynamic } from "solid-js/web";
import { center } from "styled-system/patterns";
import { Card } from "./Card";
import { CardContainer } from "./CardContainer";
import { css, cx } from "styled-system/css";
import {
  toLch,
  getContrastingLCH,
  ensureLchMode,
} from "~/../style-extensions/palett-generators";
import { formatHex } from "culori";

function getContrastColor(hex: string) {
  const parsedLch = toLch(hex);
  return getContrastingLCH(parsedLch);
}

/**
 * Color tokens are semantic topens retrived by dot-prop key from `token(dotPropKey)`.
 * This means we have to know the keys forehand, which is impossible unless they
 * follow a well-known pattern. The pattern must be `colors.{palettename}.{50|index*100}.
 * @param props.name palette-name
 * @returns
 */
function ColorPalette(props: { name: string }) {
  const textColorKey = `colors.${props.name}.text`;
  const colors: any[] = [];

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
  ["text", "accent"].forEach((colorName) => {
    const key = `colors.${props.name}.${colorName}`;
    const value = token(key as Token);
    if (value) {
      colors.push({
        key,
        value,
      });
    }
  });

  console.log({ colors })

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
        each={colors}
        fallback={<div>Palette "{props.name}" not found!</div>}
      >
        {(color) => {
          const textColorValue = formatHex(ensureLchMode(getContrastColor(color.value)))

          return (
            <div
              style={{
                background: color.value,
                color: textColorValue,
              }}
              class={css({
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "2",
                textAlign: "left",
                w: "full",
                px: "4",
              })}
            >
              <span class={center()}>{color.key.toLowerCase()}</span>
              <span class={center()}>{color.value.toLowerCase()}</span>
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
  return (
    <>
      <p class={center()}>--- Styleguide ---</p>
      <Headings depth={4} />
      <a href="#">Link</a>
      <CardContainer>
        <Card title="Card title">
          <p>Card content</p>
        </Card>
      </CardContainer>
      <For each={["light", "dark"]}>
        {(paletteName) => (
          <>
            <ColorPalette name={paletteName} />
            <ColorPalette name={`${paletteName}.link`} />
            <ColorPalette name={`${paletteName}.surface`} />
          </>
        )}
      </For>
    </>
  );
}
