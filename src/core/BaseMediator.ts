export abstract class BaseMediator<TView = any> {
    protected constructor(public readonly view: TView) {
    }

    abstract register(): void;

    abstract unregister(): void;
}