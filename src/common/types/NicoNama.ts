import { BaseResponse } from "./BaseResponse";

export namespace NicoNama {
  export interface Icon {
    urls: {
      [size: string]: string
    }
  }
  export interface User {
    description: string
    hasPremiumOrStrongerRights: false
    hasSuperPremiumOrStrongerRights: false
    icons: Icon
    nickname: string
    userId: string
  }
  export interface UserDataResponse {
    data: User[]
    meta: {
      status: number
    }
  }
  export interface Chat {
    anonymity?: number
    content: string
    date: number
    date_usec: number
    mail: string
    no: number
    premium: number
    thread: string
    user_id: string
    vpos: number
  }
  export interface Thread {
    last_res: number
    resultcode: number
    revision: number
    server_time: number
    thread: string
    ticket: string
  }
  export interface RootResponse {
    chat?: Chat
    thread?: Thread
  }
  export interface CommentResponse extends BaseResponse {
		hasPremiumOrStrongerRights: boolean
    hasSuperPremiumOrStrongerRights: boolean
    vpos: number
    thread: string
    dateUsec: number
    description: string
    mail: string
    premium: number
    command: string
    giftRank: string
	}
}