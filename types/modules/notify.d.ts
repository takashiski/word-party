import { WordPartyTriggerParams, WordPartyModule } from './index';
export interface NotifyItemConfig {
    lifeTime: number;
    images: string[];
    x?: number | [number, number];
    y?: number | [number, number];
    only?: boolean;
}
export interface NotifyConfig {
    maxItems: number;
}
export declare class Notify implements WordPartyModule {
    private options;
    private _container;
    private _items;
    constructor(_op: NotifyConfig);
    showItem(conf: NotifyItemConfig, x?: number, y?: number): void;
    fire(config: NotifyItemConfig, {}: WordPartyTriggerParams): void;
    destroy(): void;
}
