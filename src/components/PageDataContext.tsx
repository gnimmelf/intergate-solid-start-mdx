import { createResource, createContext, JSX, useContext } from "solid-js";
import { RouteMatch, useCurrentMatches } from "@solidjs/router";
import { Resource } from "solid-js/types/server/rendering.js";
import importComponentModule from "~/utils/importComponentModule";

export type FrontMatter = {
  title: string;
  intro: string;
};

export type PageData = {
  frontmatter: FrontMatter;
  path: string;
};

const Context = createContext<Resource<PageData>>();

export function PageDataProvider(props: { children: JSX.Element }) {
  const matches = useCurrentMatches();

  const [pageData] = createResource<PageData, RouteMatch>(
    () => {
      const m = matches();
      return m[m.length - 1];
    },
    async (match): Promise<PageData> => {
      const { $component } = match.route.key as { $component: any };
      const module = await importComponentModule($component);
      const { frontmatter } = module;
      console.log(frontmatter);
      return {
        frontmatter,
        path: match.path
      };
    },
    { deferStream: false }
  );

  return <Context.Provider value={pageData}>{props.children}</Context.Provider>;
}

export const usePageData = () => {
  const pageData = useContext(Context)!;
  console.log({ pageData: pageData() });
  return pageData;
};
