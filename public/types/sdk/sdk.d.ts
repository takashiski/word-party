import { Comment, Listener } from '../common/types/Comment';
declare type CommentSubscriber = (comments: Comment[]) => void;
declare type ListenerSubscriber = (listeners: Listener[]) => void;
export declare const ONE_SDK: {
    _timer: number;
    _lastId: string;
    _commentSubscribers: Map<CommentSubscriber, CommentSubscriber>;
    _listenerSubscribers: Map<ListenerSubscriber, ListenerSubscriber>;
    init(jsonPath: string): void;
    _publishComment(comments: Comment[]): void;
    _publishListener(listeners: Listener[]): void;
    subscribeComment(subscriber: CommentSubscriber): void;
    unsbscribeComment(subscriber: CommentSubscriber): void;
    subscribeListener(subscriber: ListenerSubscriber): void;
    unsubscribeListener(subscriber: ListenerSubscriber): void;
};
export {};
