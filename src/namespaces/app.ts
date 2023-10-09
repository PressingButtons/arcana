export namespace App {

    export class SignalObject {

        #channels: Map<string, Array<Function>>
    
        constructor( ) {
            this.#channels = new Map( );
        }
    
        createChannel( name: string, method: Function, priority: number ) {
            if(!this.#channels.has( name )) this.#channels.set( name, [ ]);
            const channel = this.#channels.get( name );
            if( priority == undefined ) priority = channel.length;
            channel.splice( priority, 0, method );
        }
    
        createStaticChannel( name: string, method: Function ) {
            this.#channels.set(name, [method]);
        }
    
        clearChannel( name: string ) {
            this.#channels.delete( name );
        }
    
        signal( name: string, options: any ) {
            const channel = this.#channels.get(name);
            if(!channel) return;
            for( const method of channel )
                method( options );
        }
    
    }

}