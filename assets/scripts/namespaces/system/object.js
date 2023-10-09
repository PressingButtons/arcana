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
export var System;
(function (System) {
    let Object;
    (function (Object) {
        var _SignalObject_channels;
        class SignalObject {
            constructor() {
                _SignalObject_channels.set(this, void 0);
                __classPrivateFieldSet(this, _SignalObject_channels, new Map(), "f");
            }
            createChannel(name, method, priority) {
                if (!__classPrivateFieldGet(this, _SignalObject_channels, "f").has(name))
                    __classPrivateFieldGet(this, _SignalObject_channels, "f").set(name, []);
                const channel = __classPrivateFieldGet(this, _SignalObject_channels, "f").get(name);
                if (priority == undefined)
                    priority = channel.length;
                channel.splice(priority, 0, method);
            }
            createStaticChannel(name, method) {
                __classPrivateFieldGet(this, _SignalObject_channels, "f").set(name, [method]);
            }
            clearChannel(name) {
                __classPrivateFieldGet(this, _SignalObject_channels, "f").delete(name);
            }
            signal(name, options) {
                const channel = __classPrivateFieldGet(this, _SignalObject_channels, "f").get(name);
                if (!channel)
                    return;
                for (const method of channel)
                    method(options);
            }
        }
        _SignalObject_channels = new WeakMap();
        Object.SignalObject = SignalObject;
    })(Object = System.Object || (System.Object = {}));
})(System || (System = {}));
