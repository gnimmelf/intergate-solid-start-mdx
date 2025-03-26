//  https://github.com/solidjs/solid-start/blob/main/packages/start/src/router/lazyRoute.ts

export default async function ($component: any) {
  let module

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
}