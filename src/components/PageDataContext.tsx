import { createResource, createContext, JSX, useContext } from "solid-js";
import { RouteDescription, useCurrentMatches } from "@solidjs/router";
import { Resource } from "solid-js/types/server/rendering.js";
import {
  getRouteComponentExport,
  type RouteData,
  type PageData
} from '~/utils/getRouteComponentExport';

const Context = createContext<Resource<PageData>>();

export function PageDataProvider(props: { children: JSX.Element }) {
  const matches = useCurrentMatches();

  const [pageData] = createResource<PageData, RouteDescription>(
    () => {
      const m = matches();
      return m[m.length - 1]?.route;
    },
    async (route: any): Promise<PageData> => {
      // Note! RouteData is at `route.key`, not just `route`
      const { id, $component } = route.key as RouteData
      const module = await getRouteComponentExport($component);
      return {
        ...module,
        path: id,
      }
    },
    { deferStream: false }
  );

  return <Context.Provider value={pageData}>{props.children}</Context.Provider>;
}

export const usePageData = () => {
  const context = useContext(Context)!;
  if (!context) {
    throw new Error("usePageData must be used within a PageDataProvider");
  }
  return context;
};
