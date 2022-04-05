import { WordPartyTriggerParams, WordPartyModule } from './index';
export declare type PopperItemType = 'default' | 'emoji' | 'image';
export interface PopperItemConfig {
    type: PopperItemType;
    amount: number;
    size?: number;
    images?: string[];
    emojis?: string[];
    colors?: string[];
}
export interface PopperConfig {
    maxItems: number;
}
export declare class Popper implements WordPartyModule {
    private canvas;
    private confetti;
    private options;
    constructor(_op?: Partial<PopperConfig>);
    fire(config: PopperItemConfig, { hitCount }: WordPartyTriggerParams): void;
    _confetti: (config: PopperItemConfig) => any;
    destroy(): void;
}
