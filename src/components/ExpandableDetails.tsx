import { createSignal, JSXElement } from "solid-js";
import { css, cx } from "styled-system/css";
import { card, shine } from "styled-system/recipes";

const styles = {
  summary: css({
    listStyle: "none",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    '&::after': {
      color: '{colors.accent}',
      content: '"▼"',
      position: "absolute",
      right: "0.5em",
      transition: "transform 0.2s ease",
    },
    //@ts-expect-error
    'details[open] &::after': {
      transform: "rotate(180deg)",
    },
  }),
  content: css({
    overflow: "hidden",
    transition: "height 0.3s ease",
    height: "0px",
  }),
};
export function ExpandableDetails(props: { summary: string; children: JSXElement }) {
  // TODO! Setting default isOpen from a passed prop will fail.
  const [isOpen, setIsOpen] = createSignal(Boolean(false));
  const cardStyles = card();
  return (
    <details
      class={cardStyles.root}
      open={isOpen()}
      onToggle={() => setIsOpen(!isOpen())}
    >
      <summary class={cx(cardStyles.header, styles.summary, shine())}>
        {props.summary}
      </summary>
      <div class={cardStyles.content}>{props.children}</div>
    </details>
  );
}
