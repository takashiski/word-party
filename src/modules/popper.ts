import { Comment } from 'common/types/Comment'
// 独自拡張で画像が使えるバージョン
// @ts-ignore
import JSConfetti from 'lib/js-confetti'
import { WordPartyModule } from 'modules'
export type PopperItemType = 'default' | 'emoji' | 'image'
export interface PopperItemConfig {
  trigger: number
  type: PopperItemType
  pattern: string[]
  amount: number
  size?: number
  images?: string[]
  emojis?: string[]
  colors?: string[]
}
export interface PopperConfig {
  use: boolean
  maxItems: number
  items: PopperItemConfig[]
}
export class Popper implements WordPartyModule {
  private canvas = document.getElementById('popper') as HTMLCanvasElement
  private confetti = new JSConfetti({
    canvas: this.canvas
  })
  private options: PopperConfig = {
    use: true,
    maxItems: 20,
    items: []
  }
  constructor(_op: Partial<PopperConfig> = {}) {
    Object.assign(this.options, _op)
    document.body.removeEventListener('mousedown', this._onMouseDown)
    document.body.addEventListener('mousedown', this._onMouseDown)
  }
  _onMouseDown = (e: MouseEvent) => {
    this.options.items.forEach((item) => {
      if (e.button === item.trigger) {
        this._confetti(item)
      }
    })
  }
  _confetti = (config: PopperItemConfig) => {
    const confettiConfig: any = {
      confettiNumber: config.amount
    }
    switch (config.type) {
      case 'default':
        confettiConfig.confettiRadius = config.size || 20
        if (config.colors) {
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
  verify(comments: string[]) {
    this.options.items.forEach(item => {
      let total = 0
      item.pattern.forEach(ptt => {
        let pattern: RegExp
        if (typeof ptt === 'string') {
          pattern = new RegExp(ptt, 'igm')
        } else {
          pattern = ptt
        }
        total += comments.reduce((count, comment) => {
          if (comment.search(pattern) !== -1) {
            return count + 1
          }
          return count
        }, 0)
        for (let i = 0; i < Math.min(total, this.options.maxItems || 10); i++) {
          setTimeout(() => this._confetti(item), i * 200)
        }
      })
    })
  }
}

