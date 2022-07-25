const canvas = document.querySelector('Canvas');
const gl = canvas.getContext('webgl');

if (!gl) 
{
throw new Error('WebGL not supported');
}

alert('WebGL ok');
