import { BaseResponse } from "./BaseResponse";
export declare namespace NicoNama {
    interface Icon {
        urls: {
            [size: string]: string;
        };
    }
    interface User {
        description: string;
        hasPremiumOrStrongerRights: false;
        hasSuperPremiumOrStrongerRights: false;
        icons: Icon;
        nickname: string;
        userId: string;
    }
    interface UserDataResponse {
        data: User[];
        meta: {
            status: number;
        };
    }
    interface Chat {
        anonymity?: number;
        content: string;
        date: number;
        date_usec: number;
        mail: string;
        no: number;
        premium: number;
        thread: string;
        user_id: string;
        vpos: number;
    }
    interface Thread {
        last_res: number;
        resultcode: number;
        revision: number;
        server_time: number;
        thread: string;
        ticket: string;
    }
    interface RootResponse {
        chat?: Chat;
        thread?: Thread;
    }
    interface CommentResponse extends BaseResponse {
        hasPremiumOrStrongerRights: boolean;
        hasSuperPremiumOrStrongerRights: boolean;
        vpos: number;
        thread: string;
        dateUsec: number;
        description: string;
        mail: string;
        premium: number;
        command: string;
        giftRank: string;
    }
}
