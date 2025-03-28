import { createResource, createContext, JSX, useContext } from "solid-js";
import { RouteDescription, useCurrentMatches } from "@solidjs/router";
import { Resource } from "solid-js/types/server/rendering.js";
import {getRouteComponentExport, type MdxModule} from "~/utils/getRouteComponentExport";

const Context = createContext<Resource<MdxModule>>();

export function PageDataProvider(props: { children: JSX.Element }) {
  const matches = useCurrentMatches();

  const [pageData] = createResource<MdxModule, RouteDescription>(
    () => {
      const m = matches();
      return m[m.length - 1]?.route;
    },
    async (route: any): Promise<MdxModule> => {
      const { $component } = route.key as { $component: any };
      const module = await getRouteComponentExport(route.id, $component);
      return module
    },
    { deferStream: false }
  );

  return <Context.Provider value={pageData}>{props.children}</Context.Provider>;
}

export const usePageData = () => {
  const pageData = useContext(Context)!;
  return pageData;
};
