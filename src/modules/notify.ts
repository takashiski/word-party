import { Comment } from 'common/types/Comment'
import { WordPartyModule } from 'modules'
interface NotifyItemConfig {
  pattern: (RegExp | string)[],
  image: string
  lifeTime: number
  only?: boolean
  width?: number
  height?: number
  x?: number | [number, number]
  y?: number | [number, number]
}
export interface NitifyConfig {
  items: NotifyItemConfig[]
  maxItems?: number
}
const SAFE_MARGIN = 300
class NotifyItem {
  private _element: HTMLDivElement = document.createElement('div')
  private _timer: number
  constructor(public parent: HTMLElement, public conf: NotifyItemConfig, callback: (item: NotifyItem) => void) {
    const img = new Image()
    img.src = conf.image
    if (conf.width) {
      img.width = conf.width
    }
    if (conf.height) {
      img.height = conf.height
    }
    const x = typeof conf.x === 'number' ? conf.x : this._getRandomPositionX(conf.x)
    const y = typeof conf.y === 'number' ? conf.y : this._getRandomPositionY(conf.y)

    this._element.className = 'notify'
    this._element.style.transform = `translate(${x}px, ${y}px)`;
    this._element.appendChild(img)
    this.parent.appendChild(this._element)
    this._timer = setTimeout(() => {
      this.remove()
    }, conf.lifeTime || 5000)
  }
  private _getRandomPosition(range: [number, number] | undefined) {
    if (range) {
      return Math.random() * (range[1] - range[0]) + range[0]
    }
  }
  private _getRandomPositionX(range: [number, number] | undefined) {
    if (range) {
      return this._getRandomPosition(range)
    }
    return Math.floor(Math.random() * window.innerWidth - SAFE_MARGIN + SAFE_MARGIN / 2)
  }
  private _getRandomPositionY(range: [number, number] | undefined) {
    if (range) {
      return this._getRandomPosition(range)
    }
    return Math.floor(Math.random() * window.innerHeight - SAFE_MARGIN + SAFE_MARGIN / 2)
  }
  remove() {
    clearInterval(this._timer)
    if (this._element) {
      this.parent.removeChild(this._element)
      // @ts-ignore
      this._element = null
    }
  }
}
export class Notify implements WordPartyModule {
  private _options: NitifyConfig = {
    items: [],
    maxItems: 20
  }
  private _container: HTMLElement = document.getElementById('notify') as HTMLElement
  private _items: NotifyItem[] =[]
  constructor(_op: NitifyConfig) {
    Object.assign(this._options, _op)
    document.body.addEventListener('click', () => {
      const item = this._options.items[Math.floor(Math.random() * this._options.items.length)]
      this.showItem(item)
    })
  }
  showItem(conf: NotifyItemConfig) {
    const n = new NotifyItem(this._container, conf, (item) => {
      item.remove()
    })
    
    if (conf.only) {
      const index = this._items.findIndex(item => item.conf === conf)
      if (index !== -1) {
        const deleted = this._items.splice(index, 1)
        deleted.forEach((d) => {
          d.remove()
       })
      }
    }
    this._items.unshift(n)
    const max = this._options.maxItems || 20
    if (this._items.length > max) {
      const deleted = this._items.splice(max, this._items.length)
      deleted.forEach((d) => {
        d.remove()
      })
    }
  }
  verify(comments: Comment[]): void {
    const hits: NotifyItemConfig[] = []
    comments.forEach((comment) => {
      const hit = this._options.items.find((item) => {
        return item.pattern.some((ptt) => {
          if (typeof ptt === 'string') {
            ptt = new RegExp(ptt, 'gim')
          }
          if (comment.data.comment.search(ptt) !== -1) {
            return true
          }
          return false
        })
      })
      if (hit) {
        hits.push(hit)
      }
    })
    if (hits.length !== 0) {
      hits.forEach(item => {
        this.showItem(item)
      })
    }
  }
}