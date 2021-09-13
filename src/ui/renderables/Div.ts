import {Renderable} from "./Renderable"

export class Div implements Renderable {

    render(): Node {
        console.log("rendering div")
        let div = document.createElement("div");
        div.innerHTML = document.createElement("p").innerText ="Hello World";

        return div;

    }

}