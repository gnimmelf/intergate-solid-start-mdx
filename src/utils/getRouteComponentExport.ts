//  https://github.com/solidjs/solid-start/blob/main/packages/start/src/router/lazyRoute.ts
import camelcaseKeys from 'camelcase-keys';

export type MdxMetaData = {
  title: string;
  intro: string;
  [k: string]: any
}

export type RouteComponent = {
  src: string
  import: Function
}

export type RouteData = {
  $component: RouteComponent,
  id: string
  [k: string]: any
}

export type ModuleData = {
  meta: MdxMetaData
  [k: string]: any
}

export type PageData = ModuleData & {
  path: string
}

export async function getRouteComponentExport($component: RouteComponent, exported = "meta"): Promise<ModuleData> {
  let module;

  if (import.meta.env.DEV) {
    const manifest = import.meta.env.SSR
      ? import.meta.env.MANIFEST.ssr
      : import.meta.env.MANIFEST.client;

    // import() throws if a module doesn't exist, which includes any
    // modules loaded by the route itself, so it's important we catch here
    try {
      module = await manifest.inputs[$component.src].import();
    } catch (err) {
      throw err
    }

    if (!module[exported]) {
      console.warn(`Module ${$component.src} does not export ${exported}`);
    }

  } else {
    // Prod
    module = await $component.import();
  }

  return {
    meta: camelcaseKeys(module[exported])
  }
}