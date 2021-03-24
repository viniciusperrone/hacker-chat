import { ComponentBuilder } from './components.js';

class TerminalController {
    #userColors = new Map();

    constructor() {}

    #pickCollor(){
        return `# ${((1 << 24  * Math.random() | 0).toString(16))}-fg`;
    }

    #getUserCollor(userName){
        if(this.#userColors.has(userName))
            return this.#userColors.get(userName);

        const collor = this.#pickCollor();

        this.#userColors.set(userName, collor);
    }

    #onInputReceived(eventEmitter){
        return function (){
            const message = this.getValue();
            console.log(message);
            this.clearValue();
        }
    }

    #onMessageReceived({ screen, chat }){
        return msg => {
            const { userName, message } = msg;

            const collor = this.#getUserCollor(userName);

            chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`);
            screen.render();


        }
    }

    #onLogChanged({ screen, activityLog }){
        return msg => {
            
            const { userName } = msg.split(/\s/);
            
            const collor = this.#getUserCollor(userName);

            activityLog.addItem(`{${collor}}{bold}${msg.toString()}{/}`);
        
        }
    }

    #registerEvents(eventEmitter, components){
        eventEmitter.on('message:received', this.#onMessageReceived(components));
        eventEmitter.on('activity:updated', this.#onLogChanged(components));
        // eventEmitter.on('activity:updated', this.#onLogChanged(components));

    }
    async initializeTable(eventEmitter) {
        const components = new ComponentBuilder()
            .setScreen({ title: 'HackerChat - Vinicius'})
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .setActivityLogComponent()
            .setStatusComponent()
            .build();

        this.#registerEvents(eventEmitter, components);


        components.input.focus();
        components.screen.render();
    }
}

export { TerminalController };