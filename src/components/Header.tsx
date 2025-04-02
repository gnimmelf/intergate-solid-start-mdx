import { createMemo, Show } from "solid-js";
import { usePageData } from "./PageDataContext";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { css } from "styled-system/css";

const styles = {
  header: css({
    colorPalette: "blue",
    bg: "colorPalette.100",
    _hover: {
      bg: "colorPalette.200",
    },
  }),
  nav: css({
    fontSize: "xl",
    bg: "rose.100",
  }),
  content: css({
    colorPalette: "blue",
    bg: "colorPalette.100",
  }),
};

export function Header() {
  const pageData = usePageData();

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  return (
    <header>
      <nav class={styles.header}>
        <menu>
          <a href="/">Index</a>
          <a href="/about">About</a>
        </menu>
        <menu>
          <ToggleDarkMode />
        </menu>
      </nav>

      <Show when={isFrontPage()}>
        <div>Frontpage!</div>
      </Show>

      <div class={styles.content}>
        <h1>{pageData()?.meta.title}</h1>
        <div>{pageData()?.meta.intro}</div>
      </div>
    </header>
  );
}
