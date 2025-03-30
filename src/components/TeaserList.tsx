import { createMemo, For } from "solid-js";
import { getRoutesPageData } from "~/utils/getRoutesPageData";
import { type PageData } from "~/utils/getRouteComponentExport";
import { Card } from "./Card";
import css from "./TeaserList.module.css"

export const defaultFilter = ({ meta }: PageData, idx: number) => {
  const publishedYear = new Date(meta.publishedAt).getFullYear();
  return true; //publishedYear === 2025
};

export const defaultSort = (a: PageData, b: PageData) => {
  return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
};

export function TeaserList(props: {
  path: string;
  filter?: (a: PageData, idx?: number) => boolean;
  sort?: (a: PageData, b: PageData) => number;
}) {
  const articles = getRoutesPageData(
    props.path,
    props.filter || defaultFilter
  );

  const sorted = createMemo(() =>
    articles()?.toSorted(props.sort || defaultSort)
  );

  return (
    <section class={css['container']}>
      <For each={sorted()} fallback={<div>No items</div>}>
        {(a, idx) => (
          <Card title={a.meta.title} idx={idx()}>
            <>
              <p>{a.meta.intro}</p>
              <p>
                <a href={a.path}>Read more</a>
              </p>
            </>
          </Card>
        )}
      </For>
    </section>
  );
}
