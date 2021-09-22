import { Style } from "../Style";
import { Renderable } from "./Renderable";

export class Page implements Renderable {

    renderables: Renderable[] = [];
    pageId: string = null;
    style: Style;

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
        if(this.style){
            this.style.styleElement(page);
        }
        return page;
    }
}
