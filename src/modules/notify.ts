import { Comment } from 'common/types/Comment'
import { WordPartyModule } from 'modules'
interface NotifyItemConfig {
  pattern: (RegExp | string)[],
  image: string
  images: string[]
  lifeTime: number
  trigger?: number
  only?: boolean
  width?: number
  height?: number
  x?: number | [number, number]
  y?: number | [number, number]
}
export interface NitifyConfig {
  use?: boolean
  items: NotifyItemConfig[]
  maxItems?: number
}
const SAFE_MARGIN = 300
class NotifyItem {
  private _element: HTMLDivElement = document.createElement('div')
  private _timer: number
  constructor(public parent: HTMLElement, public conf: NotifyItemConfig, callback: (item: NotifyItem) => void) {
    const src = conf.images ? conf.images[Math.floor(Math.random() * conf.images.length)] : conf.image
    
    if (src.endsWith('.webm')) {
      const video = document.createElement('video')
      video.src = src
      video.style.pointerEvents = 'none'
      video.autoplay = true
      video.muted = true
      if (conf.width) {
        video.width = conf.width
      }
      if (conf.height) {
        video.height = conf.height
      }
      this._element.appendChild(video)
    } else {
      const img = new Image()
      img.src = src + `?${Date.now()}`
      if (conf.width) {
        img.width = conf.width
      }
      if (conf.height) {
        img.height = conf.height
      }
      this._element.appendChild(img)
    }
    const x = typeof conf.x === 'number' ? conf.x : this._getRandomPositionX(conf.x)
    const y = typeof conf.y === 'number' ? conf.y : this._getRandomPositionY(conf.y)
    this._element.className = 'notify'
    this._element.style.transform = `translate(${x}px, ${y}px)`;
    
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
  private options: NitifyConfig = {
    items: [],
    maxItems: 20
  }
  private _container: HTMLElement = document.getElementById('notify') as HTMLElement
  private _items: NotifyItem[] =[]
  constructor(_op: NitifyConfig) {
    Object.assign(this.options, _op)
    document.body.addEventListener('mousedown', (e: MouseEvent) => {
      const item = this.options.items.find(item => item.trigger === e.button)
      if (item) {
        e.preventDefault()
        this.showItem(item, e.clientX, e.clientY)
      }
    })
  }
  showItem(conf: NotifyItemConfig, x: number = NaN, y: number = NaN) {
    const config = Object.assign({}, conf)
    if (!isNaN(x)) {
      config.x = x
    }
    if (!isNaN(y)) {
      config.y = y
    }
    const n = new NotifyItem(this._container, config, (item) => {
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
    const max = this.options.maxItems || 20
    if (this._items.length > max) {
      const deleted = this._items.splice(max, this._items.length)
      deleted.forEach((d) => {
        d.remove()
      })
    }
  }
  verify(comments: string[]): void {
    const hits: NotifyItemConfig[] = []
    comments.forEach((comment) => {
      const hit = this.options.items.find((item) => {
        return item.pattern.some((ptt) => {
          if (typeof ptt === 'string') {
            ptt = new RegExp(ptt, 'gim')
          }
          if (comment.search(ptt) !== -1) {
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