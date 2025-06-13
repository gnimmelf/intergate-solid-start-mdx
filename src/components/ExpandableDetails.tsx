import { createSignal, JSXElement } from "solid-js";
import { css, cx } from "styled-system/css";
import { card, shine } from "styled-system/recipes";

const styles = {
  container: css({
    marginBottom: '{2}',
    '&[open] .icon': {
      transform: "rotate(180deg)",
    },
  }),
  summary: css({
    listStyle: "none",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    '& .text': {
      flexGrow: 1,
    },
    '& .icon': {
      flexGrow: 0,
      color: '{colors.accent}',
      transition: "transform 0.2s ease",
    },
  }),
  content: css({
    overflow: "hidden",
    transition: "height 0.3s ease",
    height: "0px",
  }),
};
export function ExpandableDetails(props: { summary: string; children: JSXElement, centerContent?: boolean }) {
  // TODO! Setting default isOpen from a passed prop will fail.
  const [isOpen, setIsOpen] = createSignal(Boolean(false));
  const cardStyles = card({ centerContent: props.centerContent});
  return (
    <details
      class={cx(cardStyles.root, styles.container)}
      open={isOpen()}
      onToggle={() => setIsOpen(!isOpen())}
    >
      <summary class={cx(cardStyles.header, styles.summary, shine())}>
        <span class='text'>{props.summary}</span>
        <span class='icon'>▼</span>
      </summary>
      <div class={cardStyles.content}>{props.children}</div>
    </details>
  );
}
