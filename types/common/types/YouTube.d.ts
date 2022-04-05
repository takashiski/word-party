import { BaseResponse } from "./BaseResponse";
export declare namespace YouTube {
    interface Param {
        key: string;
        value: string;
    }
    interface ServiceTrackingParam {
        service: string;
        params: Param[];
    }
    interface MainAppWebResponseContext {
        loggedOut: boolean;
    }
    interface WebResponseContextExtensionData {
        hasDecorated: boolean;
    }
    interface ResponseContext {
        serviceTrackingParams: ServiceTrackingParam[];
        mainAppWebResponseContext: MainAppWebResponseContext;
        webResponseContextExtensionData: WebResponseContextExtensionData;
    }
    interface TimedContinuationData {
        timeoutMs: number;
        continuation: string;
        clickTrackingParams: string;
    }
    interface Continuation {
        timedContinuationData: TimedContinuationData;
    }
    interface Image {
        thumbnails: Thumbnail[];
        accessibility: Accessibility;
    }
    interface Emoji {
        emojiId: string;
        shortcuts: string[];
        searchTerms: string[];
        image: Image;
        isCustomEmoji: boolean;
    }
    interface Run {
        text: string;
        emoji: Emoji;
    }
    interface Message {
        runs: Run[];
    }
    interface AuthorName {
        simpleText: string;
    }
    interface Thumbnail {
        url: string;
        width: number;
        height: number;
    }
    interface AuthorPhoto {
        thumbnails: Thumbnail[];
    }
    interface WebCommandMetadata {
        ignoreNavigation: boolean;
    }
    interface CommandMetadata {
        webCommandMetadata: WebCommandMetadata;
    }
    interface LiveChatItemContextMenuEndpoint {
        params: string;
    }
    interface ContextMenuEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata;
        liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint;
    }
    interface AccessibilityData {
        label: string;
    }
    interface ContextMenuAccessibility {
        accessibilityData: AccessibilityData;
    }
    interface Thumbnail2 {
        url: string;
    }
    interface CustomThumbnail {
        thumbnails: Thumbnail2[];
    }
    interface AccessibilityData2 {
        label: string;
    }
    interface Accessibility {
        accessibilityData: AccessibilityData2;
    }
    interface Icon {
        iconType: string;
    }
    interface LiveChatAuthorBadgeRenderer {
        customThumbnail?: CustomThumbnail;
        tooltip: string;
        accessibility: Accessibility;
        icon?: Icon;
    }
    interface AuthorBadge {
        liveChatAuthorBadgeRenderer: LiveChatAuthorBadgeRenderer;
    }
    interface LiveChatTextMessageRenderer {
        message: Message;
        authorName: AuthorName;
        authorPhoto: AuthorPhoto;
        contextMenuEndpoint: ContextMenuEndpoint;
        id: string;
        timestampUsec: string;
        authorExternalChannelId: string;
        contextMenuAccessibility: ContextMenuAccessibility;
        authorBadges: AuthorBadge[];
    }
    interface AuthorName2 {
        simpleText: string;
    }
    interface Thumbnail3 {
        url: string;
        width: number;
        height: number;
    }
    interface AuthorPhoto2 {
        thumbnails: Thumbnail3[];
    }
    interface PurchaseAmountText {
        simpleText: string;
    }
    interface Run2 {
        text: string;
        emoji: Emoji;
    }
    interface Message2 {
        runs: Run2[];
    }
    interface WebCommandMetadata2 {
        ignoreNavigation: boolean;
    }
    interface CommandMetadata2 {
        webCommandMetadata: WebCommandMetadata2;
    }
    interface LiveChatItemContextMenuEndpoint2 {
        params: string;
    }
    interface ContextMenuEndpoint2 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata2;
        liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint2;
    }
    interface AccessibilityData3 {
        label: string;
    }
    interface ContextMenuAccessibility2 {
        accessibilityData: AccessibilityData3;
    }
    interface LiveChatPaidMessageRenderer {
        id: string;
        timestampUsec: string;
        authorName: AuthorName2;
        authorPhoto: AuthorPhoto2;
        purchaseAmountText: PurchaseAmountText;
        message: Message2;
        headerBackgroundColor: number;
        headerTextColor: number;
        bodyBackgroundColor: number;
        bodyTextColor: number;
        authorExternalChannelId: string;
        authorNameTextColor: number;
        contextMenuEndpoint: ContextMenuEndpoint2;
        timestampColor: number;
        contextMenuAccessibility: ContextMenuAccessibility2;
        trackingParams: string;
    }
    interface Item {
        liveChatTextMessageRenderer?: LiveChatTextMessageRenderer;
        liveChatPaidMessageRenderer?: LiveChatPaidMessageRenderer;
    }
    interface AddChatItemAction {
        item: Item;
        clientId: string;
    }
    interface Amount {
        simpleText: string;
    }
    interface Thumbnail4 {
        url: string;
        width: number;
        height: number;
    }
    interface AccessibilityData4 {
        label: string;
    }
    interface Accessibility2 {
        accessibilityData: AccessibilityData4;
    }
    interface AuthorPhoto3 {
        thumbnails: Thumbnail4[];
        accessibility: Accessibility2;
    }
    interface WebCommandMetadata3 {
        ignoreNavigation: boolean;
    }
    interface CommandMetadata3 {
        webCommandMetadata: WebCommandMetadata3;
    }
    interface AuthorName3 {
        simpleText: string;
    }
    interface Thumbnail5 {
        url: string;
        width: number;
        height: number;
    }
    interface AuthorPhoto4 {
        thumbnails: Thumbnail5[];
    }
    interface PurchaseAmountText2 {
        simpleText: string;
    }
    interface Run3 {
        text: string;
    }
    interface Message3 {
        runs: Run3[];
    }
    interface WebCommandMetadata4 {
        ignoreNavigation: boolean;
    }
    interface CommandMetadata4 {
        webCommandMetadata: WebCommandMetadata4;
    }
    interface LiveChatItemContextMenuEndpoint3 {
        params: string;
    }
    interface ContextMenuEndpoint3 {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata4;
        liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint3;
    }
    interface AccessibilityData5 {
        label: string;
    }
    interface ContextMenuAccessibility3 {
        accessibilityData: AccessibilityData5;
    }
    interface LiveChatPaidMessageRenderer2 {
        id: string;
        timestampUsec: string;
        authorName: AuthorName3;
        authorPhoto: AuthorPhoto4;
        purchaseAmountText: PurchaseAmountText2;
        message: Message3;
        headerBackgroundColor: number;
        headerTextColor: number;
        bodyBackgroundColor: number;
        bodyTextColor: number;
        authorExternalChannelId: string;
        authorNameTextColor: number;
        contextMenuEndpoint: ContextMenuEndpoint3;
        timestampColor: number;
        contextMenuAccessibility: ContextMenuAccessibility3;
        trackingParams: string;
    }
    interface Renderer {
        liveChatPaidMessageRenderer: LiveChatPaidMessageRenderer2;
    }
    interface ShowLiveChatItemEndpoint {
        renderer: Renderer;
        trackingParams: string;
    }
    interface ShowItemEndpoint {
        clickTrackingParams: string;
        commandMetadata: CommandMetadata3;
        showLiveChatItemEndpoint: ShowLiveChatItemEndpoint;
    }
    interface LiveChatTickerPaidMessageItemRenderer {
        id: string;
        amount: Amount;
        amountTextColor: number;
        startBackgroundColor: number;
        endBackgroundColor: number;
        authorPhoto: AuthorPhoto3;
        durationSec: number;
        showItemEndpoint: ShowItemEndpoint;
        authorExternalChannelId: string;
        fullDurationSec: number;
        trackingParams: string;
    }
    interface Item2 {
        liveChatTickerPaidMessageItemRenderer: LiveChatTickerPaidMessageItemRenderer;
    }
    interface AddLiveChatTickerItemAction {
        item: Item2;
        durationSec: string;
    }
    interface Action {
        clickTrackingParams: string;
        addChatItemAction: AddChatItemAction;
        addLiveChatTickerItemAction: AddLiveChatTickerItemAction;
    }
    interface LiveChatContinuation {
        continuations: Continuation[];
        actions: Action[];
        trackingParams: string;
    }
    interface ContinuationContents {
        liveChatContinuation: LiveChatContinuation;
    }
    interface RootResponse {
        responseContext: ResponseContext;
        trackingParams: string;
        continuationContents: ContinuationContents;
    }
    interface CommentResponse extends BaseResponse {
        paidText?: string;
        colors?: {
            headerBackgroundColor: string;
            headerTextColor: string;
            bodyBackgroundColor: string;
            bodyTextColor: string;
            authorNameTextColor: string;
            timestampColor: string;
        };
    }
}
