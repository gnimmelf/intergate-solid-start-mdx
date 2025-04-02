import { JSX } from "solid-js";

export function Card(props: {title: string, children: JSX.Element, footer?: string, idx?: number}) {
  return (
    <div data-index={props.idx}>
      <p>{props.title}</p>
      {props.children}
    </div>
  );
}
