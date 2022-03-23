import { Engine, Render, Runner, Bodies, Composite, Body, Events } from 'matter-js'
import { Comment } from 'common/types/Comment'
import { WordPartyModule } from './index'
const WALL_SIZE = 30
const DEFAULT_LIFETIME = 5000
const DEFAULT_DENSITY = 0.001 // 密度: 単位面積あたりの質量
const DEFAULT_FRICTION_AIR = 0.01 // 空気抵抗(空気摩擦)
const DEFAULT_RESTITUTION = 0.9 // 弾力性
const DEFAULT_FRICTION = 0.1 // 本体の摩擦
const WALL_OPTION = {
  isStatic: true,
  render: {
    fillStyle: 'transparent'
  }
}
export interface DropperTextureConfig {
  src: string
  size: number
  xScale: number
  yScale: number
  angle: number
  density: number
  frictionAir: number
  restitution: number
  friction: number
  gravity: number
}
export interface DropperItemConfig {
  trigger: number
  pattern: string[]
  lifeTime: number
  magnification: number
  textures: DropperTextureConfig[]
}
export interface DropperConfig {
  use: boolean
  maxItems: number
  items: DropperItemConfig[]
}
const DEFAULT_CONFIG: Required<DropperConfig> = {
  use: true,
  items: [],
  maxItems: 20,
}
const NOOP = () => {}
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
    public texture: DropperTextureConfig,
    public gravity: number = 0,
    public callback: (item: Matter.Body) => void = NOOP
  ) {
    this._item = Bodies.circle(
      x,
      y,
      texture.size,
      {
        angle: Object.hasOwnProperty.call(texture, 'angle') ? texture.angle : Math.random() * Math.PI * 2,
        density: Object.hasOwnProperty.call(texture, 'density') ? texture.density : DEFAULT_DENSITY, // 密度: 単位面積あたりの質量
        frictionAir: Object.hasOwnProperty.call(texture, 'frictionAir') ? texture.frictionAir : DEFAULT_FRICTION_AIR, // 密度: 単位面積あたりの質量
        restitution: Object.hasOwnProperty.call(texture, 'restitution') ? texture.restitution : DEFAULT_RESTITUTION, // 弾力性
        friction: Object.hasOwnProperty.call(texture, 'friction') ? texture.friction : DEFAULT_FRICTION, // 本体の摩擦
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
  public runner: Runner
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

    this.runner = Runner.create()
    Runner.run(this.runner, this.engine)
    document.body.addEventListener('mousedown', this._onMouseDown)
    Events.on(this.engine, 'beforeUpdate', this._onBeforeUpdate)
  }
  _onBeforeUpdate = () => {
    const gravity = this.engine.gravity;
    this._items.forEach(item => {
      if (item.gravity) {
        Body.applyForce(item.body, item.body.position, {
          x: gravity.x * gravity.scale * item.body.mass * item.gravity,
          y: gravity.y * gravity.scale * item.body.mass * item.gravity
        })
      }
    })
  }
  _onMouseDown = (e: MouseEvent) => {
    this.options.items.forEach((item) => {
      if (e.button === item.trigger) {
        e.preventDefault()
        this.drop(item, e.clientX, e.clientY)
      }
    })
  }
  drop(itemConfig: DropperItemConfig, x = NaN, y = NaN) {
    const texture = itemConfig.textures[Math.floor(Math.random() * itemConfig.textures.length)]
    if (!texture.src) return  
    const position = {
      x,
      y
    }
    if (isNaN(position.x)) {
      position.x = Math.random() * this.stageWidth
    }
    if (isNaN(position.y)) {
      position.y = Math.random() * this.stageHeight / 3
      if (texture.gravity && texture.gravity < 0) {
        position.y += this.stageHeight / 3 * 2
      }
    }
    try {
      const dropItem = new DropItem(position.x, position.y, itemConfig.lifeTime || DEFAULT_LIFETIME, texture, texture.gravity, (body) => {
        Composite.remove(this.engine.world, body)
      })
      this._items.unshift(dropItem)
      Composite.add(this.engine.world, [dropItem.body])
      const max = this.options.maxItems || DEFAULT_CONFIG.maxItems
      if (this._items.length > max) {
        const deleted = this._items.splice(max, this._items.length)
        deleted.forEach((d) => {
          d.remove()
        })
      }
    } catch(e) {
      console.error(e)
    }
  }
  verify(comments: string[]) {
    this.options.items.forEach(item => {
      item.pattern.forEach(ptt => {
        let pattern: RegExp
        if (typeof ptt === 'string') {
          pattern = new RegExp(ptt, 'igm')
        } else {
          pattern = ptt
        }
        let total = comments.reduce((count, comment) => {
          if (comment.search(pattern) !== -1) {
            return count + comment.split(pattern).length - 1
          }
          return count
        }, 0)
        total *= item.magnification || 1
        for (let i = 0; i < total; i++) {
          this.drop(item)
        }
      })
    })
  }
  destroy(): void { 
    document.body.removeEventListener('mousedown', this._onMouseDown)
    Events.off(this.engine, 'beforeUpdate', this._onBeforeUpdate)
    Composite.clear(this.engine.world, false)
    Engine.clear(this.engine);
    Render.stop(this.render);
    Runner.stop(this.runner);
    this.render.textures = {};
  }
}

