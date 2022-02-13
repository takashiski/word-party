import { BiliBili } from 'common/types/BiliBili';
import { BaseBadge } from './BaseResponse';
import { YouTube } from "./YouTube"
import { Twicas } from "./Twicas"
import { Twitch } from './Twitch'
import { NicoNama } from './NicoNama';
import { Showroom } from './Showroom';

export type ServiceType = 'youtube' | 'twicas' | 'twitch' | 'niconama' | 'showroom' | 'bilibili'
export type CommentDataType = YouTube.CommentResponse
 | Twicas.CommentResponse
 | Twitch.CommentResponse
 | NicoNama.CommentResponse

export interface YouTubeComment {
  id: string
  service: 'youtube'
  name: string
  url: string
  data: YouTube.CommentResponse
}
export interface TwicasComment {
  id: string
  service: 'twicas',
  name: string
  url: string
  data: Twicas.CommentResponse
}
export interface TwitchComment {
  id: string
  service: 'twitch',
  name: string
  url: string
  data: Twitch.CommentResponse
}
export interface NicoNamaComment {
  id: string
  service: 'niconama',
  name: string
  url: string
  data: NicoNama.CommentResponse
}
export interface ShowroomComment {
  id: string
  service: 'showroom',
  name: string
  url: string
  data: Showroom.CommentResponse
}
export interface BiliBiliComment {
  id: string
  service: 'bilibili',
  name: string
  url: string
  data: BiliBili.CommentResponse
}
export type Comment = YouTubeComment
  | TwicasComment
  | TwitchComment
  | NicoNamaComment
  | ShowroomComment
  | BiliBiliComment

export interface Listener {
  id: string
  name: string
  profileImage: string
  badges: BaseBadge[]
  count: number
  service: {
    id: string
    type: ServiceType
    name: string
    url: string
  }
}
export interface CommentData {
  comments: Comment[]
  listeners: Listener[]
}