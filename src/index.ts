import { Popper, PopperConfig } from './modules/popper';
import { Dropper, DropperConfig } from './modules/dropper';
import { ONE_SDK  } from './sdk/sdk'
import { Comment } from './common/types/Comment'
import { WordPartyModule } from 'modules';
import { NitifyConfig, Notify } from 'modules/notify';

import striptags from 'striptags'
const IMAGE_ALT = /<img\s.*?alt=\"(.*?)\"\s?.*?\/?>/g

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
    const commentString = comments.map((comment) => {
      let com = striptags(comment.data.comment.replace(IMAGE_ALT, '$1'))
      if (comment.data.isFirstTime) {
        com = `__NEW__ ${com}`
      }
      if (comment.service === 'youtube' && comment.data.paidText) {
        com = `${comment.data.paidText} ${com}`
      }
      if (comment.data.hasGift) {
        com = `__GIFT__ ${com}`
      }
      return com
    })
    modules.forEach(mod => {
      mod.verify(commentString)
    })
  })
  document.body.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
}

(window as any).WordParty = {
  start: main
}