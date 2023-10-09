import { App } from "./app.js";
import { Mathematics } from "./mathematics.js";
export var GameObject;
(function (GameObject) {
    class BaseObject extends App.SignalObject {
        constructor(width, height) {
            super();
            this.size = { width, height };
            this.position = { x: 0, y: 0, z: 0 };
        }
        left(displacement = 0) {
            if (displacement != 0)
                this.position.x += displacement;
            return this.position.x - this.size.width * 0.5;
        }
        right(displacement = 0) {
            if (displacement != 0)
                this.position.x += displacement;
            return this.position.x + this.size.width * 0.5;
        }
        top(displacement) {
            if (displacement != 0)
                this.position.y += displacement;
            return this.position.y - this.size.height * 0.5;
        }
        bottom(displacement) {
            if (displacement != 0)
                this.position.y += displacement;
            return this.position.y + this.size.height * 0.5;
        }
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
            this.body = new Mathematics.Rectangle(-bodySize.width * 0.5, -bodySize.height * 0.5, bodySize.width * 0.5, bodySize.height * 0.5);
        }
        left(interval, displacement = 0) {
            if (displacement != 0)
                this.position.x += displacement;
            return this.position.x + this.body.x1 * Math.cos(this.rotation.y) + this.velocity.x * interval;
        }
        right(interval, displacement = 0) {
            if (displacement != 0)
                this.position.x += displacement;
            return this.position.x + this.body.x2 * Math.cos(this.rotation.y) + this.velocity.x * interval;
        }
        top(interval, displacement = 0) {
            if (displacement != 0)
                this.position.y += displacement;
            return this.position.x + this.body.y1 + this.velocity.y * interval;
        }
        bottom(interval, displacement = 0) {
            if (displacement != 0)
                this.position.y += displacement;
            return this.position.x + this.body.y2 + this.velocity.y * interval;
        }
        pack() {
            return Object.assign(super.pack(), {
                rotation: this.rotation,
                velocity: this.velocity,
                body: this.body.rect
            });
        }
    }
    GameObject.DynamicObject = DynamicObject;
})(GameObject || (GameObject = {}));
