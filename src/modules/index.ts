import { Comment } from 'common/types/Comment'
export interface WordPartyModule {
  verify(comments: Comment[]): void
}