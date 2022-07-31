// get html canvas
const canvas = document.querySelector('Canvas');
const gl = canvas.getContext('webgl');

// check for WebGL support
if (!gl) 
{
throw new Error('WebGL not supported');
}

const matrix = glMatrix.mat4.create();
console.log(matrix);

// create attribute data
const vertexData = [
	0, 1, 0, 
	1, -1, 0,
	-1, -1, 0
]

const colorData = [
	1, 0, 0,
	0, 1, 0,
	0, 0, 1
]

// load vertex data into buffer

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

// create vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
precision mediump float;
attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;
void main() 
{
	vColor = color;
	gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);

// create fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
precision mediump float;

varying vec3 vColor;
void main()
{
	gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(fragmentShader);

// attach shaders to program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// enable vertex attribute
const positionLocation = gl.getAttribLocation(program, `position`);

gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);

gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);


// draw
gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
