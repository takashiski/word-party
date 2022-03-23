import { Popper, PopperConfig } from './modules/popper';
import { Dropper, DropperConfig } from './modules/dropper';
import { ONE_SDK  } from './sdk/sdk'
import { Comment } from './common/types/Comment'
import { WordPartyModule } from 'modules';
import { NotifyConfig, Notify } from 'modules/notify';

import striptags from 'striptags'
const IMAGE_ALT = /<img\s.*?alt=\"(.*?)\"\s?.*?\/?>/g

interface WordPartyOptions {
  jsonPath: string
  popperConfig: PopperConfig
  dropperConfig: DropperConfig
  notifyConfig: NotifyConfig
}

const DEFAULT_OPTIONS: WordPartyOptions = {
  jsonPath: '../../comment.json',
  popperConfig: {
    use: true,
    maxItems: 20,
    items: []
  },
  dropperConfig: {
    use: true,
    maxItems: 20,
    items: []
  },
  notifyConfig: {
    use: true,
    maxItems: 20,
    items: []
  }
}
let modules: WordPartyModule[] = []

function verify(commentStrings: string[]) {
  modules.forEach(mod => {
    mod.verify(commentStrings)
  })
}

function checkComments(comments: Comment[]) {
  const commentStrings = comments.map((comment) => {
    let com = striptags(comment.data.comment.replace(IMAGE_ALT, '$1'))
    if (comment.service === 'youtube' && comment.data.paidText) {
      com = `${comment.data.paidText} ${com}`
    }
    if (comment.data.hasGift) {
      com = `__GIFT__ ${com}`
    }
    return com
  })
  verify(commentStrings)
}
function destroy() {
  modules.forEach(mod => {
    mod.destroy()
  })
  modules = []
}
function start(_op: Partial<WordPartyOptions> = {}, skitSdk = false) {
  destroy()
  const options = Object.assign({}, DEFAULT_OPTIONS, _op)
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
  if (skitSdk) return
  ONE_SDK.init(options.jsonPath)
  ONE_SDK.subscribeComment(checkComments)
  
  document.body.addEventListener('contextmenu', e => {
    e.preventDefault()
  })
}

export const WordParty = {
  start,
  verify,
  destroy,
  checkComments,
}