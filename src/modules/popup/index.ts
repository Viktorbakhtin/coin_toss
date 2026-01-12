import {Container} from "pixi.js";
import {Facade} from "../../core/Facade";
import {PopupMediator} from "./PopupMediator";

export function registerPopupModule() {
    const container = new Container();
    window.app.stage.addChild(container);

    Facade.instance.registerMediator('PopupMediator', new PopupMediator(container));
}
