import { WordPartyModule } from 'modules';
export declare type PopperItemType = 'default' | 'emoji' | 'image';
export interface PopperItemConfig {
    trigger: number;
    type: PopperItemType;
    pattern: string[];
    amount: number;
    size?: number;
    images?: string[];
    emojis?: string[];
    colors?: string[];
}
export interface PopperConfig {
    use: boolean;
    maxItems: number;
    items: PopperItemConfig[];
}
export declare class Popper implements WordPartyModule {
    private canvas;
    private confetti;
    private options;
    constructor(_op?: Partial<PopperConfig>);
    _onMouseDown: (e: MouseEvent) => void;
    _confetti: (config: PopperItemConfig) => any;
    verify(comments: string[]): void;
    destroy(): void;
}
