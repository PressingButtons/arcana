export var DisplayObject;
(function (DisplayObject) {
    class Sprite {
        constructor(texture, size, shader = "sprite") {
            this.size = size;
            this.position = { x: 0, y: 0 };
            this.shader = shader;
            this.texture = texture;
        }
        get rect() {
            return {
                x1: this.position.x,
                y1: this.position.y,
                x2: this.position.x + this.size.width,
                y2: this.position.y + this.size.height
            };
        }
        get displayData() {
            return {
                rect: this.rect,
                shader: this.shader,
                texture: this.texture,
                palette: this.palette || null
            };
        }
    }
    DisplayObject.Sprite = Sprite;
})(DisplayObject || (DisplayObject = {}));
