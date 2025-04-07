import { FileRoutes } from '@solidjs/start/router';
import { createMemo, createResource } from "solid-js"
import {
    getRouteComponentExport,
    type RouteData,
    type PageData
} from '~/utils/getRouteComponentExport';

export function getRoutesPageData<T>(path: string) {
    const fileRoutes = createMemo(() => FileRoutes().filter(route => route.path.startsWith(path)))

    const [teasers] = createResource<PageData[]>(async () => {
        const modules = await Promise.all(fileRoutes()
            .map(async (route) => {
                // Note! RouteData is at just `route`, not `route.key`
                const { id, $component } = route as RouteData
                const module = await getRouteComponentExport($component)
                return {
                    ...module,
                    path: id,
                }
            }))

        return modules
    })

    return teasers
}