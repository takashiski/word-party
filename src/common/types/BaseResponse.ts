export interface BaseBadge {
	url: string
	label: string
}
export interface BaseResponse {
  id: string
  userId: string
	name: string
	displayName?: string
	hasGift: boolean
	profileImage: string
	badges: BaseBadge[]
	timestamp: number
	comment: string
	isFirstTime?: boolean
}