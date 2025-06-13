import { JSXElement, Show } from "solid-js";
import { css, cx } from "styled-system/css";
import { box } from "styled-system/patterns";
import { card, linkScope } from "styled-system/recipes";

const styles = {
  entry: css({
    marginBottom: "{2}",
  }),
  separator: css({
    borderColor: '{colors.border.subtle}',
    marginTop: "{2}",
  })
};

export function Experience(props: {
  primary: string;
  secondary: string;
  period: string;
  children: JSXElement;
  skillsList?: string[];
  hideSeparator?: boolean
}) {
  return (
    <>
      <div class={styles.entry}>
        <h3>{props.primary}</h3>
        <div>
          {props.secondary}, {props.period}
        </div>
        <div>{props.children}</div>
        <Show when={props.skillsList}>
          <div>
            Skills: <i>{props.skillsList?.join(" / ")}</i>
          </div>
        </Show>
        <Show when={!props.hideSeparator}>
          <hr class={styles.separator} />
        </Show>
      </div>
    </>
  );
}
