import { For } from "solid-js";
import { Token, token } from "styled-system/tokens";
import { Dynamic } from "solid-js/web"
import { flex } from "styled-system/patterns";

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
    <For each={colors} fallback={(<div>Palette {props.name} not found!</div>)}>
      {(hue, idx) => (
        <div style={{
          background: hue.color,
          color: hue.contrast == hue.color ? colors[0].color : hue.contrast
        }} class={flex({ justify: 'space-around' })}>
          <span>{hue.key}</span><span>{hue.color}</span>
        </div>
      )}
    </For>
  );
}

function Headings(props: { depth: number}) {
  return (
    <For each={Array.from({ length: props.depth }, (_, i) => i + 1)}>
      {(level) => {
        return <Dynamic component={`h${level}`}>H{level}</Dynamic>
      }}
    </For>
  )
}

export function Styleguide() {
  return (
    <>
      <Headings depth={4} />

      <ColorPalette name="brand" />
      <ColorPalette name="surface" />
      <ColorPalette name="accent" />
    </>
  );
}
