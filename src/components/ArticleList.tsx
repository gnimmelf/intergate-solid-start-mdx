import { FileRoutes } from "@solidjs/start/router";
import { Route } from "vinxi/dist/types/lib/fs-router";
import { filterArticles } from "~/utils/filterArticles";

export function ArticleList(props: { filterFn: (route: Route) => boolean }) {
  const articles = filterArticles(props.filterFn);

  return (
    <>
      <p>Teasers</p>
      <pre class="text-wrap">{JSON.stringify(articles(), null, 2)}</pre>
    </>
  );
}
