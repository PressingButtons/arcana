export interface WorkerModuleMessage {
    id: number,
    content: any,
    route: string | null,
    status: boolean
}

export interface WorkerModulePromise {
    resolve: Function,
    reject:  Function
}

export class WorkerModule {

    #worker: Worker
    #routes: Map<string, Function>
    #promises: Map<number, WorkerModulePromise>
    #messageId: number;

    constructor( url: URL | string ) {
        this.#messageId = 0;
        this.#routes = new Map( );
        this.#promises = new Map( );
        this.#worker = new Worker( url, { type: "module" });
        this.#worker.onmessage = this.#handleMessage.bind(this);
    }


    #handleMessage( event: MessageEvent ) {
        const message: WorkerModuleMessage = this.#parseMessage( event );
        if( message.route ) this.#handleRoute( message );
        else this.#handlePromise( message );
    }

    #handleRoute( message: WorkerModuleMessage ) {
        if(!message.route) return;
        const method = this.#routes.get(message.route);
        if( !method ) return;
        method( message.content );
    }

    #handlePromise( message: WorkerModuleMessage ) {
        const promise = this.#promises.get(message.id);
        if(!promise) return;
        if( message.status ) promise.resolve( message.content );
        else promise.reject( message.content );
    }

    #parseMessage( event: MessageEvent ) {
        return {
            route: event.data.route,
            content: event.data.content,
            id: event.data.id,
            status: event.data.status
        }
    }

    setRoute( routeName: string, method: Function ) {
        this.#routes.set(routeName, method );
    }

    send( route: string, content: any, transferables: Array<Transferable> = []) {
        return new Promise((resolve, reject) => {
            const id = this.#messageId++;
            this.#promises.set(id, {resolve, reject})
            this.#worker.postMessage({route: route, id: id, content: content}, transferables);
        })
    }

}