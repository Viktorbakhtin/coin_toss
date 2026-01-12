import {Container, Texture} from "pixi.js";
import {GameConfigLoader} from "../../core/GameConfigLoader";
import {BaseMediator} from "../../core/BaseMediator";
import {Coin} from "./Coin";
import {server} from "../server";
import {isPortrait} from "../../main";

export class CoinMediator extends BaseMediator<Container> {
    private coin!: Coin;
    private tossing = false;
    public coinBet!: string;

    private readonly headsTexture: Texture;
    private readonly tailsTexture: Texture;

    constructor(view: Container) {
        super(view);

        this.headsTexture = GameConfigLoader.getTexture("coin_heads");
        this.tailsTexture = GameConfigLoader.getTexture("coin_tails");
    }

    register(): void {
        this.coin = new Coin(this.headsTexture, this.tailsTexture);
        this.view.addChild(this.coin);

        this.applyLayout();

        window.events.on("layout_changed", this.applyLayout, this);
        window.events.on("SET_COIN_BET", this.setCoinBet, this);
        window.events.on("COIN_TOSS_SERVER_REQUEST", this.serverAction, this);
        window.events.on("TOSS_START", this.onTossStart, this);
    }

    private applyLayout = () => {
        const cx = window.layout_width * 0.5;
        const cy = window.layout_height * 0.5;

        if (isPortrait()) {
            this.coin.position.set(cx, cy - 300);
        } else {
            this.coin.position.set(cx, cy - 70);
        }
    };

    private onTossStart = () => {
        this.coin.start();
    };

    private setCoinBet = (coinBetValue: string) => {
        this.coinBet = coinBetValue;
    };

    private async serverAction() {
        const response = await server();
        await this.tossCoin(response.result);
    }

    private async tossCoin(result: "heads" | "tails") {
        if (this.tossing) return;

        this.tossing = true;
        window.events.emit("BUTTON_TOSS_OFF");

        await this.coin.stop(result);

        const winResult = this.checkWinRound(result);

        window.events.emit("ROUND_RESULT", winResult, () => {
            window.events.emit("BUTTONS_ON");
        });

        this.tossing = false;
    }

    private checkWinRound(result: "heads" | "tails"): boolean {
        return this.coinBet === result;
    }

    unregister(): void {}
}
