import { createMemo, Show } from "solid-js";
import { css, cx } from "styled-system/css";
import { wrap, container, box, linkOverlay } from "styled-system/patterns";
import { usePageData } from "./PageDataContext";
import { XMenu } from "./XMenu";
import { useTheme } from "./ThemeProvider";

const styles = {
  // header:
};

export function Header() {
  const theme = useTheme();
  const pageData = usePageData();

  console.log(pageData());

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  return (
    <header class={styles.header}>
      <XMenu />
      <Show when={isFrontPage()}>
        <div>Frontpage!</div>
      </Show>

      <Show when={pageData()?.meta}>
        <div>
          <h1>{pageData()?.meta.title}</h1>
          <div>{pageData()?.meta.intro}</div>
        </div>
      </Show>
    </header>
  );
}
