import {BaseModel} from './BaseModel';
import {BaseMediator} from './BaseMediator';

export class Facade {
    private static _instance: Facade;
    private _models: Map<string, BaseModel> = new Map();
    private _mediators: Map<string, BaseMediator> = new Map();

    public static get instance(): Facade {
        if (!this._instance) this._instance = new Facade();
        return this._instance;
    }

    registerModel<T extends BaseModel>(key: string, model: T): void {
        this._models.set(key, model);
    }

    getModel<T extends BaseModel>(key: string): T {
        return this._models.get(key) as T;
    }

    registerMediator<T extends BaseMediator>(key: string, mediator: T): void {
        this._mediators.set(key, mediator);
        mediator.register();
    }

    getMediator<T extends BaseMediator>(key: string): T {
        return this._mediators.get(key) as T;
    }

    removeMediator(key: string): void {
        const med = this._mediators.get(key);
        if (med) {
            med.unregister();
            this._mediators.delete(key);
        }
    }
}