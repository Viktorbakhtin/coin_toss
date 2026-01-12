import {DataRegistry} from "./DataRegistry";

export function inject<T>(key: string): T {
    return DataRegistry.instance.resolve<T>(key);
}