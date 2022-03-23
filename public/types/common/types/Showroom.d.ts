import { BaseResponse } from "./BaseResponse";
export declare module Showroom {
    interface Color {
        r: number;
        b: number;
        g: number;
    }
    interface Telop {
        color: Color;
        text: string;
        type: string;
    }
    interface TimeResponse {
        created_at: number;
        t: number;
        c?: number;
        p?: number;
    }
    interface MessageResponse {
        ua: number;
        av: number;
        d: number;
        ac: string;
        cm: string;
        created_at: number;
        u: number;
        at: number;
        t: string;
    }
    interface GiftResponse {
        ua: number;
        n: number;
        av: number;
        d: number;
        ac: string;
        created_at: number;
        u: number;
        h: number;
        g: number;
        gt: number;
        at: number;
        t: string;
    }
    interface TelopResponse {
        telops: Telop[];
        telop: string;
        interval: number;
        t: number;
        api: string;
    }
    type RootResponse = TelopResponse | MessageResponse | GiftResponse | TimeResponse;
    interface CommentResponse extends BaseResponse {
        at?: number;
        d?: number;
        u?: number;
        ua?: number;
        gt?: number;
        g?: number;
        h?: number;
        n?: number;
    }
}
