import { WordPartyItem } from '../index';
import { DropperItemConfig } from './dropper';
import { NotifyItemConfig } from './notify';
import { PopperItemConfig } from './popper';
export declare type WordPartyItemOption = PopperItemConfig | DropperItemConfig | NotifyItemConfig;
export interface WordPartyTriggerParams {
    comment: string;
    hitCount: number;
}
export interface WordPartyModule {
    fire(config: WordPartyItemOption, params: WordPartyTriggerParams): void;
    destroy(): void;
}
export declare class WordPartyModules {
    private _modules;
    initialize(): void;
    register(id: string, module: WordPartyModule): void;
    unregister(id: string): void;
    destroy(): void;
    fire(config: WordPartyItem, comment: string, hitCount: number): void;
}
