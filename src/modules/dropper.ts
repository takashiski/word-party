import { Engine, Render, Runner, Bodies, Composite } from 'matter-js'
import { Comment } from 'common/types/Comment'
import { WordPartyModule } from './index'
const WALL_SIZE = 30
const WALL_OPTION = {
  isStatic: true,
  render: {
    fillStyle: 'transparent'
  }
}
const LIFE_TIME = 3000
interface SpliteTexture {
  src: string
  size: number
  xScale?: number
  yScale?: number
}
export interface DropperConfig {
  use?: boolean
  trigger?: number
  pattern: (RegExp | string)[]
  textures: SpliteTexture[]
  lifeTime?: number
  magnification?: number
  maxItems?: number
}
const DEFAULT_CONFIG: Required<DropperConfig> = {
  use: true,
  trigger: -1,
  pattern: [/w/gim],
  lifeTime: 3000,
  textures: [],
  magnification: 3,
  maxItems: 50,
}
class DropItem {
  private _item: Matter.Body
  private _timer: number
  get body() {
    return this._item
  }
  constructor(
    public x: number,
    public y: number,
    public lifeTime: number,
    public texture: SpliteTexture,
    public callback: (item: Matter.Body) => void
  ) {
    this._item = Bodies.circle(
      x,
      y,
      texture.size,
      {
        // density: 0.0005, // 密度: 単位面積あたりの質量
        // frictionAir: 0.06, // 空気抵抗(空気摩擦)
        restitution: 0.9, // 弾力性
        // friction: 0.01, // 本体の摩擦
        // angle: -Math.PI * 0.15,
        render: {
          sprite: {
            texture: texture.src,
            xScale: texture.xScale || 1,
            yScale: texture.yScale || 1,
          }
        }
      })
    this._timer = setTimeout(() => {
      callback(this._item)
    }, lifeTime)
  }
  remove() {
    clearTimeout(this._timer)
    this.callback(this._item)
  }
}
export class Dropper implements WordPartyModule {
  public stageWidth = window.innerWidth
  public stageHeight = window.innerHeight
  public engine = Engine.create()
  public render: Render
  public options: DropperConfig = Object.assign({}, DEFAULT_CONFIG)
  private _items: DropItem[] = []
  constructor(_op: DropperConfig) {
    Object.assign(this.options, _op)
    const canvas = document.getElementById('dropper') as HTMLCanvasElement
    this.render = Render.create({
      canvas,
      engine: this.engine,
      options: {
        background: 'transparent',
        width: this.stageWidth,
        height: this.stageHeight,
        // hasBounds: true,
        wireframes: false,
        // showSleeping: true,
        // showDebug: true,
        // showBroadphase: true,
        // showBounds: true,
        // showVelocity: true,
        // showCollisions: true,
        // showSeparations: true,
        // showAxes: true,
        // showPositions: true,
        // showAngleIndicator: false,
        // showIds: false,
        // showShadows: false,
        // showVertexNumbers: false,
        // showConvexHulls: true,
        // showInternalEdges: true
      }
    })

    const leftWall = Bodies.rectangle(-(WALL_SIZE / 2 - 1), this.stageHeight / 2, WALL_SIZE, this.stageHeight, WALL_OPTION)
    const rightWall = Bodies.rectangle(this.stageWidth + WALL_SIZE / 2 - 1, this.stageHeight / 2, WALL_SIZE, this.stageHeight, WALL_OPTION)
    const ground = Bodies.rectangle(this.stageWidth / 2, this.stageHeight + WALL_SIZE / 2 - 1, this.stageWidth, WALL_SIZE, WALL_OPTION)

    Composite.add(this.engine.world, [ground, leftWall, rightWall])
    Render.run(this.render)

    const runner = Runner.create()
    Runner.run(runner, this.engine)

    document.body.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button === this.options.trigger) {
        e.preventDefault()
        this.drop(e.clientX, e.clientY)
      }
    })
  }
  drop(x: number = Math.random() * this.stageWidth, y: number = Math.random() * this.stageHeight / 3) {
    const texture = this.options.textures[Math.floor(Math.random() * this.options.textures.length)]
    const item = new DropItem(x, y, this.options.lifeTime || DEFAULT_CONFIG.lifeTime, texture, (body) => {
      Composite.remove(this.engine.world, body)
    })
    this._items.unshift(item)
    Composite.add(this.engine.world, [item.body])

    const max = this.options.maxItems || DEFAULT_CONFIG.maxItems
    if (this._items.length > max) {
      const deleted = this._items.splice(max, this._items.length)
      deleted.forEach((d) => {
        d.remove()
      })
    }
  }
  verify(comments: Comment[]) {
    const total = comments.reduce((count, comment) => {
      return this.options.pattern.reduce((c, ptt) => {
        if (typeof ptt === 'string') {
          ptt = new RegExp(ptt, 'igm')
        }
        const len = comment.data.comment.split(ptt).length - 1
       return c + len
      }, count)
    }, 0)
    const mag = this.options.magnification || DEFAULT_CONFIG.magnification
    for (let i = 0; i < total * mag; i++) {
      this.drop()
    }
  }
}

