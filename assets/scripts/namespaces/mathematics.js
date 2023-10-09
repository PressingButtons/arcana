export var Mathematics;
(function (Mathematics) {
    class Rectangle {
        constructor(ax, ay, bx, by) {
            this.x1 = ax;
            this.y1 = ay;
            this.x2 = bx;
            this.y2 = by;
        }
        get width() {
            return this.bottomRight.x - this.topLeft.x;
        }
        get height() {
            return this.bottomRight.y - this.topLeft.y;
        }
        get topLeft() {
            return { x: this.x1, y: this.y1 };
        }
        get bottomRight() {
            return { x: this.x2, y: this.y2 };
        }
        get rect() {
            return {
                x1: this.x1,
                y1: this.y1,
                x2: this.x2,
                y2: this.y2
            };
        }
    }
    Mathematics.Rectangle = Rectangle;
})(Mathematics || (Mathematics = {}));
