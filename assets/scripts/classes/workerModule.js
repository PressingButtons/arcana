var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WorkerModule_instances, _WorkerModule_worker, _WorkerModule_routes, _WorkerModule_promises, _WorkerModule_messageId, _WorkerModule_handleMessage, _WorkerModule_handleRoute, _WorkerModule_handlePromise, _WorkerModule_parseMessage;
export class WorkerModule {
    constructor(url) {
        _WorkerModule_instances.add(this);
        _WorkerModule_worker.set(this, void 0);
        _WorkerModule_routes.set(this, void 0);
        _WorkerModule_promises.set(this, void 0);
        _WorkerModule_messageId.set(this, void 0);
        __classPrivateFieldSet(this, _WorkerModule_messageId, 0, "f");
        __classPrivateFieldSet(this, _WorkerModule_routes, new Map(), "f");
        __classPrivateFieldSet(this, _WorkerModule_promises, new Map(), "f");
        __classPrivateFieldSet(this, _WorkerModule_worker, new Worker(url, { type: "module" }), "f");
        __classPrivateFieldGet(this, _WorkerModule_worker, "f").onmessage = __classPrivateFieldGet(this, _WorkerModule_instances, "m", _WorkerModule_handleMessage).bind(this);
    }
    setRoute(routeName, method) {
        __classPrivateFieldGet(this, _WorkerModule_routes, "f").set(routeName, method);
    }
    send(route, content, transferables = []) {
        return new Promise((resolve, reject) => {
            var _a, _b;
            const id = (__classPrivateFieldSet(this, _WorkerModule_messageId, (_b = __classPrivateFieldGet(this, _WorkerModule_messageId, "f"), _a = _b++, _b), "f"), _a);
            __classPrivateFieldGet(this, _WorkerModule_promises, "f").set(id, { resolve, reject });
            __classPrivateFieldGet(this, _WorkerModule_worker, "f").postMessage({ route: route, id: id, content: content }, transferables);
        });
    }
}
_WorkerModule_worker = new WeakMap(), _WorkerModule_routes = new WeakMap(), _WorkerModule_promises = new WeakMap(), _WorkerModule_messageId = new WeakMap(), _WorkerModule_instances = new WeakSet(), _WorkerModule_handleMessage = function _WorkerModule_handleMessage(event) {
    const message = __classPrivateFieldGet(this, _WorkerModule_instances, "m", _WorkerModule_parseMessage).call(this, event);
    if (message.route)
        __classPrivateFieldGet(this, _WorkerModule_instances, "m", _WorkerModule_handleRoute).call(this, message);
    else
        __classPrivateFieldGet(this, _WorkerModule_instances, "m", _WorkerModule_handlePromise).call(this, message);
}, _WorkerModule_handleRoute = function _WorkerModule_handleRoute(message) {
    if (!message.route)
        return;
    const method = __classPrivateFieldGet(this, _WorkerModule_routes, "f").get(message.route);
    if (!method)
        return;
    method(message.content);
}, _WorkerModule_handlePromise = function _WorkerModule_handlePromise(message) {
    const promise = __classPrivateFieldGet(this, _WorkerModule_promises, "f").get(message.id);
    if (!promise)
        return;
    if (message.status)
        promise.resolve(message.content);
    else
        promise.reject(message.content);
}, _WorkerModule_parseMessage = function _WorkerModule_parseMessage(event) {
    return {
        route: event.data.route,
        content: event.data.content,
        id: event.data.id,
        status: event.data.status
    };
};
