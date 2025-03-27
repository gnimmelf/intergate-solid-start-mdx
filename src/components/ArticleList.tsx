import { For } from "solid-js";
import { Route } from "vinxi/dist/types/lib/fs-router";
import { filterRoutes } from "~/utils/filterRoutes";

export function ArticleList(props: { filterFn: (route: Route) => boolean }) {
  const articles = filterRoutes(props.filterFn);

  return (
    <section>
      <For each={articles()} fallback={<div>No items</div>}>
        {(a, idx) => <div data-index={idx()}>
            <pre>{JSON.stringify(a, null,2)}</pre>
            {/* <title>{a.meta.title}</title>
            <p>{a.meta.intro}</p> */}
        </div>}
      </For>
    </section>
  );
}
