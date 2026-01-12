import {Container} from "pixi.js";
import {BaseMediator} from "../../core/BaseMediator";
import {Popup} from "./Popup";
import {isPortrait} from "../../main";

export class PopupMediator extends BaseMediator<Container> {
    private popup!: Popup;

    constructor(view: Container) {
        super(view);
    }

    register(): void {
        this.popup = new Popup();
        this.view.addChild(this.popup);

        this.applyLayout();

        window.events.on("layout_changed", this.applyLayout, this);
        window.events.on("ROUND_RESULT", this.onRoundResult, this);
    }

    private applyLayout = () => {
        const cx = window.layout_width * 0.5;
        const cy = window.layout_height * 0.5;

        if (isPortrait()) {
            this.popup.position.set(cx, cy - 300);
        } else {
            this.popup.position.set(cx, cy - 70);
        }
    };

    private onRoundResult = async (winResult: boolean, callback: () => void) => {
        await this.popup.show(winResult);
        callback?.();
    };

    unregister(): void {
    }
}
