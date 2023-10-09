import { Messenger } from "../../classes/messenger.js";
import { GraphicsLib } from "./graphics.lib.js";
let g;
Messenger.setRoute('canvas', message => {
    console.log('Initializing graphics library...');
    g = GraphicsLib.createInstance(message.canvas, message.options);
    // setting routes 
    Messenger.setRoute('compile', message => {
        g.compile(message.name, message.vertex, message.fragment);
    });
    Messenger.setRoute('fill', (message) => {
        g.fill(...message);
    });
});
