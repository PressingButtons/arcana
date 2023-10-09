import { App } from "./app.js";
import { Mathematics } from "./mathematics.js";

export namespace GameObject {

    export class BaseObject extends App.SignalObject {

        size: Mathematics.Size;
        position: Mathematics.Vector;

        constructor( width: number, height: number ) {
            super( );
            this.size = {width, height};
            this.position = {x: 0, y: 0, z: 0};
        }

        left( displacement: number = 0 ) {
            if( displacement != 0 ) this.position.x += displacement;
            return this.position.x - this.size.width * 0.5;
        }

        right ( displacement: number = 0 ) {
            if( displacement != 0 ) this.position.x += displacement;
            return this.position.x + this.size.width * 0.5;
        }

        top( displacement: number ) {
            if( displacement != 0 ) this.position.y += displacement;
            return this.position.y - this.size.height * 0.5;
        }

        bottom( displacement: number ) {
            if( displacement != 0 ) this.position.y += displacement;
            return this.position.y + this.size.height * 0.5;
        }

        pack( ) {
            return {
                position: this.position,
                size: this.size
            }
        }

    }

    export class DynamicObject extends BaseObject {

        rotation: Mathematics.Vector;
        velocity: Mathematics.Vector;
        body: Mathematics.Rectangle;

        constructor( width: number , height: number, bodySize: Mathematics.Size ) {
            super( width, height );
            this.velocity = { x: 0, y: 0, z: 0};
            this.body = new Mathematics.Rectangle(
                -bodySize.width * 0.5, -bodySize.height * 0.5,
                 bodySize.width * 0.5,  bodySize.height * 0.5
            );
        }

        left( interval: number, displacement: number = 0 ) {
            if( displacement != 0 ) this.position.x += displacement;
            return this.position.x + this.body.x1 * Math.cos( this.rotation.y ) + this.velocity.x * interval; 
        }

        right( interval: number, displacement: number = 0 ) {
            if( displacement != 0 ) this.position.x += displacement;
            return this.position.x + this.body.x2 * Math.cos( this.rotation.y ) + this.velocity.x * interval; 
        }

        top( interval: number, displacement: number = 0 ) {
            if( displacement != 0 ) this.position.y += displacement;
            return this.position.x + this.body.y1 + this.velocity.y * interval; 
        }

        bottom( interval: number, displacement: number = 0 ) {
            if( displacement != 0 ) this.position.y += displacement;
            return this.position.x + this.body.y2 + this.velocity.y * interval; 
        }

        pack( ) {
            return Object.assign( super.pack( ), {
                rotation: this.rotation,
                velocity: this.velocity,
                body: this.body.rect
            })
        }

    }

}