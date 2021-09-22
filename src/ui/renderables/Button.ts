import { GenericMessage, Message, MessageBus } from '../../coms/MessageBus';
import { Style } from '../Style';
import {Renderable} from './Renderable';

export class Button implements Renderable{
    style: Style;
    messageBus: MessageBus;
    message: Message;
    innerText: string;

    render(): HTMLElement {
        let btn = document.createElement("button");
        btn.innerText = this.innerText;
        btn.addEventListener("click", () => this.messageBus.sendMessage(this.message));
        if(this.style){
            if (this.style.id) {
                btn.id = this.style.id;
            }
            if (this.style.class) {
                btn.className = this.style.class;
            }
        }
        return btn;
    }

}