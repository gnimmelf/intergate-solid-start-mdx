import { createMemo, For, Show } from "solid-js";
import { css, cx } from "styled-system/css";
import { center, container } from "styled-system/patterns";
import { PRIMARY_MENU_LINKS, SITE_SUB_TITLE, SITE_TITLE } from "~/constants";
import { usePageData } from "./PageDataContext";
import { useTheme } from "./ThemeProvider";
import { SquaresBg } from "./SquaresBg";

const styles = {
  container: cx(
    center(),
    css({
      display: "flex",
      flexDirection: "column",
    })
  ),
  linkMenu: css({
    display: "flex",
    "& a": {
      textDecoration: "none",
    },
    "& li": {
      _firstOfType: {
        paddingLeft: "0",
        _before: {
          display: "none",
        },
      },
    },
  }),
  spacer: css({
    marginY: "{5}",
  }),
};

export function SiteFooter() {
  const theme = useTheme();
  const pageData = usePageData();

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  return (
    <section class={styles.container}>
      <div class={styles.spacer}>~~~</div>

      <SquaresBg>
        <ul class={styles.linkMenu}>
          <For each={PRIMARY_MENU_LINKS}>
            {(link, idx) => (
              <li>
                <a href={link.href}>{link.label}</a>
              </li>
            )}
          </For>
        </ul>
      </SquaresBg>

      <div>
        © {SITE_TITLE} {new Date().getFullYear()}
      </div>
      <div class={styles.spacer}></div>
    </section>
  );
}
