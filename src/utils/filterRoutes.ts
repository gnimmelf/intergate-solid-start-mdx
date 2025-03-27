import { FileRoutes } from '@solidjs/start/router';
import { createMemo, createResource } from "solid-js"
import { Route } from 'vinxi/dist/types/lib/fs-router';
import { getRouteComponentExport } from '~/utils/getRouteComponentExport';

export function filterRoutes<T>(filterFn: (route: Route) => boolean) {
    const fileRoutes = createMemo(() => FileRoutes())

    const [teasers] = createResource(async () => {
        const modules = await Promise.all(fileRoutes()
            .filter(filterFn)
            .map(async (route) => {
                const module = await getRouteComponentExport(route.id, route.$component)
                console.log({ route, module })
                return module
            }))

        return modules
    })

    return teasers
}