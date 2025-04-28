import { createMemo, Show } from "solid-js";
import { css, cx } from "styled-system/css";
import { center, container } from "styled-system/patterns";
import { usePageData } from "./PageDataContext";
import { MenuBar } from "./MenuBar";
import { useTheme } from "./ThemeProvider";

const styles = {
  menuBarPos: cx(
    center(),
    css({
      zIndex: 10,
      position: "fixed",
      width: "100%",
      "& > *": {
        width: "100%",
        maxWidth: "calc(var(--sizes-8xl) + 2rem)",
      },
    })
  ),
  content: cx(
    container(),
    css({
      paddingTop: "80px",
    })
  ),
};

export function PageHeader() {
  const theme = useTheme();
  const pageData = usePageData();

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  return (
    <header>
      <div class={styles.menuBarPos}>
        <MenuBar />
      </div>

      <div class={styles.content}>
        <Show when={isFrontPage()}>
          <div>Frontpage!</div>
        </Show>

        <Show when={pageData()?.meta}>
          <div>
            <h1>{pageData()?.meta.title}</h1>
            <div>{pageData()?.meta.intro}</div>
          </div>
        </Show>
      </div>
    </header>
  );
}
