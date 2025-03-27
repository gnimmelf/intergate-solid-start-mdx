import { JSX } from "solid-js";
import { usePageData } from "./PageDataContext";

export function Article(props: { children: JSX.Element })  {
  const pageData = usePageData()

  return <article>{props.children}</article>;
}
