import { For } from "solid-js";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { box } from "styled-system/patterns";
import { Token, token } from "styled-system/tokens";

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

  colors.forEach((color, idx) => {
    color.contrast = colors[colors.length - 1 - idx].color;
  });

  return (
    <For each={colors} fallback={(<div>Palette {props.name} not found!</div>)}>
      {(hue, idx) => (
        <div style={{ background: hue.color, color: hue.contrast }}>
          {hue.key}
        </div>
      )}
    </For>
  );
}

export function Styleguide() {
  return (
    <>
      <h1>H1</h1>

      <h1>H2</h1>

      <h1>H3</h1>

      <ColorPalette name="brand" />
      <ColorPalette name="accent" />
    </>
  );
}
