import blessed from 'blessed';

class ComponentBuilder{     
    #screen
    #layout
    #input

    constructor(){}

    #baseComponent(){
        return {
            border: 'line',
            mouse: true,
            top: 0,
            scrollboar: {
                ch: ' ',
                inverse: true
            },
            tags: true
        }
    }

    setScreen({ title }){
        this.#screen = blessed.screen({
            smartCSR: true,
            title: title
        });

        this.#screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
        return this
    }

    setLayoutComponent(){
        this.#layout= blessed.layout({
            parent: this.#screen,
            width: '100%',
            height: '100%'
        });

        return this;
    }

    setInputComponent(onEnterPressed){
        const input = blessed.textarea({
            parent: this.#screen,
            bottom: 0,
            height: '10%',
            inputOnFocus: true,
            padding: {
                top: 1,
                left: 2
            },
            style: {
                fg: '#f6f6f6',
                bg: '#353535'
            }
        })

        input.key('enter', onEnterPressed);
        this.#input = input;

        return this;
    }

    build(){
        const components = {
            screen: this.#screen,
            input: this.#input
        }

        return components;
    }
}   

export { ComponentBuilder }