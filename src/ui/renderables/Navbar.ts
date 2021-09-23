import { Renderable } from './Renderable'
import { Button } from './Button'
import { ChangePageMessage } from '../Ui';
import { Message, MessageBus, WaiterPriority } from '../../coms/MessageBus';
import { Style } from '../Style';


export class Navbar implements Renderable {

    style: Style;

    renderables: Renderable[] = [];

    appendRenderable(renderable: Renderable): void{
        this.renderables.push(renderable);
    }
    render(): HTMLElement {
        console.log("rendering page");
        let navbar = document.createElement("nav")

        this.renderables.forEach(function (renderable) {
            navbar.append(renderable.render());
        });

        if(this.style)
            this.style.styleElement(navbar);
        return navbar;
    }

}

export class NavbarButton extends Button {

    pageName: string;
    isActive: boolean;
    message: ChangePageMessage;
    messageBus: MessageBus;
    messageId: string

    constructor(pageName: string, message: ChangePageMessage, messageBus: MessageBus){
        super();
        this.pageName = pageName;
        this.message = message;
        this.messageBus = messageBus;
        this.messageId = pageName + "-NavbarButton";
        this.messageBus.addWaiter(this.message, this.messageId, WaiterPriority.high, (args: ChangePageMessage) => {
            if(args.pageName == this.pageName){
                console.log(this.pageName, "is active");
                this.isActive = true;
            }else{
                console.log(this.pageName, "is not active");
                this.isActive = false;
            }
        })
    }

    render(): HTMLElement {
        let button: HTMLElement = super.render();

        if(this.isActive)
            button.className = "active"
        if(this.style)
            this.style.styleElement(button);
        return button;
    }
}
