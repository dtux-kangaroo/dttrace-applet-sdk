
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
  const {
    brand,model,
    pixelRatio,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    statusBarHeight,
    system,language,
    version,
    platform,
    fontSizeSetting,
    SDKVersion,
    benchmarkLevel
  } = wx.getSystemInfoSync()
  return {
    $device_model:model,
    $brand:brand,
    $pixel_ratio:pixelRatio,
    $screen_width:screenWidth,
    $screen_height:screenHeight,
    $window_width:windowWidth,
    $window_height:windowHeight,
    $status_bar_height:statusBarHeight,
    $os:system.split(' ')[0],
    $os_version:system.split(' ')[1],
    $language:language,
    $wx_version:version,
    $platform:platform,
    $font_size_setting:fontSizeSetting,
    $wx_sdk_version:SDKVersion,
    $bench_mark_level:benchmarkLevel
  }
}

const get = (name)=>{
  const currentParams = Object.assign({},defaultParams,getSystemInfo(),customParams);
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