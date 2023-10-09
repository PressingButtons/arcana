export var ShaderCompiler;
(function (ShaderCompiler) {
    function compile(s) {
        try {
            if (!s.gl)
                throw 'Error - no webgl context available to compile shader';
            const vertexShader = createShader(s.gl, s.vertex, "VERTEX_SHADER");
            const fragmentShader = createShader(s.gl, s.fragment, "FRAGMENT_SHADER");
            const program = createProgram(s.gl, vertexShader, fragmentShader);
            return packageProgram(s.gl, program, s.vertex, s.fragment);
        }
        catch (err) {
            throw err;
        }
    }
    ShaderCompiler.compile = compile;
    const createShader = function (gl, srcCode, type) {
        const shader = gl.createShader(gl[type]);
        if (!shader)
            throw `Error - could not create shader type[${type}].`;
        gl.shaderSource(shader, srcCode);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS))
            return shader;
        const err = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw err;
    };
    const createProgram = function (gl, vertex, fragment) {
        const program = gl.createProgram();
        if (!program)
            throw 'Error - could not create shader program.';
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS))
            return program;
        const err = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw err;
    };
    const packageProgram = function (gl, program, vertex, fragment) {
        return {
            program: program,
            attributes: extractAttributes(gl, program, vertex, fragment),
            uniforms: extractUniforms(gl, program, vertex, fragment)
        };
    };
    const extractAttributes = function (gl, program, vertex, fragment) {
        const extracted = new Set();
        const attributes = new Map();
        for (const match of extractParameter(vertex, 'attributes'))
            extracted.add(match);
        for (const match of extractParameter(fragment, 'attributes'))
            extracted.add(match);
        for (const attribute of Array.from(extracted)) {
            attributes.set(attribute, gl.getAttribLocation(program, attribute));
        }
        return attributes;
    };
    const extractUniforms = function (gl, program, vertex, fragment) {
        const extracted = new Set();
        const uniforms = new Map();
        for (const match of extractParameter(vertex, 'uniform'))
            extracted.add(match);
        for (const match of extractParameter(fragment, 'uniform'))
            extracted.add(match);
        for (const uniform of Array.from(extracted)) {
            uniforms.set(uniform, gl.getUniformLocation(program, uniform));
        }
        return uniforms;
    };
    const extractParameter = function (srcCode, parameter) {
        const regex = new RegExp(`(?<=${parameter} ).*`, 'g');
        const matches = srcCode.match(regex);
        return matches ? matches.map(x => x.substring(x.lastIndexOf(' ') + 1, x.length - 1)) : [];
    };
})(ShaderCompiler || (ShaderCompiler = {}));
