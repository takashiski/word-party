import { BaseResponse } from "./BaseResponse";

export namespace YouTube {
	export interface Param {
		key: string;
		value: string;
	}

	export interface ServiceTrackingParam {
		service: string;
		params: Param[];
	}

	export interface MainAppWebResponseContext {
		loggedOut: boolean;
	}

	export interface WebResponseContextExtensionData {
		hasDecorated: boolean;
	}

	export interface ResponseContext {
		serviceTrackingParams: ServiceTrackingParam[];
		mainAppWebResponseContext: MainAppWebResponseContext;
		webResponseContextExtensionData: WebResponseContextExtensionData;
	}

	export interface TimedContinuationData {
		timeoutMs: number;
		continuation: string;
		clickTrackingParams: string;
	}

	export interface Continuation {
		timedContinuationData: TimedContinuationData;
	}

	export interface Image {
        thumbnails: Thumbnail[];
        accessibility: Accessibility;
    }

	export interface Emoji {
        emojiId: string;
        shortcuts: string[];
        searchTerms: string[];
        image: Image;
        isCustomEmoji: boolean;
    }

	export interface Run {
		text: string;
		emoji: Emoji;
	}

	export interface Message {
		runs: Run[];
	}

	export interface AuthorName {
		simpleText: string;
	}

	export interface Thumbnail {
		url: string;
		width: number;
		height: number;
	}

	export interface AuthorPhoto {
		thumbnails: Thumbnail[];
	}

	export interface WebCommandMetadata {
		ignoreNavigation: boolean;
	}

	export interface CommandMetadata {
		webCommandMetadata: WebCommandMetadata;
	}

	export interface LiveChatItemContextMenuEndpoint {
		params: string;
	}

	export interface ContextMenuEndpoint {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint;
	}

	export interface AccessibilityData {
		label: string;
	}

	export interface ContextMenuAccessibility {
		accessibilityData: AccessibilityData;
	}

	export interface Thumbnail2 {
		url: string;
	}

	export interface CustomThumbnail {
		thumbnails: Thumbnail2[];
	}

	export interface AccessibilityData2 {
		label: string;
	}

	export interface Accessibility {
		accessibilityData: AccessibilityData2;
	}

	export interface Icon {
		iconType: string
	}

	export interface LiveChatAuthorBadgeRenderer {
		customThumbnail?: CustomThumbnail;
		tooltip: string;
		accessibility: Accessibility;
		icon?: Icon
	}

	export interface AuthorBadge {
		liveChatAuthorBadgeRenderer: LiveChatAuthorBadgeRenderer;
	}

	export interface LiveChatTextMessageRenderer {
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

	export interface AuthorName2 {
		simpleText: string;
	}

	export interface Thumbnail3 {
		url: string;
		width: number;
		height: number;
	}

	export interface AuthorPhoto2 {
		thumbnails: Thumbnail3[];
	}

	export interface PurchaseAmountText {
		simpleText: string;
	}

	export interface Run2 {
		text: string;
		emoji: Emoji;
	}

	export interface Message2 {
		runs: Run2[];
	}

	export interface WebCommandMetadata2 {
		ignoreNavigation: boolean;
	}

	export interface CommandMetadata2 {
		webCommandMetadata: WebCommandMetadata2;
	}

	export interface LiveChatItemContextMenuEndpoint2 {
		params: string;
	}

	export interface ContextMenuEndpoint2 {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata2;
		liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint2;
	}

	export interface AccessibilityData3 {
		label: string;
	}

	export interface ContextMenuAccessibility2 {
		accessibilityData: AccessibilityData3;
	}

	export interface LiveChatPaidMessageRenderer {
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

	export interface Item {
		liveChatTextMessageRenderer?: LiveChatTextMessageRenderer;
		liveChatPaidMessageRenderer?: LiveChatPaidMessageRenderer;
	}

	export interface AddChatItemAction {
		item: Item;
		clientId: string;
	}

	export interface Amount {
		simpleText: string;
	}

	export interface Thumbnail4 {
		url: string;
		width: number;
		height: number;
	}

	export interface AccessibilityData4 {
		label: string;
	}

	export interface Accessibility2 {
		accessibilityData: AccessibilityData4;
	}

	export interface AuthorPhoto3 {
		thumbnails: Thumbnail4[];
		accessibility: Accessibility2;
	}

	export interface WebCommandMetadata3 {
		ignoreNavigation: boolean;
	}

	export interface CommandMetadata3 {
		webCommandMetadata: WebCommandMetadata3;
	}

	export interface AuthorName3 {
		simpleText: string;
	}

	export interface Thumbnail5 {
		url: string;
		width: number;
		height: number;
	}

	export interface AuthorPhoto4 {
		thumbnails: Thumbnail5[];
	}

	export interface PurchaseAmountText2 {
		simpleText: string;
	}

	export interface Run3 {
		text: string;
	}

	export interface Message3 {
		runs: Run3[];
	}

	export interface WebCommandMetadata4 {
		ignoreNavigation: boolean;
	}

	export interface CommandMetadata4 {
		webCommandMetadata: WebCommandMetadata4;
	}

	export interface LiveChatItemContextMenuEndpoint3 {
		params: string;
	}

	export interface ContextMenuEndpoint3 {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata4;
		liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint3;
	}

	export interface AccessibilityData5 {
		label: string;
	}

	export interface ContextMenuAccessibility3 {
		accessibilityData: AccessibilityData5;
	}

	export interface LiveChatPaidMessageRenderer2 {
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

	export interface Renderer {
		liveChatPaidMessageRenderer: LiveChatPaidMessageRenderer2;
	}

	export interface ShowLiveChatItemEndpoint {
		renderer: Renderer;
		trackingParams: string;
	}

	export interface ShowItemEndpoint {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata3;
		showLiveChatItemEndpoint: ShowLiveChatItemEndpoint;
	}

	export interface LiveChatTickerPaidMessageItemRenderer {
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

	export interface Item2 {
		liveChatTickerPaidMessageItemRenderer: LiveChatTickerPaidMessageItemRenderer;
	}

	export interface AddLiveChatTickerItemAction {
		item: Item2;
		durationSec: string;
	}

	export interface Action {
		clickTrackingParams: string;
		addChatItemAction: AddChatItemAction;
		addLiveChatTickerItemAction: AddLiveChatTickerItemAction;
	}

	export interface LiveChatContinuation {
		continuations: Continuation[];
		actions: Action[];
		trackingParams: string;
	}

	export interface ContinuationContents {
		liveChatContinuation: LiveChatContinuation;
	}

	export interface RootResponse {
		responseContext: ResponseContext;
		trackingParams: string;
		continuationContents: ContinuationContents;
	}
	export interface CommentResponse extends BaseResponse {
		paidText?: string
		colors?: {
			headerBackgroundColor: string;
			headerTextColor: string;
			bodyBackgroundColor: string;
			bodyTextColor: string;
			authorNameTextColor: string;
			timestampColor: string;
		}
	}
}
