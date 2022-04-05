import { WordPartyItem } from '../index'
import { DropperItemConfig } from './dropper'
import { NotifyItemConfig } from './notify'
import { PopperItemConfig } from './popper'

export type WordPartyItemOption = PopperItemConfig | DropperItemConfig | NotifyItemConfig
export interface WordPartyTriggerParams {
  comment: string
  hitCount: number
}
export interface WordPartyModule {
  fire(config: WordPartyItemOption, params: WordPartyTriggerParams): void
  destroy(): void
}
export class WordPartyModules {
  private _modules: Map<string, WordPartyModule> = new Map()
  initialize() {
    this.destroy()
  }
  register(id: string, module: WordPartyModule) {
    this._modules.set(id, module)
  }
  unregister(id: string) {
    const mod = this._modules.get(id)
    if (mod) {
      mod.destroy()
      this._modules.delete(id)
    }
  }
  destroy() {
    this._modules.forEach(mod => {
      mod.destroy()
    })
    this._modules.clear()
  }
  fire(config: WordPartyItem, comment: string, hitCount: number) {
    const mod = this._modules.get(config.effect)
    if (mod) {
      mod.fire(config.options, {
        comment,
        hitCount
      })
    }
  }
}