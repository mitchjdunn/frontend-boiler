import { GenericMessage, Message, MessageBus } from '../../coms/MessageBus';
import {Renderable} from './Renderable';

export class Button implements Renderable{
    messageBus: MessageBus;
    message: Message;
    innerText: string;
    class: string;

    render(): HTMLElement {
        let btn = document.createElement("button");
        btn.innerText = this.innerText;
        btn.addEventListener("click", () => this.messageBus.sendMessage(this.message));
        return btn;
    }

}