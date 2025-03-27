import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import { usePageData } from "./PageDataContext";
import { MdxModule } from "~/utils/getRouteComponentExport";

export function Header() {
  const pageData = usePageData();

  return (
    <header>
      <Title>{pageData()?.meta.title}</Title>
      <nav>
        <a href="/">Index</a>
        <a href="/about">About</a>
      </nav>
      <div>
        <h1>{pageData()?.meta.title}</h1>
        <div>{pageData()?.meta.intro}</div>
      </div>
    </header>
  );
}
