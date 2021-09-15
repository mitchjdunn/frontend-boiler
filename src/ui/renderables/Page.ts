import {Renderable} from "./Renderable"

export class Page implements Renderable {

    renderables: Renderable[] = [];
    pageId: string = null;

    constructor(pageId: string){
        this.pageId = pageId;
    }

    appendRenderable(component: Renderable): void {
        this.renderables.push(component);
    }

    render(): HTMLElement {
        console.log("rendering page");
        let page = document.createElement("div")
        this.renderables.forEach(function (renderable) {
            page.append(renderable.render());
        });
        
        return page;
    }
}
