export namespace Mathematics {

    export interface Point {
        x: number; y: number;
    }

    export interface Size {
        width: number; height: number;
    }

    export interface Vector extends Point {
        z: number;
    }

    export interface Rect {
        x1:number; y1:number; x2:number; y2:number;
    }

    export class Rectangle {

        x1: number; y1: number;
        x2: number; y2: number;
        vector: Vector; 

        constructor( ax: number, ay: number, bx: number, by: number ) {
            this.x1 = ax;
            this.y1 = ay;
            this.x2 = bx;
            this.y2 = by;
        }

        get width( ) {
            return this.bottomRight.x - this.topLeft.x;
        }

        get height( ) {
            return this.bottomRight.y - this.topLeft.y;
        }

        get topLeft( ): Point {
            return { x: this.x1, y: this.y1 }
        }

        get bottomRight( ): Point {
            return {x: this.x2, y: this.y2 }
        }

        get rect( ):Rect {
            return {
                x1: this.x1, 
                y1: this.y1, 
                x2: this.x2, 
                y2: this.y2
            }
        }

    }

}