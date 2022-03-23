import { BaseResponse } from "./BaseResponse";
export declare module Twicas {
    interface Author {
        id: string;
        name: string;
        screenName: string;
        profileImage: string;
        grade: number;
    }
    interface Item {
        name: string;
        image: string;
        detailImage: string;
        effectCommand: string;
        showsSenderInfo: boolean;
    }
    interface Sender {
        id: string;
        name: string;
        screenName: string;
        profileImage: string;
        grade: number;
    }
    interface Comment {
        type: 'comment';
        id: number;
        message: string;
        createdAt: number;
        author: Author;
        numComments: number;
    }
    interface Gift {
        id: string;
        type: 'gift';
        message: string;
        item: Item;
        sender: Sender;
        createdAt: number;
    }
    type RootResponse = Comment | Gift;
    interface CommentResponse extends BaseResponse {
        item?: Item;
    }
}
