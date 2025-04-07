import { Component, JSXElement } from "solid-js";
import { card } from "styled-system/recipes";

export const Card: Component<{title: string, children: JSXElement, footer?: string | JSXElement}> = (props) => {
  const cardStyles = card()
  return (
    <div class={cardStyles.root}>
      <header class={cardStyles.header}>{props.title}</header>
      <main class={cardStyles.content}>{props.children}</main>
      {props.footer && <footer class={cardStyles.footer}>{props.footer}</footer>}
    </div>
  );
}
