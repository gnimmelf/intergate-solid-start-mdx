import { JSX } from "solid-js";
import { usePageData } from "./PageDataContext";
import { container } from "styled-system/patterns";

const styles = {
    section: container({ padding: "1rem" }),
}

export function Article(props: { children: JSX.Element })  {
  const pageData = usePageData()

  return <article class={styles.section}>{props.children}</article>;
}
