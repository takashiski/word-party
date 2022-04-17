import { WordPartyTriggerParams, WordPartyModule } from './index';
export interface NotifyItemConfig {
  lifeTime: number
  images: string[]
  x?: number | [number, number]
  y?: number | [number, number]
  width?: number
  height?: number
  only?: boolean
}
export interface NotifyConfig {
  maxItems: number
}
const SAFE_MARGIN = 300
class NotifyItem {
  private _element: HTMLDivElement = document.createElement('div')
  private _timer: number
  constructor(public parent: HTMLElement, public conf: NotifyItemConfig, callback: (item: NotifyItem) => void) {
    const src = conf.images[Math.floor(Math.random() * conf.images.length)]
    
    if (src.endsWith('.webm')) {
      const video = document.createElement('video')
      video.src = src
      video.style.pointerEvents = 'none'
      video.autoplay = true
      if (conf.width) {
        video.width = conf.width
      }
      if (conf.height) {
        video.height = conf.height
      }
      this._element.appendChild(video)
    } else if (src.endsWith('.mp3') || src.endsWith('.wav')) {
      const audio = document.createElement('audio')
      audio.src = src
      audio.style.pointerEvents = 'none'
      audio.autoplay = true
      this._element.appendChild(audio)
    } else {
      const img = new Image()
      if(src.startsWith('data:')) {
        img.src = src
      } else {
        img.src = src + `?${Date.now()}`
      }
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
    this._timer = window.setTimeout(() => {
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
  private options: NotifyConfig = {
    maxItems: 20
  }
  private _container: HTMLElement = document.getElementById('notify') as HTMLElement
  private _items: NotifyItem[] =[]
  constructor(_op: NotifyConfig) {
    Object.assign(this.options, _op)
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
  fire(config: NotifyItemConfig, {}: WordPartyTriggerParams): void {
    this.showItem(config)
  }
  destroy(): void {
    this._items.forEach((d) => {
      d.remove()
    })
    this._items = []
  }
}