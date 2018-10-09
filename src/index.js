import Dttrace from './dttrace'
import autoPageTrace from './autoPageTrace'
import autoAppTrace from './autoAppTrace'

function AutoPageTrace(dttrace) {
  return function(target) {
    autoPageTrace(target.prototype,dttrace)
    return target
  }
}

function AutoAppTrace(dttrace) {
  return function(target) {
    autoAppTrace(target.prototype,dttrace)
    return target
  }
}


export {
  Dttrace,
  autoPageTrace,
  autoAppTrace,
  AutoPageTrace,
  AutoAppTrace
}
