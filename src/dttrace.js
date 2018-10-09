import warning from './utils/warning' 
import isPlainObject from './utils/isPlainObject'
import options from './options'
import params from './params'
import http from './utils/http'
import uuid from './utils/uuid'
import md5 from './utils/md5'
const hex_md5=md5.hex_md5;

//检测是否为undefined、null、空字符串
function isNone(arg){
  return arg === undefined || arg === null || arg === ''
}

//获取openid和unionid
function code2SessionTrace({appid,appSecret,code2SessionUrl}){
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:1000,
      success:loginResponse=>{
        const {code} = loginResponse
        console.log(code)
        wx.request({
          url:code2SessionUrl,
          data:{
            appid,
            appSecret,
            js_code:code,
            grant_type:'authorization_code'
          },
          success:sessionResponse=> resolve(sessionResponse),
          fail:(err)=>reject(err)
        })
      },
      fail:(err)=>reject(err)
    })
  })
}


//检验必填参数
function checkRequiredConfig (config){
  let flag = true
  const {appKey,appletId,appletSecret} = config
  if(isNone(appKey)){
    warning('Expected the appKey to not be undefined or null or null character string')
    flag=false
  }else if(isNone(appletId)){
    warning('Expected the appletId to not be undefined or null or null character string')
    flag=false
  }else if(isNone(appletSecret)){
    warning('Expected the appletSecret to not be undefined or null or null character string')
    flag=false
  }
  return flag;
}

class Dttrace{
  constructor(config){
    this.options = options
    this.params = params
    if(checkRequiredConfig(config)){
      const {appKey,server,appletId,appletSecret} = config
      const newOptions = {
        appKey,
        appletId,
        appletSecret
      }
      if(server) this.options.set('server',server)
      //全局参数
      if(config.params!==undefined){
        if(isPlainObject(config.params)){
          this.params.set(config.params)
        }else{
          warning('Expected the params in config to be an object')
        }
      }
      //设置DTTID
      if(wx.getStorageSync('$DTTID')===''){
        wx.setStorageSync('$DTTID',uuid())
      }
      this.options.set(newOptions)
    }
  }
  
  launchRocket(eventId,otherParams){
    if(typeof eventId !== 'number') throw new Error('Expected the first argument to be a number')
    const {server,appKey} = this.options.get()
    const defaultParams = this.params.get()
    const timestamp = new Date().getTime()

    new Promise((resolve,reject)=>{
      const openid = this.params.get('$open_id')
      const unionid = this.params.get('$union_id')
      console.log(this.params.get())

      if(isNone(openid)||isNone(unionid)){
        //获取openid和unionid
        code2SessionTrace({
          appid:this.options.get('appletId'),
          appSecret:this.options.get('appletSecret'),
          code2SessionUrl:this.options.get('code2SessionUrl')
        }).then(response=>{
          const {openid,unionid} = response
          this.params.set({
            $open_id:openid,
            $union_id:unionid
          })
          resolve()
        }).catch(err=>reject(err));
      }else{
        resolve()
      }
    }).then(()=>{
      wx.getNetworkType({
        success(res){
          if(res.networkType!== 'none'){
            const finalParams = Object.assign({},defaultParams,otherParams,{
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
    }).catch(err=>{
      warning(err.message)
    })
  }
}


export default Dttrace