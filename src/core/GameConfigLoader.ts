import {Assets, Texture} from 'pixi.js';

interface AssetConfigEntry {
    alias: string;
    src: string;
}

interface GameSettings {
    [key: string]: any;
}

interface GameConfigData {
    assets: AssetConfigEntry[];
    settings: GameSettings;
}

export class GameConfigLoader {
    private static _settings: GameSettings;

    static async load(configUrl: string): Promise<void> {
        const config = await Assets.load<GameConfigData>(configUrl);

        if (!config || !Array.isArray(config.assets)) {
            throw new Error('[GameConfigLoader] Config is corrupted or "assets" field is missing');
        }

        this._settings = config.settings ?? {};

        try {
            await Assets.load(config.assets);
        } catch (err) {
            console.error('[GameConfigLoader] Failed to load assets:', err);
            throw err;
        }
    }

    static getAsset<T = any>(alias: string): T {
        const asset = Assets.get<T>(alias);

        if (!asset) {
            console.warn(`[GameConfigLoader] Asset "${alias}" not found`);
        }

        return asset;
    }

    static getTexture(frameName: string): Texture {
        const texture = Texture.from(frameName + '.png');
        if (!texture) {
            console.warn(`[GameConfigLoader] Texture "${frameName}" not found`);
        }
        return texture;
    }

    static getSetting<T = any>(key: string, defaultValue?: T): T {
        return (this._settings?.[key] ?? defaultValue) as T;
    }

    static async unloadAsset(alias: string): Promise<void> {
        await Assets.unload(alias);
    }
}
