const q = require("jquery")
require("./renderable.ts")

module.exports = {

    ViewTs ($view, renderables){
        $view.children.detach()
        $view.append(renderables[0].render) ;
    }

}
