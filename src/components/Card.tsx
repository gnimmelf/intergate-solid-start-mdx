import { JSXElement } from "solid-js";
import { css, cx } from "styled-system/css";
import { box } from "styled-system/patterns";
import { card, linkScope } from "styled-system/recipes";

const styles = {
  container: css({
    marginY: '{2}'
  }),
  stacked: box({ minW: "xs", maxW: "md" }),
  aside: css({
    float: { base: 'unset', md:'right' },
    width: { base: '100%', md: '{xs}' },
    marginLeft: { base: 'unset', md: '{4}'},
    marginBottom: '{7}'
  })
}

export function Card(props: {
  title: string;
  children: JSXElement;
  fullWidth: boolean
  centerContent?: boolean
  aside?: boolean
  footer?: () => JSXElement;
}) {
  const cardStyles = card({centerContent: props.centerContent});
  return (
    <div class={cx(
      styles.container,
      !props.fullWidth && !props.aside && styles.stacked,
      props.aside && styles.aside
    )}>
      <div
        class={cx(
          cardStyles.root,
          linkScope({ area: "surface" }),
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
