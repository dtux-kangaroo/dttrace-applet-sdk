import warning from './utils/warning' 
import isPlainObject from './utils/isPlainObject'
import options from './options'
import params from './params'
import http from './utils/http'
import md5 from './utils/md5';
const hex_md5=md5.hex_md5;

//检验必填参数
function checkRequiredConfig (config){
  let flag = true
  const {appKey} = config
  if(appKey === undefined || appKey === null || appKey === ''){
    warning('Expected the name to not be undefined or null or null character string')
    flag=false
  }
  return flag;
}

class Dttrace{
  constructor(config){
    this.options = options
    this.params = params
    if(checkRequiredConfig(config)){
      const {appKey,server,getUserId,getOpenId} = config
      this.options.set('appKey',appKey)
      this.options.set('isInitialize',true)
      if(server) this.options.set('server',server)
      //userId获取
      if(getUserId !== undefined){
        if(typeof getUserId === 'function'){
          this.options.set('getUserId',getUserId)
        }else{
          warning('Expected the getUserId in config to be a function')
        }
      }
      //openId获取
      if(getOpenId !== undefined){
        if(typeof getOpenId === 'function'){
          this.options.set('getOpenId',getOpenId)
        }else{
          warning('Expected the getOpenId in config to be a function')
        }
      }
      //全局参数
      if(config.params!==undefined){
        if(isPlainObject(config.params)){
          this.params.set(config.params)
        }else{
          warning('Expected the params in config to be an object')
        }
      }
    }
  }
  launchRocket(eventId,otherParams){
    if(typeof eventId !== 'number') throw new Error('Expected the first argument to be a number')
    const {server,appKey} = this.options.get()
    const data = this.params.get()
    const timestamp = new Date().getTime()
    wx.getNetworkType({
      success(res){
        if(res.networkType!== 'none'){
          const finalParams = Object.assign({},data,otherParams,{
            $timestamp:timestamp,
            $token:hex_md5(appKey + timestamp.toString()),
            $network_type:res.networkType,
            $event_id:eventId
          })
          console.log(finalParams)
          http.post(server,finalParams).then(res=>{
            const {success,message} = res
            if(!success) warning(message)
          })
        }else{
          warning('Network Error')
        }
      }
    })
  }
}


export default Dttrace