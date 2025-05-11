import { JSXElement } from "solid-js";
import { css, cx } from "styled-system/css";
import { box } from "styled-system/patterns";
import { card, linkScope, shine } from "styled-system/recipes";

export function Card(props: {
  title: string;
  children: JSXElement;
  footer?: () => JSXElement;
}) {
  const cardStyles = card();
  return (
    <div class={cx(box({ minW: "xs", maxW: "md" }))}>
      <div
        class={cx(
          cardStyles.root,
          linkScope({ area: "surface" }),
          shine()
        )}
      >
        <h3 class={cardStyles.header}>{props.title}</h3>
        <main class={cardStyles.content}>{props.children}</main>
        {props.footer && (
          <footer class={cardStyles.footer}>
            <props.footer />
          </footer>
        )}
      </div>
    </div>
  );
}
