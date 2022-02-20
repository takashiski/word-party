import { Comment } from 'common/types/Comment'
// 独自拡張で画像が使えるバージョン
// @ts-ignore
import JSConfetti from 'lib/js-confetti'
import { WordPartyModule } from 'modules'
export interface PopperItemConfig {
  trigger?: number
  pattern: (RegExp | string)[]
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],
  emojis?: string[],
  emojiSize?: number,
  images?: string[]
}
export interface PopperConfig {
  use?: boolean
  items: PopperItemConfig[]
  maxItems?: number
}
export class Popper implements WordPartyModule {
  private confetti = new JSConfetti({
    canvas: document.getElementById('popper') as HTMLCanvasElement
  })
  private options: PopperConfig = {
    use: true,
    items: []
  }
  constructor(_op: Partial<PopperConfig> = {}) {
    Object.assign(this.options, _op)
    document.body.addEventListener('mousedown', (e: MouseEvent) => {
      this.options.items.forEach((item) => {
        if (e.button === item.trigger) {
          e.preventDefault()
          this._confetti(item)
        }
      })
    })
  }
  _confetti = async (config: PopperItemConfig) => {
    return this.confetti.addConfetti(config)
  }
  verify(comments: string[]) {
    this.options.items.forEach(item => {
      let total = 0
      item.pattern.forEach(ptt => {
        if (typeof ptt === 'string') {
          ptt = new RegExp(ptt, 'igm')
        }
        total += comments.reduce((count, comment) => {
          if (comment.search(ptt) !== -1) {
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

