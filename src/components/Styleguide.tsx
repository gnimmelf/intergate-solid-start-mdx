import { createMemo, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { center, linkOverlay } from "styled-system/patterns";
import { Card } from "./Card";
import { CardContainer } from "./CardContainer";
import { css, cx } from "styled-system/css";
import {
  toLch,
  formatCss,
} from "../theme/utils/color-utils";
import { useTheme } from "./ThemeProvider";
import { SquaresBg } from "./SquaresBg";
import { extractPandaPalette, extractPandaToken } from "~/utils/extractPandaPalette";
import { Input } from "./Input";
import { Button } from "./Button";
import { ExpandableDetails } from "./ExpandableDetails";
import { ColorMetadata } from "~/theme/utils/types";
import { colorMetadata } from "~/theme/utils/scheme-color-meta-data";

function createContrastColor(hex: string) {
  const parsedLch = toLch(hex);
  const contrast = 50;

    const newL = parsedLch.l > 50
      ? parsedLch.l - contrast
      : Math.min(100, parsedLch.l + contrast);

    // Create the target color
    return formatCss({
      ...parsedLch,
      l: newL,
    })
}

function formatLCh(hex: string): string {
  const parsedLch = toLch(hex);
  return formatCss({
    l: parseFloat(Number(parsedLch.l).toFixed(2)),
    c: parseFloat(Number(parsedLch.c).toFixed(2)),
    h:
      parsedLch.h == undefined ? 0 : parseFloat(Number(parsedLch.h).toFixed(2)),
  });
}

/**
 * Color tokens are retrived by dot-prop key from `token(dotPropKey)`.
 * This means we have to know the keys forehand, which is impossible unless they
 * follow a well-known pattern. The pattern must be `colors.{palettename}.{50|index*100}.
 * @param props.name palette-name
 * @returns JSX.Element
 */
function ColorPalette(props: { name: string }) {
  const palette = createMemo(() => {
    const colors = extractPandaPalette(`colors.${props.name}`);
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
          return (
            <div
              style={{
                background: color.value,
                color: createContrastColor(color.value)
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

function SquaresBgs(props: { themeName: string; depth: number }) {
  return (
    <For each={Array.from({ length: props.depth }, (_, i) => i + 1)}>
      {(level) => {
        return (
          <SquaresBg>
            <Dynamic component={`h${level}`}>
              Heading + SquaresBg {level}
            </Dynamic>
          </SquaresBg>
        );
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
      <section>
        <SquaresBgs themeName={themeName()} depth={4} />
        How easy can you find the <a href="#">link</a> in this line?
      </section>
      <section>
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
      </section>
      <section>
        <ExpandableDetails summary="Expandable details">
          <p>Lorem ipsum</p>
        </ExpandableDetails>
      </section>
      <section>
        <Input placeholder="placeholder" />
        <Button>Button</Button>
      </section>
      <section>
        <ColorPalette name={`${themeName()}.ramp`} />
      </section>
    </>
  );
}
