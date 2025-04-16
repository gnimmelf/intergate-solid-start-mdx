import { For } from "solid-js";
import { Token, token } from "styled-system/tokens";
import { Dynamic } from "solid-js/web";
import { center, flex } from "styled-system/patterns";
import { Card } from "./Card";
import { CardContainer } from "./CardContainer";

/**
 * Color tokens are semantic topens retrived by dot-prop key from `token(dotPropKey)`.
 * This means we have to know the keys forehand, which is impossible unless they
 * follow a well-known pattern. The pattern must be `colors.{palettename}.{50|index*100}.
 * @param props.name palette-name
 * @returns
 */
function ColorPalette(props: { name: string }) {
  const colors: any[] = [];
  let idx = 0;

  // Loop until the calculated index exceeds maxValue
  while (true) {
    const cIdx = idx === 0 ? 50 : idx * 100;
    const key = `colors.${props.name}.${cIdx}`;
    const color = token(key as Token);
    if (!color) break;
    colors.push({
      key,
      color,
    });
    idx++;
  }

  // Add contrast color for foreground
  colors.forEach((color, idx) => {
    color.contrast = colors[colors.length - 1 - idx].color;
  });

  return (
    <For each={colors} fallback={<div>Palette {props.name} not found!</div>}>
      {(hue, idx) => (
        <div
          style={{
            background: hue.color,
            color: hue.contrast == hue.color ? colors[0].color : hue.contrast,
          }}
          class={flex({ justify: "space-around" })}
        >
          <span>{hue.key}</span>
          <span>{hue.color}</span>
        </div>
      )}
    </For>
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
      <CardContainer>
        <Card title="Card title">
          <p>Card content</p>
        </Card>
      </CardContainer>
      <ColorPalette name="brand" />
      <ColorPalette name="menu" />
      {/* <ColorPalette name="surface" />
      <ColorPalette name="accent" /> */}
    </>
  );
}
