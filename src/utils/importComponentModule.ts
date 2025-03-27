//  https://github.com/solidjs/solid-start/blob/main/packages/start/src/router/lazyRoute.ts
import { createComponent, onCleanup, type Component, type JSX } from "solid-js";
import { cleanupStyles } from "vinxi/css";


export default async function importComponentModule($component: any, exported = "default") {

  if (import.meta.env.DEV) {
    const manifest = import.meta.env.SSR
      ? import.meta.env.MANIFEST.ssr
      : import.meta.env.MANIFEST.client;

    // import() throws if a module doesn't exist, which includes any
    // modules loaded by the route itself, so it's important we catch here
    const mod = await manifest.inputs[$component.src].import().catch(() => null);

    // fallback to an empty $component as any errors will surface in the vite overlay
    if (!mod) return {
      default: () => []
    };

    if (!mod[exported]) {
      console.error(`Module ${$component.src} does not export ${exported}`);
    }

    return mod;
  } else {
    // Prod
    const mod = await $component.import();
    return mod;
  }
}