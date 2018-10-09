import warning from './utils/warning'
import isPlainObject from './utils/isPlainObject'

const options = {
  appKey:'',
  server:'https://log.dtstack.net:7001',
  code2SessionUrl:'https://api.weixin.qq.com/sns/jscode2session',
  appletId:'',
  appletSecret:''
}

const get = (name)=>{
  if(name){
    return options[name]
  }else{
    return options
  }
}

const set = (newOption)=>{
  if(isPlainObject(newOption)){
    return Object.assign(options,newOption)
  }else{
    warning("Expected the argument to be a plain object")
  }
}
export default {
  get,
  set
}