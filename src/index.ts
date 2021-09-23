import {Ui, ChangePageMessage} from './ui/Ui';
import {Div} from './ui/renderables/Div';
import { Page } from './ui/renderables/Page';
import { GenericMessage, GenericMessageBus } from './coms/MessageBus';
import { Button } from './ui/renderables/Button';
import { Navbar, NavbarButton } from './ui/renderables/Navbar';

console.log("hello console")

let messageBus: GenericMessageBus = new GenericMessageBus();
messageBus.setDebug(true);
let ui: Ui = new Ui(messageBus);

let div :Div = new Div("homepage");
let div2 :Div = new Div("page2");

let navBar: Navbar = new Navbar();

let homebtn: NavbarButton = new NavbarButton("home", new ChangePageMessage("home"), messageBus);
let page2btn: NavbarButton = new NavbarButton("page2", new ChangePageMessage("page2"), messageBus);

homebtn.innerText = 'Home';
page2btn.innerText= 'Page2';

homebtn.messageBus = messageBus;
page2btn.messageBus = messageBus;

let homePage: Page = new Page("home");
let page2 : Page = new Page("page2")

navBar.appendRenderable(homebtn);
navBar.appendRenderable(page2btn);

homePage.appendRenderable(navBar);
homePage.appendRenderable(div);
page2.appendRenderable(navBar);
page2.appendRenderable(div2);

ui.appendPage(homePage);
ui.appendPage(page2);

messageBus.sendMessage(new ChangePageMessage("home"));
