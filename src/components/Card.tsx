import { JSX } from "solid-js";
import css from "./Card.module.css"

export function Card(props: {title: string, children: JSX.Element, footer?: string, idx?: number}) {
  return (
    <div class={css['card']} data-index={props.idx}>
      <p>{props.title}</p>
      {props.children}
    </div>
  );
}
