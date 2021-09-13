import {Ui} from './ui/Ui';
import {Div} from './ui/renderables/Div';

console.log("hello console")

let ui: Ui = new Ui();

let div :Div = new Div();
let div2 :Div = new Div();

ui.appendRenderable(div);
ui.appendRenderable(div2);


document.body = ui.render();