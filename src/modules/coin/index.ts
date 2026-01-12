import {Container} from "pixi.js";
import {Facade} from "../../core/Facade";
import {CoinMediator} from "./CoinMediator";

export function registerCoinModule() {
    const container = new Container();
    window.app.stage.addChild(container);

    Facade.instance.registerMediator('CoinMediator', new CoinMediator(container));
}
