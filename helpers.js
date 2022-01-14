const vertexShaderSource = `
    attribute vec4 a_Position;
    uniform vec4 u_Translation;

    void main() {
        gl_Position = a_Position + u_Translation;
        gl_PointSize = 50.0;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 u_FragColor;

    void main() {
        gl_FragColor = u_FragColor;
    }
`;

const initVertexShader = ({ context, program }) => {
    const vertexShader = context.createShader(context.VERTEX_SHADER);

    context.shaderSource(vertexShader, vertexShaderSource);
    context.compileShader(vertexShader);
    context.attachShader(program, vertexShader);
};

const initFragmentShader = ({ context, program }) => {
    const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragmentShaderSource);
    context.compileShader(fragmentShader);
    context.attachShader(program, fragmentShader);
};

const initShaders = context => {
    const program = context.createProgram();

    initVertexShader({ context, program });
    initFragmentShader({ context, program });

    context.linkProgram(program);

    const linkStatus = context.getProgramParameter(program, context.LINK_STATUS);

    console.log(linkStatus);

    context.useProgram(program);

    return program;
};