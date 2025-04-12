import { createMemo, For } from "solid-js";
import { wrap, container, box, linkOverlay } from "styled-system/patterns";
import { css, cx } from "styled-system/css";
import { getRoutesPageData } from "~/utils/getRoutesPageData";
import { type PageData } from "~/utils/getRouteComponentExport";
import { Card } from "./Card";

const styles = {
  section: cx(
    wrap({
      justify: "center",
      gap: "1rem"
    })
  ),
  cardWrapper: cx(css({ pos: "relative" }), box({ minW: "xs", maxW: "md" })),
};

export const defaultSort = (a: PageData, b: PageData) => {
  return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
};

export function TeaserList(props: {
  path: string;
  style?: Record<string, string>
  filter?: (a: PageData, idx?: number) => boolean;
  sort?: (a: PageData, b: PageData) => number;
}) {
  const articles = getRoutesPageData(props.path);

  const sorted = createMemo(() =>
    articles()?.toSorted(props.sort || defaultSort)
  );

  return (
    <section class={cx(styles.section)}>
      <For each={sorted()} fallback={<div>No items</div>}>
        {(a, idx) => (
          <div data-index={idx} class={styles.cardWrapper}>
            <Card title={a.meta.title}>
              <p>{a.meta.intro}</p>
              <p>
                <a class={linkOverlay()} href={a.path}>
                  Read more
                </a>
              </p>
            </Card>
          </div>
        )}
      </For>
    </section>
  );
}
