import { createMemo, Show } from "solid-js";
import { css, cx } from "styled-system/css";
import { center, container } from "styled-system/patterns";
import { usePageData } from "./PageDataContext";
import { MenuBar } from "./MenuBar";
import { useTheme } from "./ThemeProvider";
import { SquaresBg } from "./SquaresBg";

const styles = {
  menuBarPos: cx(
    center(),
    css({
      zIndex: 10,
      position: "fixed",
      width: "100%",
      "& > *": {
        // Make the actual menubar element fill the width of the container
        width: "100%",
      },
    })
  ),
  content: cx(
    container(),
    css({
      paddingTop: "80px",
    })
  ),
  intro: css({
    textStyle: 'intro'
  })
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
        <Show when={pageData()?.meta}>
          <div>
            <SquaresBg>
              <h1>{pageData()?.meta.title}</h1>
            </SquaresBg>
            <Show when={pageData()?.meta.intro}>
              <SquaresBg>
                <div class={styles.intro}>{pageData()!.meta.intro}</div>
              </SquaresBg>
            </Show>
          </div>
        </Show>
      </div>
    </header>
  );
}
