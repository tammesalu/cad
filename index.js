console.log('Hello world!');

const canvas = document.getElementById('webgl');

console.log(canvas);

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const context = canvas.getContext('webgl', { antialias: true });

const program = initShaders(context);

const a_Position = context.getAttribLocation(program, 'a_Position');
const u_FragColor = context.getUniformLocation(program, 'u_FragColor');

const vertices = new Float32Array([
    0.0, 0.25,
    -0.25, -0.25,
    0.25, -0.25
]);

const n = 3;

const vertexBuffer = context.createBuffer();

let tx = 0.5;
let ty = 0.5;
let tz = 0.5;

const u_Translation = context.getUniformLocation(program, 'u_Translation');

let homogeneousCoordinate = 0.0;

context.uniform4f(u_Translation, tx, ty, tz, homogeneousCoordinate);

context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
context.bufferData(context.ARRAY_BUFFER, vertices, context.STATIC_DRAW);

context.vertexAttribPointer(a_Position, 2, context.FLOAT, false, 0, 0);
context.enableVertexAttribArray(a_Position);

context.clearColor(0.0, 0.0, 0.0, 1.0);
context.clear(context.COLOR_BUFFER_BIT);

const draw = () => {
    context.clear(context.COLOR_BUFFER_BIT);
    context.drawArrays(context.TRIANGLES, 0, n);
};

window.onkeyup = event => {
    console.log(event);
    if (event.key === 'ArrowUp') {
        ty += 0.1;
    } else if (event.key === 'ArrowDown') {
        ty -= 0.1;
    } else if (event.key === 'ArrowLeft') {
        tx -= 0.1;
    } else if (event.key === 'ArrowRight') {
        tx += 0.1;
    }

    context.uniform4f(u_Translation, tx, ty, tz, homogeneousCoordinate);
    draw();
};

window.onwheel = event => {
    if (event.deltaY > 0) {
        homogeneousCoordinate += 0.1;
    } else {
        homogeneousCoordinate -= 0.1;
    }

    context.uniform4f(u_Translation, tx, ty, tz, homogeneousCoordinate);
    draw();
};


draw();
