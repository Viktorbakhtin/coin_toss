import {Facade} from '../../core/Facade';
import {UiMediator} from "./UiMediator";
import {Container} from "pixi.js";

export function registerUiModule() {
    const uiLayer = new Container();
    window.app.stage.addChild(uiLayer);

    Facade.instance.registerMediator('UiMediator', new UiMediator(uiLayer));
}
