export interface SpeechConfig {
  enabled: boolean
  pitch: number
  rate: number
  volume: number
  lang: string
  voice: string
  speechName: boolean
  dictionary: string
  commentLengthLimit: boolean
  commentLength: number
  nameLengthLimit: boolean
  nameLength: number
  excludeUser: string
}
export interface CommentConfig {
  nameLengthLimit: boolean
  nameLength: number
}
export interface BouyomichanConfig {
  enabled: boolean
  port: number
}
export interface IntegrationConfig {
  bouyomichan: BouyomichanConfig
}
export interface AppConfig {
  fixedForeground: boolean
  logs: boolean
}
export interface Config {
  speech: SpeechConfig
  app: AppConfig
  comment: CommentConfig
  integration: IntegrationConfig
}