import axios from 'axios'
import { Comment, CommentData, Listener } from '../common/types/Comment'
type CommentSubscriber = (comments: Comment[]) => void
type ListenerSubscriber = (listeners: Listener[]) => void

export const ONE_SDK = {
  _timer: -1,
  _lastId: '',
  _commentSubscribers: new Map<CommentSubscriber, CommentSubscriber>(),
  _listenerSubscribers: new Map<ListenerSubscriber, ListenerSubscriber>(),
  init(jsonPath: string) {
    let initialized = false
    const request = () => {
      axios.get(jsonPath)
        .then(res => res.data)
        .then(async(res: CommentData) => {
          const { comments, listeners } = res
          let index = comments.findIndex((comment) => {
            return this._lastId === comment.data.id
          })
          if (index === -1) {
            index = 0
          }
          const newComments = comments.slice(index + 1)
          if (newComments.length !== 0) {
            this._lastId = newComments[newComments.length - 1].data.id
            if (initialized) {
              this._publishComment(newComments)
            }
          }
          if (initialized) {
            this._publishListener(listeners)
          }
          initialized = true
          this._timer = setTimeout(request, 2000)
        })
        .catch((e) => {
          console.error(e)
          this._timer = setTimeout(request, 5000)
        })
    }
    request()
  },
  _publishComment(comments: Comment[]) {
    this._commentSubscribers.forEach(subscriber => {
      subscriber(comments)
    })
  },
  _publishListener(listeners: Listener[]) {
    this._listenerSubscribers.forEach(subscriber => {
      subscriber(listeners)
    })
  },
  subscribeComment(subscriber: CommentSubscriber) {
    this._commentSubscribers.set(subscriber, subscriber)
  },
  unsbscribeComment(subscriber: CommentSubscriber) {
    this._commentSubscribers.delete(subscriber)
  },
  subscribeListener(subscriber: ListenerSubscriber) {
    this._listenerSubscribers.set(subscriber, subscriber)
  },
  unsubscribeListener(subscriber: ListenerSubscriber) {
    this._listenerSubscribers.delete(subscriber)
  }
}
