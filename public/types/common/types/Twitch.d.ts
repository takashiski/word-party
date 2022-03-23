import { BaseResponse } from './BaseResponse';
export declare module Twitch {
    interface RootResponse {
        '@badge-info': string;
        badges: string;
        bits?: string;
        color: string;
        'display-name': string;
        emotes?: string;
        'first-msg': string;
        flags: string;
        id: string;
        mod: string;
        'room-id': string;
        subscriber: string;
        'tmi-sent-ts': string;
        turbo: string;
        'user-id': string;
        message: string;
        'user-type': string;
    }
    interface Badge {
        id: string;
        setID: string;
        version: string;
        title: string;
        image1x: string;
        image2x: string;
        image4x: string;
        clickAction: string;
        clickURL: string;
        __typename: string;
    }
    interface CommentResponse extends BaseResponse {
        bits?: string;
        turbo: string;
        flags: string;
        mod: string;
        subscriber: string;
    }
}
