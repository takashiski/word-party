import { WordPartyModule } from 'modules';
export interface NotifyItemConfig {
    trigger: number;
    pattern: string[];
    lifeTime: number;
    images: string[];
    x?: number | [number, number];
    y?: number | [number, number];
    only?: boolean;
}
export interface NotifyConfig {
    use: boolean;
    maxItems: number;
    items: NotifyItemConfig[];
}
export declare class Notify implements WordPartyModule {
    private options;
    private _container;
    private _items;
    constructor(_op: NotifyConfig);
    _onMouseDown: (e: MouseEvent) => void;
    showItem(conf: NotifyItemConfig, x?: number, y?: number): void;
    verify(comments: string[]): void;
    destroy(): void;
}
