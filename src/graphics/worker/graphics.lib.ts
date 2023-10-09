import { ShaderCompiler } from "./graphics.compiler.js";

export namespace GraphicsLib {

    export class Instance {

        gl: WebGLRenderingContext;
        shaders: Map<string, ShaderCompiler.ShaderPackage>

        constructor( canvas: OffscreenCanvas, options: any ) {
            this.gl = canvas.getContext('webgl', options);
        }

        activateShader( name ) {
            const shader = this.shaders.get(name);
            if( !shader ) return;
            this.gl.useProgram( shader.program );
            this.gl.enable( this.gl.BLEND );
            this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
            this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );
        }

        compile( name: string, vertex: string, fragment: string ) {
            const shader = ShaderCompiler.compile({ gl: this.gl, vertex: vertex, fragment: fragment });
            this.shaders.set( name, shader );
        }

        fill( r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
            this.gl.clearColor( r, g, b, a );
            this.gl.clear( this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT );
        }

    }

    export function createInstance( canvas: OffscreenCanvas , options: any ) {
        return new Instance( canvas, options );
    }

}
