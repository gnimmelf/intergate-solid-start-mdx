import { FileRoutes } from '@solidjs/start/router';
import { createMemo, createResource } from "solid-js"
import { Route } from 'vinxi/dist/types/lib/fs-router';
import importComponentModule from '~/utils/importComponentModule';
import { dotProp } from "~/utils"

export function filterArticles(filterFn: (route: Route) => boolean, props = ['frontmatter']) {
    const fileRoutes = createMemo(() => FileRoutes())
    const [teasers] = createResource(async () => {
        const routes = await Promise.all(fileRoutes()
            .filter(filterFn)
            .map(async (route) => {
                const module = await importComponentModule(route.$component)
                console.log({ route, module })
                return {
                    id: route.id,
                    ...props.reduce((acc, prop) => ({ ...acc, [prop]: module[prop] }), {})
                }
            }))

        return routes
    })

    return teasers
}