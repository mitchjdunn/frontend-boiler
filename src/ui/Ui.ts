import { Renderable } from './renderables/Renderable'


export class Ui implements Renderable {

    renderables: Renderable[] = [];

   appendRenderable(component: Renderable): void {
        this.renderables.push(component);
    }

    render(): HTMLElement {
        console.log("rendering ui");
        this.renderables.forEach(function (renderable) {
            document.body.append(renderable.render());
        });
        
        return document.body;
    }
}
