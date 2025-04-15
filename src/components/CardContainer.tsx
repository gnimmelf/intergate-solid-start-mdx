import { JSXElement } from "solid-js";
import { wrap, box } from "styled-system/patterns";
import { css, cx } from "styled-system/css";

const styles = {
  section: cx(
    css({
      marginBottom: '2rem'
    }),
    wrap({
      justify: "center",
      gap: "1rem",
    })
  ),
};

export function CardContainer(props: { children?: JSXElement }) {
  return <section class={cx(styles.section)}>{props.children}</section>;
}
