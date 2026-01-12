import {Application} from "pixi.js";
import {DataRegistry} from "./core/DataRegistry";
import {EventEmitter} from "@pixi/utils";
import {GameConfigLoader} from "./core/GameConfigLoader";
import {registerCoinModule} from "./modules/coin";
import {registerUiModule} from "./modules/ui";
import {registerPopupModule} from "./modules/popup";

export * as PIXI from "pixi.js";

declare global {
    interface Window {
        app: Application;
        events: EventEmitter;
        layout_width: number;
        layout_height: number;
    }
}

const LANDSCAPE = {width: 1280, height: 720};
const PORTRAIT = {width: 720, height: 1280};

export function isPortrait(): boolean {
    return window.innerHeight > window.innerWidth;
}

function resize(app: Application) {
    const layout = isPortrait() ? PORTRAIT : LANDSCAPE;

    window.layout_width = layout.width;
    window.layout_height = layout.height;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const scale = Math.min(
        screenW / layout.width,
        screenH / layout.height
    );

    app.renderer.resize(screenW, screenH);

    app.stage.scale.set(scale);

    const offsetX = (screenW - layout.width * scale) * 0.5;
    const offsetY = (screenH - layout.height * scale) * 0.5;

    app.stage.position.set(offsetX, offsetY);

    window.events.emit("layout_changed", {
        portrait: isPortrait(),
        width: layout.width,
        height: layout.height,
        scale
    });
}

(async () => {
    const app = new Application();

    if (window.location.hostname === "localhost") {
        (globalThis as any).__PIXI_APP__ = app;
    }

    window.app = app;
    window.events = new EventEmitter();

    await app.init({
        background: 0xf0f0f0,
        antialias: true
    });

    await GameConfigLoader.load("game-config.json");

    document.getElementById("pixi-container")?.appendChild(app.canvas);

    resize(app);
    window.addEventListener("resize", () => resize(app));

    DataRegistry.instance.register(
        "cards_count",
        GameConfigLoader.getSetting<number>("cards_count")
    );

    registerCoinModule();
    registerUiModule();
    registerPopupModule();
})();
