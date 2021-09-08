import {Renderable} from "./renderable"

class div implements Renderable {

    render(): Node {
        let div = document.createElement("div");
        div.innerHTML = "Hello World";

        return div;

    }

}