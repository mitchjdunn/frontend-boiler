import { Page } from './renderables/Page'
import { Renderable } from './renderables/Renderable'
import { MessageBus, Message, GenericMessage } from '../coms/MessageBus';
import { Style } from './Style';

export class Ui implements Renderable {

    // used to switch between page by editing the document element under this id
    readonly PAGE_ELEMENT_ID : string = "page";

    pages: {[id: string] : Page}[] = [];
    activePageId : string = null;

    messageBus: MessageBus;
    message: Message;

    constructor(messageBus: MessageBus){
        this.messageBus=messageBus;
        this.messageBus.addWaiter(new GenericMessage("ChangePage"), "UI", (args: {pageName: string}) => 
        {
            console.log("executing Change Page for UI");
            this.setActivePage(args.pageName);
            this.render();
        }
        );
    }
    style: Style;

    
   appendPage(page: Page): void {
        this.pages[page.pageId] = page;
       if(this.activePageId == null){
            this.activePageId = page.pageId;
       }
    }
    
    setActivePage(pageId){
        this.activePageId = pageId;
    }

    render(): HTMLElement {
        console.log("rendering", this.activePageId);

        let page = document.getElementById(this.PAGE_ELEMENT_ID);
        console.log(page);
        if(page != null){
            document.body.removeChild(page);
        }
        page = document.createElement("div");
        page.id = this.PAGE_ELEMENT_ID;
        // page.innerHTML = this.pages[this.activePageId].render();
        page.append(this.pages[this.activePageId].render());
        document.body.append(page);

        return document.body;
    }
}

export class ChangePageMessage implements Message{
    messageName: string = "ChangePage";
    pageName: string;
    constructor(pageName: string){
        this.pageName=pageName;
    }
    setArgs(args: {pageName: string}): void {
        this.pageName = args.pageName;
    }
    getArgs(): {} {
        return {pageName: this.pageName};
    }
    validateArgs(args: {pageName: string}): boolean {
        if(args.pageName)
            return true;
        return false;
    }

}
