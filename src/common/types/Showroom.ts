import { BaseResponse } from "./BaseResponse";

export module Showroom {
	export interface Color {
		r: number;
		b: number;
		g: number;
	}

	export interface Telop {
		color: Color;
		text: string;
		type: string;
	}

	export interface TimeResponse {
		created_at: number
		t: number
		c?: number
		p?: number
	}

	export interface MessageResponse {
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
	export interface GiftResponse {
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
	
	export interface TelopResponse {
		telops: Telop[];
		telop: string;
		interval: number;
		t: number;
		api: string;
	}

	export type RootResponse = TelopResponse | MessageResponse | GiftResponse | TimeResponse
	export interface CommentResponse extends BaseResponse {
		at?: number
		d?: number
		u?: number
		ua?: number
		gt?: number
		g?: number;
		h?: number
		n?: number
	}
}

