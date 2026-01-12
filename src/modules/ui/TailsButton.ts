import {BaseButton} from "../../core/BaseButton";
import {GameConfigLoader} from "../../core/GameConfigLoader";

export class TailsButton extends BaseButton {
    constructor(x: number, y: number) {
        super(
            GameConfigLoader.getTexture("button_tails_normal"),
            GameConfigLoader.getTexture("button_tails_hover"),
            GameConfigLoader.getTexture("button_tails_disable")
        );

        this.position.set(x, y);

        window.events.on("BUTTONS_OFF", this.setOff);
        window.events.on("BUTTONS_ON", this.setOn);
    }

    protected onClick(): void {
        window.events.emit("BUTTONS_OFF");
        window.events.emit("SET_COIN_BET", "tails");
        window.events.emit("TOSS_START");
        window.events.emit("COIN_TOSS_SERVER_REQUEST");
    }
}