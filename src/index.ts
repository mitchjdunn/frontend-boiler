import {Ui, ChangePageMessage} from './ui/Ui';
import {Div} from './ui/renderables/Div';
import { Page } from './ui/renderables/Page';
import { GenericMessage, GenericMessageBus } from './coms/MessageBus';
import { Button } from './ui/renderables/Button';

console.log("hello console")

let messageBus: GenericMessageBus = new GenericMessageBus();
messageBus.setDebug(true);
let ui: Ui = new Ui(messageBus);

let div :Div = new Div();

let homebtn: Button = new Button();
let page2btn: Button = new Button();

homebtn.innerText = 'Home';
page2btn.innerText= 'Page2';

homebtn.message = new ChangePageMessage("page2");
page2btn.message = new ChangePageMessage("home");
homebtn.messageBus = messageBus;
page2btn.messageBus = messageBus;

let homePage: Page = new Page("home");
let page2 : Page = new Page("page2")

homePage.appendRenderable(homebtn);
page2.appendRenderable(page2btn);

ui.appendPage(homePage);
ui.appendPage(page2);

ui.render();
