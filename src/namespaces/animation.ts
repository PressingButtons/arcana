import { GameObject } from "./gameobject.js";

export namespace Animation {

    export interface AnimationSequence {
        frames: Array<AnimationFrame>;
        start: Array<string>;
        end: Array<string>
    }


    export interface AnimationFrame {
        index: number;
        duration: number;
        signal: Array<string>
        meta: any;
    }


    //components
    class Animator {

        time: number;
        index: number;
        animation: string;
        animations: Map<string, AnimationSequence>
        gameobject: GameObject.BaseObject;

        constructor( gameobject: GameObject.BaseObject ) {
            this.gameobject = gameobject;
            this.#createDefaultAnimation( );
            this.reset( );
        }

        #createDefaultAnimation( ) {
            this.setAnimation('default', {
                frames: [{index: 0, duration: 0, signal: [], meta: {}}],
                start: [],
                end: []
            })
        }

        #goto( name: string ) {
            this.animation = name;
            const animation: AnimationSequence = this.animations.get(name);
            this.reset( );
            this.#sendSignals( animation.start);
            this.#signalChange(animation);
        }

        #next( name: string, animation: AnimationSequence ) {
            this.time = 0;
            this.index ++;
            if( this.index > animation.frames.length - 1 ) this.#goto( name );
            this.#sendSignals( animation.frames[this.index].signal );
        }

        #progress( name: string , interval: number ) {
            this.time += interval;
            const animation = this.animations.get( name );
            if( this.time > animation.frames[this.index].duration ) 
                this.#next( name, animation );
        }

        #sendSignals( signals ) {
            signals.forEach( signal => this.gameobject.signal );
        }

        #signalChange( animation: AnimationSequence ) {
            this.gameobject.signal('frame-update', { index: animation.frames[this.index] })
        }

        reset( ) {
            this.index = 0; this.time = 0;
        }

        setAnimation( name: string, sequence: AnimationSequence ) {
            this.animations.set(name, sequence);
        }

        animate( name: string, interval: number ) {
            if( !this.animations.has(name) ) this.#goto( 'default' );
            else if( name != this.animation ) this.#goto( name );
            else this.#progress( name, interval );
        }

    }

}