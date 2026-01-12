import { BaseMediator } from "../../core/BaseMediator";
import { Container } from "pixi.js";
import { HeadsButton } from "./HeadsButton";
import { TailsButton } from "./TailsButton";
import {isPortrait} from "../../main";

export class UiMediator extends BaseMediator<Container> {
    private buttonHeads!: HeadsButton;
    private buttonTails!: TailsButton;

    constructor(view: Container) {
        super(view);
    }

    register(): void {
        this.buttonHeads = new HeadsButton(0, 0);
        this.buttonTails = new TailsButton(0, 0);

        this.view.addChild(this.buttonHeads, this.buttonTails);

        this.applyLayout();

        window.events.on("layout_changed", this.applyLayout, this);
    }

    private applyLayout = () => {
        const cx = window.layout_width * 0.5;
        const cy = window.layout_height * 0.5;

        if (isPortrait()) {
            this.buttonHeads.position.set(cx - 155, cy + 120);
            this.buttonTails.position.set(cx + 155, cy + 120);
        } else {
            this.buttonHeads.position.set(cx - 150, cy + 260);
            this.buttonTails.position.set(cx + 150, cy + 260);
        }
    };

    unregister(): void {}
}
