import { JSXElement } from "solid-js";
import { usePageData } from "./PageDataContext";
import { container } from "styled-system/patterns";

const styles = {
    section: container({ padding: "1rem" }),
}

export function Article(props: { children: JSXElement })  {
  const pageData = usePageData()

  return <article class={styles.section}>{props.children}</article>;
}
