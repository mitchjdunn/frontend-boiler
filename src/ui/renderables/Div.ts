import { getDefaultLibFileName } from "typescript";
import { Style } from "../Style";
import {Renderable} from "./Renderable"

export class Div implements Renderable {

    innerText: string;
    style: Style;

    constructor (innerText: string){
        this.innerText = innerText;
    }

    render(): Node {
        console.log("rendering div")
        let div = document.createElement("div");
        div.innerHTML = document.createElement("p").innerText = this.innerText;

        if(this.style)
            this.style.styleElement(div);
        return div;

    }

}