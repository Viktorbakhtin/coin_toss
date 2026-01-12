import {Container, Sprite, Texture} from "pixi.js";
import gsap from "gsap";

export class Coin extends Container {
    private readonly heads: Sprite;
    private readonly tails: Sprite;

    private currentSide: "heads" | "tails" = "heads";
    private looping = false;

    private bounceTween: gsap.core.Tween | null = null;
    private flipTween: gsap.core.Tween | null = null;

    constructor(headsTexture: Texture, tailsTexture: Texture) {
        super();

        this.heads = new Sprite(headsTexture);
        this.tails = new Sprite(tailsTexture);

        this.heads.anchor.set(0.5);
        this.tails.anchor.set(0.5);

        this.heads.visible = true;
        this.tails.visible = false;

        this.addChild(this.heads, this.tails);
    }

    start() {
        if (this.looping) return;
        this.looping = true;

        this.bounceTween = gsap.to(this, {
            y: "-=50",
            duration: 0.4,
            ease: "sine.inOut"
        });

        this.loopFlip();
    }

    private loopFlip() {
        if (!this.looping) return;

        this.flipTween = gsap.to(this.scale, {
            x: 0,
            duration: 0.07,
            onComplete: () => {
                this.toggleSide();

                gsap.to(this.scale, {
                    x: 1,
                    duration: 0.07,
                    onComplete: () => this.loopFlip()
                });
            }
        });
    }

    stop(result: "heads" | "tails"): Promise<void> {
        return new Promise(res => {
            this.looping = false;

            this.bounceTween?.kill();
            this.flipTween?.kill();

            this.bounceTween = gsap.to(this, {
                y: "+=50",
                duration: 0.3,
                ease: "sine.inOut"
            });

            gsap.to(this.scale, {
                x: 0,
                duration: 0.15,
                onComplete: () => {
                    this.setSide(result);

                    gsap.to(this.scale, {
                        x: 1,
                        duration: 0.15,
                        onComplete: res
                    });
                }
            });

            this.currentSide = result;
        });
    }

    private toggleSide() {
        if (this.currentSide === "heads") {
            this.currentSide = "tails";
            this.heads.visible = false;
            this.tails.visible = true;
        } else {
            this.currentSide = "heads";
            this.tails.visible = false;
            this.heads.visible = true;
        }
    }

    private setSide(side: "heads" | "tails") {
        this.currentSide = side;
        this.heads.visible = side === "heads";
        this.tails.visible = side === "tails";
    }
}
