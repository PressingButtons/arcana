import { WorkerModuleMessage } from "./workerModule.js";

export namespace Messenger {
    const routes: Map<string, Function> = new Map( );

    self.addEventListener('message', event => {
        const message: WorkerModuleMessage = event.data;
        if(message.route) {
            const route = routes.get(message.route);
            if(!route) return;
            try {
                let content = route(message.content);
                postMessage({
                    id: message.id, content: content, status: true
                })
            } catch (err) {
                postMessage({
                    id: message.id, content: err, status: false
                })
            }
        }
    });

    export function setRoute(routeName: string, method: Function) {
        routes.set(routeName, method);
    }

    export function send( route: string, content: any, transferables ) {
        postMessage({ route: route, content: content}, transferables )
    }

}