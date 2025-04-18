import { JSXElement } from "solid-js";

export function WrapperTest(props: { children: JSXElement }) {
  return (
    <div>
      WrapperTest
      <br />
      {props.children}
    </div>
  );
}
