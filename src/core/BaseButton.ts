import {Sprite, Texture} from "pixi.js";
import {sound} from '@pixi/sound';

export abstract class BaseButton extends Sprite {
    private readonly textureNormal: Texture;
    private readonly textureHover: Texture;
    private readonly textureOff: Texture;

    private hoverActive: boolean = false;
    private buttonActive: boolean = true;

    protected constructor(textureNormal: Texture, textureHover: Texture, textureOff: Texture) {
        super(textureNormal);
        this.textureNormal = textureNormal;
        this.textureHover = textureHover;
        this.textureOff = textureOff;

        this.anchor.set(0.5);
        this.interactive = true;
        this.cursor = "pointer";

        this.on("pointerdown", this.handleDown);
        this.on("pointerup", this.handleUp);
        this.on("pointerupoutside", this.handleUp);
        this.on("pointerover", this.handleHover);
        this.on("pointerout", this.handleOut);
    }

    private handleDown = () => {
        if (!this.buttonActive) return;

        sound.play('button_click');

        this.onClick();
    };

    private handleUp = () => {
        if (!this.buttonActive) return;
    };

    private handleHover = () => {
        this.hoverActive = true;
        if (!this.buttonActive) return;

        sound.play('button_over');

        this.texture = this.textureHover;
    };

    private handleOut = () => {
        this.hoverActive = false;
        if (!this.buttonActive) return;

        sound.play('button_over');

        this.texture = this.textureNormal;
    };

    public setOn = () => {
        this.texture = this.hoverActive ? this.textureHover : this.textureNormal;
        this.buttonActive = true;
    };

    public setOff = () => {
        this.texture = this.textureOff;
        this.buttonActive = false;
    };

    protected abstract onClick(): void;

    override destroy(options?: boolean): void {
        this.off("pointerdown", this.handleDown);
        this.off("pointerup", this.handleUp);
        this.off("pointerupoutside", this.handleUp);
        this.off("pointerover", this.handleHover);
        this.off("pointerout", this.handleOut);

        super.destroy(options);
    }
}
