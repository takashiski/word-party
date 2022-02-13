import { Popper, PopperConfig } from './modules/popper';
import { Dropper, DropperConfig } from './modules/dropper';
import { ONE_SDK  } from './sdk/sdk'
import { Comment } from './common/types/Comment'
import { WordPartyModule } from 'modules';
import { NitifyConfig, Notify } from 'modules/notify';

interface WordPartyOptions {
  jsonPath: string
  use: {
    popper: boolean
    dropper: boolean
    notify: boolean
  }
  popperConfig: PopperConfig
  dropperConfig: DropperConfig
  notifyConfig: NitifyConfig
}

const DEFAULT_OPTIONS: WordPartyOptions = {
  jsonPath: '../../comment.json',
  use: {
    popper: true,
    dropper: true,
    notify: true
  },
  popperConfig: {
    pattern: ['88', '👏'],
  },
  dropperConfig: {
    pattern: ['ww', '草'],
    textures: [
      {
        src: './paw.png',
        size: 24,
        xScale: 1.5,
        yScale: 1.5
      }
    ]
  },
  notifyConfig: {
    items: [],
    maxItems: 20
  }
}

function main(_op: Partial<WordPartyOptions> = {}) {
  const options = Object.assign({}, DEFAULT_OPTIONS, _op)
  const modules: WordPartyModule[] = []
  if (options.use.popper) {
    const popper = new Popper(options.popperConfig)
    modules.push(popper)
  }
  if (options.use.dropper) {
    const dropper = new Dropper(options.dropperConfig)
    modules.push(dropper)
  }
  if (options.use.notify) {
    const notify = new Notify(options.notifyConfig)
    modules.push(notify)
  }
  ONE_SDK.init(options.jsonPath)
  ONE_SDK.subscribeComment((comments: Comment[]) => {
    modules.forEach(mod => {
      mod.verify(comments)
    })
  })
}

(window as any).WordParty = {
  start: main
}