import Events from 'events';
import { TerminalController } from './src/terminalController.js';

const componentEmitter = new Events();

const controller = new TerminalController();

async function Started(){
    return await controller.initializeTable(componentEmitter);
}

Started();
