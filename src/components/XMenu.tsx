import { createEffect, createMemo, For, Show } from "solid-js";
import { usePageData } from "./PageDataContext";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { css, cx } from "styled-system/css";
import { hstack, vstack } from "styled-system/patterns";
import { useTheme } from "./ThemeProvider";
import { getRoutesPageData } from "~/utils/getRoutesPageData";
import { PageData } from "~/utils/getRouteComponentExport";

const styles = {
  nav: cx(css({ textTransform: "capitalize" }), hstack()),
};

export function XMenu() {
  const theme = useTheme();
  const pageData = usePageData();

  const toggleDarkMode = () => {
    theme.toggleIsDark();
    document.documentElement.setAttribute(
      "data-theme",
      theme.isDark() ? "dark" : ""
    );
  };
  const articles = getRoutesPageData("/");

  const categories = createMemo(() =>
    Object.entries(
      articles()?.reduce((acc, a) => {
        const parts = a.path.split("/").filter((p) => p);
        if (parts.length == 2) {
          const link = {
            label: a.meta.title,
            href: a.path,
          };
          acc[parts[0]] ? acc[parts[0]].push(link) : (acc[parts[0]] = [link]);
        }
        return acc;
      }, {} as Record<string, Array<{ label: string; href: string }>>) || []
    ).map(([key, links]) => ({ key, links }))
  );

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  return (
    <nav class={styles.nav}>
      <ul>
        <li>
          <a href="/">Index</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <For each={categories()}>
          {(s, sIdx) => (
            <li>
              <span>{s.key}</span>
              <ul>
                <For each={s.links}>
                  {(a, aIdx) => (
                    <li>
                      <a href={a.href}>{a.label}</a>
                    </li>
                  )}
                </For>
              </ul>
            </li>
          )}
        </For>
        <li>
          <ToggleDarkMode />
        </li>
      </ul>
    </nav>
  );
}
