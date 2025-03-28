import { createResource } from "solid-js";
import { useCurrentMatches } from "@solidjs/router";
import { createContextProvider } from "@solid-primitives/context";

export type PageData = {
  frontmatter: {
    title: string
    intro: string
  }
}

const [PageDataProvider, useCurrentPageDataContext] = createContextProvider((props: { deferStream?: boolean }) => {
  const matches = useCurrentMatches();

  const [pageData] = createResource(
    () => {
      const m = matches()
      return m[m.length - 1]
    },
    async (match): Promise<PageData> => {
      const { $component } = match.route.key as { $component: any };

      let module: any;

      // See:
      //  https://github.com/solidjs/solid-start/blob/main/packages/start/src/router/lazyRoute.ts
      if (import.meta.env.DEV) {
        // Dev
        if (
          typeof window !== "undefined" &&
          // @ts-ignore
          typeof window.$$SolidBase_page_data !== "undefined" &&
          // @ts-ignore
          typeof window.$$SolidBase_page_data[$component.src.split("?")[0]] !== "undefined"
        ) {
          const pageData = (window as Record<string, any>).$$SolidBase_page_data[$component.src.split("?")[0]];
          if (!pageData) {
            throw new Error("Failed to get page data: no page data");
          }
          return Promise.resolve(pageData);
        }

        const manifest = import.meta.env.SSR
          ? import.meta.env.MANIFEST.ssr
          : import.meta.env.MANIFEST.client;

        module = manifest.inputs[$component.src];
      } else {
        // Prod
        module = $component;
      }

      if (!module) throw new Error("Failed to get page data: module not found");

      const res = await module.import().catch((err: any) => console.error(err));

      return res
    },
    {
      get deferStream() {
        return props.deferStream ?? true
      }
    },
  );

  return () => pageData();
});

export { PageDataProvider };

export function useCurrentPageData() {
  return (
    useCurrentPageDataContext() ??
    (() => {
      throw new Error("useCurrentPageData must be called underneath a PageDataProvider");
    })()
  );
}

export function useFrontmatter<T extends Record<string, any>>() {
  const pageData = useCurrentPageData();

  return () => pageData()?.frontmatter as T | undefined;
}