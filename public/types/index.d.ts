import { PopperConfig } from './modules/popper';
import { DropperConfig } from './modules/dropper';
import { Comment } from './common/types/Comment';
import { NotifyConfig } from 'modules/notify';
interface WordPartyOptions {
    jsonPath: string;
    popperConfig: PopperConfig;
    dropperConfig: DropperConfig;
    notifyConfig: NotifyConfig;
}
declare function verify(commentStrings: string[]): void;
declare function checkComments(comments: Comment[]): void;
declare function start(_op?: Partial<WordPartyOptions>, skitSdk?: boolean): void;
export declare const WordParty: {
    start: typeof start;
    verify: typeof verify;
    checkComments: typeof checkComments;
};
export {};
