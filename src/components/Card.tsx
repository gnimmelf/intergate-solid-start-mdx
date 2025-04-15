import { JSXElement } from "solid-js";
import { box } from "styled-system/patterns";
import { card } from "styled-system/recipes";

export function Card(props: {
  title: string;
  children: JSXElement;
  footer?: string | JSXElement;
  class?: string;
}) {
  const cardStyles = card();
  return (
    <div class={box({ minW: "xs", maxW: "md" })}>
      <div class={cardStyles.root}>
        <header class={cardStyles.header}>{props.title}</header>
        <main class={cardStyles.content}>{props.children}</main>
        {props.footer && (
          <footer class={cardStyles.footer}>{props.footer}</footer>
        )}
      </div>
    </div>
  );
}
