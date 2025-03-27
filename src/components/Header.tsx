import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { usePageData } from "./PageDataContext";

export function Header() {
  const pageData = usePageData();

  return (
    <header>
      <Title>{pageData()?.frontmatter.title}</Title>
      <nav>
        <a href="/">Index</a>
        <a href="/about">About</a>
      </nav>
      <div>
        <h1>{pageData()?.frontmatter.title}</h1>
        <div>{pageData()?.frontmatter.intro}</div>
      </div>
    </header>
  );
}
