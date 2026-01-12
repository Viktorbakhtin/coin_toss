export class DataRegistry {
    private static _instance: DataRegistry;
    private _data = new Map<string, any>();

    public static get instance(): DataRegistry {
        if (!this._instance) this._instance = new DataRegistry();
        return this._instance;
    }

    register<T>(key: string, value: T): void {
        this._data.set(key, value);
    }

    resolve<T>(key: string): T {
        const item = this._data.get(key);
        if (!item) throw new Error(`[DataRegistry] No entry found for key: ${key}`);
        return item as T;
    }

    has(key: string): boolean {
        return this._data.has(key);
    }

    unregister(key: string): void {
        this._data.delete(key);
    }

    clear(): void {
        this._data.clear();
    }
}