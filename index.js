console.log('Hello world!');

const canvas = document.getElementById('webgl');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

const context = canvas.getContext('webgl', { antialias: true });

const program = initShaders(context);

const a_Position = context.getAttribLocation(program, 'a_Position');
const u_FragColor = context.getUniformLocation(program, 'u_FragColor');

const grid = [
    -1, -1, 1, -1,
    -1, -0.9, 1, -0.9,
    -1, -0.8, 1, -0.8,
    -1, -0.7, 1, -0.7,
    -1, -0.6, 1, -0.6,
    -1, -0.5, 1, -0.5,
    -1, -0.4, 1, -0.4,
    -1, -0.3, 1, -0.3,
    -1, -0.2, 1, -0.2,
    -1, -0.1, 1, -0.1,
    -1, 0, 1, 0,
    -1, 0.1, 1, 0.1,
    -1, 0.2, 1, 0.2,
    -1, 0.3, 1, 0.3,
    -1, 0.4, 1, 0.4,
    -1, 0.5, 1, 0.5,
    -1, 0.6, 1, 0.6,
    -1, 0.7, 1, 0.7,
    -1, 0.8, 1, 0.8,
    -1, 0.9, 1, 0.9,
    -1, 1, 1, 1,

    -0.9, 1, -0.9, -1,
    -0.8, 1, -0.8, -1,
    -0.7, 1, -0.7, -1,
    -0.6, 1, -0.6, -1,
    -0.5, 1, -0.5, -1,
    -0.4, 1, -0.4, -1,
    -0.3, 1, -0.3, -1,
    -0.2, 1, -0.2, -1,
    -0.1, 1, -0.1, -1,
    0, 1, 0, -1,
    0.1, 1, 0.1, -1,
    0.2, 1, 0.2, -1,
    0.3, 1, 0.3, -1,
    0.4, 1, 0.4, -1,
    0.5, 1, 0.5, -1,
    0.6, 1, 0.6, -1,
    0.7, 1, 0.7, -1,
    0.8, 1, 0.8, -1,
    0.9, 1, 0.9, -1,
    1, 1, 1, -1,
];

let vertices = [
    0.0, 0.0,
    0.75, 0.75
];

vertices.unshift(...grid);



const n = 3;

const vertexBuffer = context.createBuffer();

let tx = 0;
let ty = 0;
let tz = 0;

const aspectRatio = canvas.width / canvas.height;

console.log('aspect ratio is', aspectRatio);

const scaleMatrix = new Float32Array([
    1 / aspectRatio, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

const u_Translation = context.getUniformLocation(program, 'u_Translation');
const u_aspectRadio = context.getUniformLocation(program, 'u_aspectRatio');
const u_scaleMatrix = context.getUniformLocation(program, 'u_scaleMatrix');

let homogeneousCoordinate = 0.0;

context.uniform4f(u_Translation, tx, ty, tz, homogeneousCoordinate);
context.uniformMatrix4fv(u_scaleMatrix, false, scaleMatrix);

context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);

context.vertexAttribPointer(a_Position, 2, context.FLOAT, false, 0, 0);
context.enableVertexAttribArray(a_Position);

context.clearColor(0.2, 0.2, 0.2, 1.0);
context.clear(context.COLOR_BUFFER_BIT);

const draw = () => {
    context.clear(context.COLOR_BUFFER_BIT);
    if (vertices.length >= 2) {
        context.drawArrays(context.LINES, 0, vertices.length / 2);
    }
};

// window.onkeyup = event => {
//     console.log(event);
//     if (event.key === 'ArrowUp') {
//         ty += 0.1;
//     } else if (event.key === 'ArrowDown') {
//         ty -= 0.1;
//     } else if (event.key === 'ArrowLeft') {
//         tx -= 0.1;
//     } else if (event.key === 'ArrowRight') {
//         tx += 0.1;
//     }

//     context.uniform4f(u_Translation, tx, ty, tz, homogeneousCoordinate);
//     draw();
// };

// window.onwheel = event => {
//     if (event.deltaY > 0) {
//         homogeneousCoordinate += 0.1;
//     } else {
//         homogeneousCoordinate -= 0.1;
//     }

//     context.uniform4f(u_Translation, tx, ty, tz, homogeneousCoordinate);
//     draw();
// };

console.log('offset left', canvas.offsetLeft);
console.log('offset height', canvas.offsetHeight);
console.log('offset parent', canvas.offsetParent);
console.log('offset top', canvas.offsetTop);
console.log('offset width', canvas.offsetWidth);

const quadrantWidth = canvas.width / 2;
const quadrantHeight = canvas.height / 2;

window.onclick = event => {
    const dx = event.x - canvas.offsetLeft - quadrantWidth;
    const dy = event.y - canvas.offsetTop - quadrantHeight;

    const x = dx / quadrantWidth; 
    const y = - dy / quadrantHeight;

    vertices.push(x, y);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
    draw();
};

canvas.onmousemove = event => {
    const dx = event.x - canvas.offsetLeft - quadrantWidth;
    const dy = event.y - canvas.offsetTop - quadrantHeight;

    const x = dx / quadrantWidth; 
    const y = - dy / quadrantHeight;

    vertices[vertices.length - 2] = x;
    vertices[vertices.length - 1] = y;
     
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
    draw();
};

draw();
