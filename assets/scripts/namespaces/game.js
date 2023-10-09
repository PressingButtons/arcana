import { App } from "./app";
export var GameObject;
(function (GameObject) {
    class BaseObject extends App.SignalObject {
        constructor(width, height) {
            super();
            this.size = { width, height };
            this.position = { x: 0, y: 0, z: 0 };
        }
        get left() { return this.position.x - this.size.width * 0.5; }
        set left(n) { this.position.x = n + this.size.width * 0.5; }
        get right() { return this.position.x + this.size.width * 0.5; }
        set right(n) { this.position.x = n - this.size.width * 0.5; }
        get top() { return this.position.y - this.size.height * 0.5; }
        set top(n) { this.position.y = n + this.size.height * 0.5; }
        get bottom() { return this.position.y + this.size.height * 0.5; }
        set bottom(n) { this.position.y = n - this.size.height * 0.5; }
        pack() {
            return {
                position: this.position,
                size: this.size
            };
        }
    }
    GameObject.BaseObject = BaseObject;
    class DynamicObject extends BaseObject {
        constructor(width, height, bodySize) {
            super(width, height);
            this.velocity = { x: 0, y: 0, z: 0 };
            this.body = {
                p1: { x: -bodySize.width * 0.5, y: -bodySize.height * 0.5 },
                p2: { x: bodySize.width * 0.5, y: bodySize.height * 0.5 }
            };
        }
        get left() { return this.position.x + this.body.p1.x; }
        set left(n) { this.position.x = n - this.body.p1.x; }
        get right() { return this.position.x + this.body.x + this.body.size.width * 0.5; }
        set right(n) { this.position.x = n - this.body.size.width * 0.5; }
        get top() { return this.position.y + this.body.y - this.body.size.height * 0.5; }
        set top(n) { this.position.y = n + this.body.y + this.body.size.height * 0.5; }
        get bottom() { return this.position.y + this.size.height * 0.5; }
        set bottom(n) { this.position.y = n - this.size.height * 0.5; }
    }
    GameObject.DynamicObject = DynamicObject;
})(GameObject || (GameObject = {}));
