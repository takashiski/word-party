import { BaseResponse } from "./BaseResponse";

export module Twicas {
	export interface Author {
		id: string;
		name: string;
		screenName: string;
		profileImage: string;
		grade: number;
	}
	export interface Item {
		name: string;
		image: string;
		detailImage: string;
		effectCommand: string;
		showsSenderInfo: boolean;
	}
	export interface Sender {
		id: string;
		name: string;
		screenName: string;
		profileImage: string;
		grade: number;
	}
	export interface Comment {
		type: 'comment';
		id: number;
		message: string;
		createdAt: number;
		author: Author;
		numComments: number;
	}
	export interface Gift {
		id: string;
		type: 'gift';
		message: string;
		item: Item;
		sender: Sender;
		createdAt: number;
	}
	export type RootResponse = Comment | Gift
	export interface CommentResponse extends BaseResponse {
		item?: Item
	}
}

