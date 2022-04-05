import { WordPartyItemOption, WordPartyModules } from './modules/index';
import { Comment } from './common/types/Comment';
import { NotifyConfig } from './modules/notify';
import { PopperConfig } from './modules/popper';
import { DropperConfig } from './modules/dropper';
declare type WordPartyEffect = 'popper' | 'dropper' | 'notifier';
export interface WordPartyItem {
    pattern: (RegExp | string)[];
    effect: WordPartyEffect;
    trigger: number;
    options: WordPartyItemOption;
}
interface WordPartyOptions {
    apiPort: number;
    modules: {
        popper: PopperConfig;
        dropper: DropperConfig;
        notifier: NotifyConfig;
    };
}
declare class WordParty {
    Modules: WordPartyModules;
    private _items;
    private _options;
    init(options: WordPartyOptions): this;
    private _handleOnMouseDown;
    private _handleOnContextMenu;
    setup(items: WordPartyItem[]): this;
    destroy(): void;
    start(): this;
    verify(comments: Comment[]): void;
    private _formatComments;
}
declare const _default: WordParty;
export default _default;
