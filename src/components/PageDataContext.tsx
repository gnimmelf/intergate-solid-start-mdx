import {
  createResource,
  createContext,
  JSX,
  useContext,
  createEffect,
  createMemo,
  Show,
} from "solid-js";
import { RouteMatch, useCurrentMatches } from "@solidjs/router";
import { Resource } from "solid-js/types/server/rendering.js";

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
      console.log(match)
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            frontmatter: {
              title: "TEST TITLE",
              intro: "TEST INTRO",
            },
            path: match.path,
          });
        }, 10)
      );
    },
    { deferStream: true }
  );

  return (
    <Context.Provider value={pageData}>
      {props.children}
    </Context.Provider>
  );
}

export const usePageData = () => {
  const pageData = useContext(Context)!;
  console.log({ pageData: pageData() });
  return pageData;
};
