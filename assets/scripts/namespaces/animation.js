var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
export var Animation;
(function (Animation) {
    var _Animator_instances, _Animator_createDefaultAnimation, _Animator_goto, _Animator_next, _Animator_progress, _Animator_sendSignals, _Animator_signalChange;
    //components
    class Animator {
        constructor(gameobject) {
            _Animator_instances.add(this);
            this.gameobject = gameobject;
            __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_createDefaultAnimation).call(this);
            this.reset();
        }
        reset() {
            this.index = 0;
            this.time = 0;
        }
        setAnimation(name, sequence) {
            this.animations.set(name, sequence);
        }
        animate(name, interval) {
            if (!this.animations.has(name))
                __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_goto).call(this, 'default');
            else if (name != this.animation)
                __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_goto).call(this, name);
            else
                __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_progress).call(this, name, interval);
        }
    }
    _Animator_instances = new WeakSet(), _Animator_createDefaultAnimation = function _Animator_createDefaultAnimation() {
        this.setAnimation('default', {
            frames: [{ index: 0, duration: 0, signal: [], meta: {} }],
            start: [],
            end: []
        });
    }, _Animator_goto = function _Animator_goto(name) {
        this.animation = name;
        const animation = this.animations.get(name);
        this.reset();
        __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_sendSignals).call(this, animation.start);
        __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_signalChange).call(this, animation);
    }, _Animator_next = function _Animator_next(name, animation) {
        this.time = 0;
        this.index++;
        if (this.index > animation.frames.length - 1)
            __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_goto).call(this, name);
        __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_sendSignals).call(this, animation.frames[this.index].signal);
    }, _Animator_progress = function _Animator_progress(name, interval) {
        this.time += interval;
        const animation = this.animations.get(name);
        if (this.time > animation.frames[this.index].duration)
            __classPrivateFieldGet(this, _Animator_instances, "m", _Animator_next).call(this, name, animation);
    }, _Animator_sendSignals = function _Animator_sendSignals(signals) {
        signals.forEach(signal => this.gameobject.signal);
    }, _Animator_signalChange = function _Animator_signalChange(animation) {
        this.gameobject.signal('frame-update', { index: animation.frames[this.index] });
    };
})(Animation || (Animation = {}));
