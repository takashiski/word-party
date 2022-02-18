import { Popper, PopperConfig } from './modules/popper';
import { Dropper, DropperConfig } from './modules/dropper';
import { ONE_SDK  } from './sdk/sdk'
import { Comment } from './common/types/Comment'
import { WordPartyModule } from 'modules';
import { NitifyConfig, Notify } from 'modules/notify';

interface WordPartyOptions {
  jsonPath: string
  popperConfig: PopperConfig
  dropperConfig: DropperConfig
  notifyConfig: NitifyConfig
}

const DEFAULT_OPTIONS: WordPartyOptions = {
  jsonPath: '../../comment.json',
  popperConfig: {
    items: []
  },
  dropperConfig: {
    items: []
  },
  notifyConfig: {
    items: []
  }
}

function main(_op: Partial<WordPartyOptions> = {}) {
  const options = Object.assign({}, DEFAULT_OPTIONS, _op)
  const modules: WordPartyModule[] = []
  if (options.popperConfig.use !== false) {
    const popper = new Popper(options.popperConfig)
    modules.push(popper)
  }
  if (options.dropperConfig.use !== false) {
    const dropper = new Dropper(options.dropperConfig)
    modules.push(dropper)
  }
  if (options.notifyConfig.use !== false) {
    const notify = new Notify(options.notifyConfig)
    modules.push(notify)
  }
  ONE_SDK.init(options.jsonPath)
  ONE_SDK.subscribeComment((comments: Comment[]) => {
    modules.forEach(mod => {
      mod.verify(comments)
    })
  })
  document.body.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
}

(window as any).WordParty = {
  start: main
}