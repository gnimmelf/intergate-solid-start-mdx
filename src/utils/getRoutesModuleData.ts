import { FileRoutes } from '@solidjs/start/router';
import { createMemo, createResource } from "solid-js"
import { getRouteComponentExport, ModuleData } from '~/utils/getRouteComponentExport';

export function getRoutesModuleData<T>(path: string, filter: (...args: any[]) => boolean) {
    const fileRoutes = createMemo(() => FileRoutes().filter(route => route.path.startsWith(path)))

    const [teasers] = createResource(async () => {
        const modules = await Promise.all(fileRoutes()
            .map(async (route) => {
                const module = await getRouteComponentExport(route.id, route.$component)
                console.log({ route, module })
                return module
            }))

        return filter
            ? modules.filter(filter)
            : modules
    })

    return teasers
}