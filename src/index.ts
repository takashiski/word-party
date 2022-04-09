import { WordPartyItemOption, WordPartyModules } from './modules/index';
import { Comment } from './common/types/Comment'
import { NotifyConfig, Notify } from './modules/notify';
import { Popper, PopperConfig } from './modules/popper';
import { Dropper, DropperConfig } from './modules/dropper';
import striptags from 'striptags'
import merge from 'lodash.merge'
const IMAGE_ALT = /<img\s.*?alt=\"(.*?)\"\s?.*?\/?>/g

type WordPartyEffect = 'popper' | 'dropper' | 'notifier'
export interface WordPartyItem {
  pattern: (RegExp | string)[]
  effect: WordPartyEffect
  trigger: number
  options: WordPartyItemOption
}
interface WordPartyOptions {
  apiPort: number
  modules: {
    popper: PopperConfig
    dropper: DropperConfig
    notifier: NotifyConfig
  }
}
const DEFAULT_OPTIONS = {
  apiPort: 11180,
  modules: {
    popper: {
      maxItems: 20,
    },
    dropper: {
      maxItems: 20,
    },
    notifier: {
      maxItems: 20,
    }
  }
}
class WordParty {
  public Modules = new WordPartyModules()
  private _items: WordPartyItem[] = []
  private _options: WordPartyOptions = merge({}, DEFAULT_OPTIONS)
  init(options: WordPartyOptions) {
    this._options = merge(DEFAULT_OPTIONS, options)
    this.Modules.initialize()
    const popper = new Popper(this._options.modules.popper)
    this.Modules.register('popper', popper)
    const dropper = new Dropper(this._options.modules.dropper)
    this.Modules.register('dropper', dropper)
    const notify = new Notify(this._options.modules.notifier)
    this.Modules.register('notifier', notify)

    document.body.removeEventListener('mousedown', this._handleOnMouseDown)
    document.body.addEventListener('mousedown', this._handleOnMouseDown)
    
    document.body.removeEventListener('contextmenu', this._handleOnContextMenu)
    document.body.addEventListener('contextmenu', this._handleOnContextMenu)
    return this
  }
  private _handleOnMouseDown = (e: MouseEvent) => {
    const matches = this._items.filter(item => {
      return item.trigger === e.button
    })
    matches.forEach(match => {
      this.Modules.fire(match, `mousedown.${e.button}`, 1)
    })
  }
  private _handleOnContextMenu = (e: MouseEvent) => {
    e.preventDefault()
  }
  setup(items: WordPartyItem[], ) {
    this._items = items
    return this
  }
  destroy() {
    this.Modules.destroy()
    this._items = []
    this._options = merge({}, DEFAULT_OPTIONS)
  }
  start() {
    let lastCommentId: null | string = null
    const OneSDK = (window as any).OneSDK
    OneSDK.setup({
      port: this._options.apiPort,
      commentLimit: 20
    })
    OneSDK.subscribe((comments: Comment[]) => {
      if (lastCommentId === null) {
        const last = comments[comments.length - 1]
        if (last) {
          lastCommentId = last.data.id
        } else {
          lastCommentId = ''
        }
      }
      const index = comments.findIndex(comment => {
        return comment.data.id === lastCommentId
      })
      const diff = comments.slice(index === -1 ? 0 : index + 1)
      if (diff.length !== 0) {
        lastCommentId = diff[diff.length - 1].data.id
        this.verify(diff)
      }
    })
    OneSDK.connect()
    return this
  }
  verify(comments: Comment[]) {
    const commentStrings = this._formatComments(comments)
    this._items.forEach(item => {
      item.pattern.forEach(ptt => {
        const pattern: RegExp = typeof ptt === 'string' ? new RegExp(ptt, 'igm') : ptt
        commentStrings.forEach((comment) => {
          const hitCount = comment.split(pattern).length - 1
          if (hitCount !== 0) {
            this.Modules.fire(item, comment, hitCount)
          }
        })
      })
    })
  }
  private _formatComments(comments: Comment[]) {
    return comments.map((comment) => {
      let com = striptags(comment.data.comment.replace(IMAGE_ALT, '$1'))
      if (comment.service === 'youtube' && comment.data.paidText) {
        com = `${comment.data.paidText} ${com}`
      }
      if (comment.data.hasGift) {
        com = `__GIFT__ ${com}`
      }
      if (comment.data.isFirstTime) {
        com = `__NEW__ ${com}`
      }
      return com
    })
  }
}
export default new WordParty()