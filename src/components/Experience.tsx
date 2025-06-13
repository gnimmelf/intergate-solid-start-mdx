import { JSXElement, Show } from "solid-js";
import { css, cx } from "styled-system/css";
import { box } from "styled-system/patterns";
import { card, linkScope } from "styled-system/recipes";

const styles = {};

export function Experience(props: {
  title: string;
  company: string;
  period: string;
  skillsList: string[]
  children: JSXElement
}) {
  return (
    <>
      <h3>{props.title}</h3>
      <div>{props.company}, {props.period}</div>
      <Show when={props.children}>
        <div>{props.children}</div>
      </Show>
      <Show when={props.skillsList?.length}>
        <div>Skills: <i>{props.skillsList.join(" / ")}</i></div>
      </Show>
    </>
  );
}
