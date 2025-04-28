import { JSXElement } from "solid-js";
import { cx } from "styled-system/css";
import { box } from "styled-system/patterns";
import { card, linkScope } from "styled-system/recipes";
import { SquaresBg } from "./SquaresBg";

export function Card(props: {
  title: string;
  children: JSXElement;
  footer?: () => JSXElement;
}) {
  const cardStyles = card();
  return (
    <div class={box({ minW: "xs", maxW: "md" })}>
      <div
        class={cx(
          cardStyles.root,
          linkScope({ area: 'surface'})
        )}
      >
        <SquaresBg asBlock={true} squareSize={8}>
          <h3 class={cardStyles.header}>{props.title}</h3>
        </SquaresBg>
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
