import {BaseButton} from "../../core/BaseButton";
import {GameConfigLoader} from "../../core/GameConfigLoader";

export class HeadsButton extends BaseButton {
    constructor(x: number, y: number) {
        super(
            GameConfigLoader.getTexture("button_heads_normal"),
            GameConfigLoader.getTexture("button_heads_hover"),
            GameConfigLoader.getTexture("button_heads_disable")
        );

        this.position.set(x, y);

        window.events.on("BUTTONS_OFF", this.setOff);
        window.events.on("BUTTONS_ON", this.setOn);
    }

    protected onClick(): void {
        window.events.emit("BUTTONS_OFF");
        window.events.emit("SET_COIN_BET", "heads");
        window.events.emit("TOSS_START");
        window.events.emit("COIN_TOSS_SERVER_REQUEST");
    }
}