import { ComponentBuilder } from './components.js';

class TerminalController {
    constructor() {}

    #onInputReceived(eventEmitter){
        return function (){
            const message = this.getValue();
            console.log(message);
            this.clearValue();
        }
    }
    async initializeTable(eventEmitter) {
        const components = new ComponentBuilder()
            .setScreen({ title: 'HackerChat - Vinicius'})
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .build()

        components.input.focus()
        components.screen.render();
    }
}

export { TerminalController };