import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { usePageData } from "./PageDataContext";
import { ToggleDarkMode } from "./ToggleDarkMode";
import css from "./Header.module.css";

export function Header() {
  const pageData = usePageData();

  return (
    <header class={css["header"]}>
      <Title>{pageData()?.meta.title}</Title>
      <nav>
        <menu class={css["links"]}>
          <a href="/">Index</a>
          <a href="/about">About</a>
        </menu>
        <menu class={css["tools"]}>
          <ToggleDarkMode />
        </menu>
      </nav>

      <div>
        <h1>{pageData()?.meta.title}</h1>
        <div>{pageData()?.meta.intro}</div>
      </div>
    </header>
  );
}
