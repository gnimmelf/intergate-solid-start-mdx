import { getRoutesPageData } from "~/utils/getRoutesPageData";

/**
 *
 * @returns
 */
export function useCategorizedArticles() {
  const routesData = getRoutesPageData("/");

    const categorizedArticles = Object.entries(
      routesData()?.reduce((acc, a) => {
        const parts = a.path.split("/").filter((p) => p);
        if (parts.length == 2) {
          const link = {
            label: a.meta.title,
            href: a.path,
          };
          acc[parts[0]] ? acc[parts[0]].push(link) : (acc[parts[0]] = [link]);
        }
        return acc;
      }, {} as Record<string, Array<{ label: string; href: string }>>) || []
    ).map(([key, links]) => ({ key, links }))

  return categorizedArticles
}
