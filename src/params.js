
import warning from './utils/warning'
import isPlainObject from './utils/isPlainObject'
import options from './options'
import uuid from './utils/uuid'
//SDK预置参数
const defaultParams = {
  $DTTID:uuid()
}
//用户自定义参数
const customParams = {}

//获取系统信息
function getSystemInfo(){
  const {brand,model,pixelRatio,windowWidth,windowHeight,system,language,version} = wx.getSystemInfoSync()
  return {
    $device_model:model,
    $brand:brand,
    $resolution:pixelRatio,
    $screen_width:windowWidth,
    $screen_height:windowHeight,
    $os:system.split(' ')[0],
    $os_version:system.split(' ')[1],
    $language:language,
    $wx_version:version
  }
}

const get = (name)=>{
  const currentParams = Object.assign({},defaultParams,getSystemInfo(),{
    $user_id:options.get('getUserId')()
  },customParams);
  if(name) {
    return currentParams[name]
  }else{
    return currentParams
  }
}

const set = (newParams)=>{
  if(isPlainObject){
    Object.assign(customParams,newParams);
  }else{
    warning('Expected argument to be an object')
  }
}

export default {
  get,
  set
}