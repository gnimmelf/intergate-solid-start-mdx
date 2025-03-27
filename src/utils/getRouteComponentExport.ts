//  https://github.com/solidjs/solid-start/blob/main/packages/start/src/router/lazyRoute.ts

export type MdxMetaData = {
  title: string;
  intro: string;
  [k: string]: any
}

export type MdxModule = {
  meta: MdxMetaData
  id: string
  [k: string]: any
}

export async function getRouteComponentExport(id: string, $component: any, exported = "meta") {
  let module: MdxModule

  if (import.meta.env.DEV) {
    const manifest = import.meta.env.SSR
      ? import.meta.env.MANIFEST.ssr
      : import.meta.env.MANIFEST.client;

    // import() throws if a module doesn't exist, which includes any
    // modules loaded by the route itself, so it's important we catch here
    try {
      module = await manifest.inputs[$component.src].import<MdxModule>();
    } catch (err) {
      throw err
    }

    if (!module[exported]) {
      console.error(`Module ${$component.src} does not export ${exported}`);
    }

  } else {
    // Prod
    module = await $component.import();
  }

  return {
    id,
    meta: module[exported]
  }
}