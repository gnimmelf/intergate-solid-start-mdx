import { createMemo, For } from "solid-js";
import { getRoutesModuleData } from "~/utils/getRoutesModuleData";
import { ModuleData } from "~/utils/getRouteComponentExport";

export const defaultFilter = ({ meta }: ModuleData, idx: number) => {
  const publishedYear = new Date(meta.publishedAt).getFullYear();
  return true; //publishedYear === 2025
};

export const defaultSort = (a: ModuleData, b: ModuleData) => {
  return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
};

export function TeaserList(props: {
  path: string;
  filter?: (a: ModuleData, idx?: number) => boolean;
  sort?: (a: ModuleData, b: ModuleData) => number;
}) {
  const articles = getRoutesModuleData(
    props.path,
    props.filter || defaultFilter
  );

  const sorted = createMemo(() =>
    articles()?.toSorted(props.sort || defaultSort)
  );

  return (
    <section>
      <For each={sorted()} fallback={<div>No items</div>}>
        {(a, idx) => (
          <div data-index={idx()}>
            <p>{a.meta.title}</p>
            <p>{a.meta.intro}</p>

            <pre>{JSON.stringify(a, null, 2)}</pre>
          </div>
        )}
      </For>
    </section>
  );
}
