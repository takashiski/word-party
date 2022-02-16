import { Comment } from 'common/types/Comment'
// 独自拡張で画像が使えるバージョン
// @ts-ignore
import JSConfetti from 'lib/js-confetti'
import { WordPartyModule } from 'modules'
export interface PopperConfig {
  use?: boolean
  trigger?: number
  pattern: (RegExp | string)[]
  confettiRadius?: number,
  confettiNumber?: number,
  confettiColors?: string[],
  emojis?: string[],
  emojiSize?: number,
  images?: string[]
}
export class Popper implements WordPartyModule {
  private confetti = new JSConfetti({
    canvas: document.getElementById('popper') as HTMLCanvasElement
  })
  private options: PopperConfig = {
    use: true,
    trigger: -1,
    pattern: [/8+|👏+/gim]
  }
  constructor(_op: Partial<PopperConfig> = {}) {
    Object.assign(this.options, _op)
    document.body.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button === this.options.trigger) {
        e.preventDefault()
        this._confetti()
      }
    })
  }
  _confetti = async () => {
    return this.confetti.addConfetti(this.options)
  }
  verify(comments: Comment[]) {
    const total = comments.reduce((count, comment) => {
      return this.options.pattern.reduce((c, ptt) => {
        if (typeof ptt === 'string') {
          ptt = new RegExp(ptt, 'igm')
        }
        if (comment.data.comment.search(ptt) !== -1) {
          return c + 1
        }
        return c
      }, count)
    }, 0)
    for (let i = 0; i < Math.min(total, 10); i++) {
      setTimeout(this._confetti, i * 200)
    }
  }
}

