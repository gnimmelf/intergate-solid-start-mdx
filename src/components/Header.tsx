import { createMemo, Show } from "solid-js";
import { usePageData } from "./PageDataContext";
import { ToggleDarkMode } from "./ToggleDarkMode";
import css from "./Header.module.css";

export function Header() {
  const pageData = usePageData();

  const isFrontPage = createMemo(() => pageData()?.path === "/");

  return (
    <header class={css["header"]}>
      <nav>
        <menu class={css["links"]}>
          <a href="/">Index</a>
          <a href="/about">About</a>
        </menu>
        <menu class={css["tools"]}>
          <ToggleDarkMode />
        </menu>
      </nav>

      <Show when={isFrontPage()}>
        <div>Frontpage!</div>
      </Show>

      <div>
        <h1>{pageData()?.meta.title}</h1>
        <div>{pageData()?.meta.intro}</div>
      </div>
    </header>
  );
}
