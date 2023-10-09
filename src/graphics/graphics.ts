import { WorkerModule } from "../classes/workerModule.js";

export class Graphics extends WorkerModule {

    constructor( ) {
        super(new URL('./worker/graphics.main.js', import.meta.url));
    }

    bindCanvas( canvas: HTMLCanvasElement, options: any = { premultipliedAlpha: false } ) {
        const offscreen = canvas.transferControlToOffscreen( );
        return this.send('canvas', { canvas: offscreen, options: options }, [offscreen]);
    }

    fill( color: Array<number> ) {
        this.send('fill', color);
    }

}