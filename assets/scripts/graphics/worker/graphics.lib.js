import { ShaderCompiler } from "./graphics.compiler.js";
export var GraphicsLib;
(function (GraphicsLib) {
    class Instance {
        constructor(canvas, options) {
            this.gl = canvas.getContext('webgl', options);
        }
        activateShader(name) {
            const shader = this.shaders.get(name);
            if (!shader)
                return;
            this.gl.useProgram(shader.program);
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        }
        compile(name, vertex, fragment) {
            const shader = ShaderCompiler.compile({ gl: this.gl, vertex: vertex, fragment: fragment });
            this.shaders.set(name, shader);
        }
        fill(r = 0, g = 0, b = 0, a = 1) {
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
        }
    }
    GraphicsLib.Instance = Instance;
    function createInstance(canvas, options) {
        return new Instance(canvas, options);
    }
    GraphicsLib.createInstance = createInstance;
})(GraphicsLib || (GraphicsLib = {}));
