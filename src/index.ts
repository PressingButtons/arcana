import { Graphics } from "./graphics/graphics.js";

//testing graphics 
const g = new Graphics( );

window.onload = async event => {
    await g.bindCanvas(document.getElementById('game') as HTMLCanvasElement);
    let color = [0, 0, 0.2, 1];
    g.fill(color);
}