import { WordPartyTriggerParams, WordPartyModule } from './index';
// 独自拡張で画像が使えるバージョン
// @ts-ignore
import JSConfetti from '../lib/js-confetti'
export type PopperItemType = 'default' | 'emoji' | 'image'
export interface PopperItemConfig {
  type: PopperItemType
  amount: number
  size?: number
  images?: string[]
  emojis?: string[]
  colors?: string[]
}
export interface PopperConfig {
  maxItems: number
}
export class Popper implements WordPartyModule {
  private canvas = document.getElementById('popper') as HTMLCanvasElement
  private confetti: any = new JSConfetti({
    canvas: this.canvas
  })
  private options: PopperConfig = {
    maxItems: 20
  }
  constructor(_op: Partial<PopperConfig> = {}) {
    Object.assign(this.options, _op)
  }
  fire(config: PopperItemConfig, { hitCount }: WordPartyTriggerParams) {
    for (let i = 0; i < Math.min(hitCount, this.options.maxItems || 10); i++) {
      setTimeout(() => this._confetti(config), i * 200)
    }
  }
  _confetti = (config: PopperItemConfig) => {
    const confettiConfig: any = {
      confettiNumber: config.amount
    }
    switch (config.type) {
      case 'default':
        confettiConfig.confettiRadius = config.size || 20
        if (config.colors && config.colors?.length !== 0) {
          confettiConfig.confettiColors = config.colors
        }
        break
      case 'emoji':
        confettiConfig.emojis = config.emojis || []
        confettiConfig.emojiSize = config.size || 100
        break
      case 'image':
        confettiConfig.images = config.images || []
    }
    return this.confetti.addConfetti(confettiConfig)
  }
  destroy(): void {
  }
}

