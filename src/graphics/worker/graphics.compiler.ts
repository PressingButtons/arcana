export namespace ShaderCompiler {

    export interface ShaderRequest {
        gl: WebGLRenderingContext | null,
        vertex: string,
        fragment: string
    }

    export interface ShaderPackage {
        program: WebGLProgram,
        uniforms: Map<string, WebGLUniformLocation | null>
        attributes: Map<string, Number>
    }

    export function compile( s: ShaderRequest ) {
        try {
            if(!s.gl) throw 'Error - no webgl context available to compile shader';
            const vertexShader = createShader( s.gl, s.vertex, "VERTEX_SHADER" );
            const fragmentShader = createShader( s.gl, s.fragment, "FRAGMENT_SHADER" );
            const program = createProgram( s.gl, vertexShader, fragmentShader );
            return packageProgram( s.gl, program, s.vertex, s.fragment );
        } catch( err ) {
            throw err;
        }
    }

    const createShader = function( gl: WebGLRenderingContext, srcCode: string, type: string ) {
        const shader = gl.createShader(gl[type]);
        if(!shader) throw `Error - could not create shader type[${type}].`;
        gl.shaderSource( shader, srcCode );
        gl.compileShader( shader );
        if( gl.getShaderParameter( shader, gl.COMPILE_STATUS ))
            return shader;
        const err = gl.getShaderInfoLog( shader );
        gl.deleteShader( shader );
        throw err;
    }

    const createProgram = function( gl: WebGLRenderingContext, vertex: WebGLShader, fragment: WebGLShader ) {
        const program = gl.createProgram( );
        if( !program ) throw 'Error - could not create shader program.';
        gl.attachShader( program, vertex );
        gl.attachShader( program, fragment );
        gl.linkProgram( program);
        if( gl.getProgramParameter( program, gl.LINK_STATUS )) return program;
        const err = gl.getProgramInfoLog( program );
        gl.deleteProgram( program );
        throw err;
    }

    const packageProgram = function( gl: WebGLRenderingContext, program: WebGLProgram, vertex: string, fragment: string ) {
        return {
            program: program,
            attributes: extractAttributes( gl, program, vertex, fragment ),
            uniforms: extractUniforms( gl, program, vertex, fragment )
        }
    }

    const extractAttributes = function( gl: WebGLRenderingContext, program: WebGLProgram, vertex: string, fragment: string  ) {
        const extracted = new Set<string>( );
        const attributes = new Map<string, Number>( )
        for(const match of extractParameter(vertex, 'attributes')) 
            extracted.add( match );
        for(const match of extractParameter(fragment, 'attributes'))
            extracted.add( match ); 
        for(const attribute of Array.from(extracted)) {
            attributes.set(attribute, gl.getAttribLocation( program, attribute ));
        }   
        return attributes;
    }

    const extractUniforms = function( gl: WebGLRenderingContext, program: WebGLProgram, vertex: string, fragment: string  ) {
        const extracted = new Set<string>( );
        const uniforms = new Map<string, WebGLUniformLocation | null>( );
        for(const match of extractParameter(vertex, 'uniform')) 
            extracted.add( match );
        for(const match of extractParameter(fragment, 'uniform'))
            extracted.add( match ); 
        for(const uniform of Array.from(extracted)) {
            uniforms.set(uniform, gl.getUniformLocation( program, uniform ));
        }   
        return uniforms;
    }

    const extractParameter = function( srcCode: string, parameter: string) {
        const regex = new RegExp(`(?<=${parameter} ).*`, 'g');
        const matches = srcCode.match( regex );
        return matches ? matches.map( x => x.substring( x.lastIndexOf(' ') + 1, x.length - 1)) : []
    }

}