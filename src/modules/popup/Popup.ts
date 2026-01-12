import {Container, Text, TextStyle} from "pixi.js";
import gsap from "gsap";

export class Popup extends Container {
    private readonly textField: Text;

    constructor() {
        super();

        const style = new TextStyle({
            fontSize: 120,
            fill: 0xffffff,
            fontWeight: "bold"
        });

        this.textField = new Text("", style);
        this.textField.anchor.set(0.5);

        this.addChild(this.textField);

        this.visible = false;
        this.alpha = 0;
    }

    show(win: boolean): Promise<void> {
        this.textField.text = win ? "YOU WIN!" : "YOU LOSE!";
        this.textField.style.fill = win ? 0x00ff00 : 0xff0000;

        this.visible = true;
        this.alpha = 0;

        return new Promise(res => {
            gsap.to(this, {
                alpha: 1,
                duration: 0.3,
                onComplete: () => {
                    gsap.to(this, {
                        alpha: 0,
                        delay: 2,
                        duration: 0.3,
                        onComplete: () => {
                            this.visible = false;
                            res();
                        }
                    });
                }
            });
        });
    }
}
