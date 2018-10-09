import Dttrace from './dttrace'
import warning from './utils/warning'
let appEnterTime
export default function autoAppTrace(module,dttrace){
  if(typeof dttrace === 'string' || dttrace instanceof Dttrace){
    let isFirst = true
    const oldLaunchHandler = module.onLaunch
    const oldShowHanler = module.onShow
    const oldHideHanler= module.onHide
    module.onLaunch = function(options){
      const instance = typeof dttrace === 'string' ? this[dttrace] : dttrace
      instance.launchRocket(2003,{
        $launch_time: new Date().getTime(),
        $path: options.path,
        $query: options.query,
        $scene: options.scene,
        $share_ticket: options.shareTicket,
        $referrer_info: options.referrerInfo
      })
      typeof oldLaunchHandler === 'function' && oldLaunchHandler.apply(this,arguments)
    }
    module.onShow = function(options){
      const instance = typeof dttrace === 'string' ? this[dttrace] : dttrace
      appEnterTime = new Date().getTime()
      if(!isFirst){
        instance.launchRocket(2008,{
          $enter_time: appEnterTime,
          $path: options.path,
          $query: options.query,
          $scene: options.scene,
          $share_ticket: options.shareTicket,
          $referrer_info: options.referrerInfo
        })
      }else{
        isFirst = false
      }
      typeof oldShowHanler === 'function' && oldShowHanler.apply(this,arguments)
    }
    module.onHide = function(){
      const instance = typeof dttrace === 'string' ? this[dttrace] : dttrace
      const appLeaveTime = new Date().getTime()
      instance.launchRocket(2009,{
        $enter_time: appEnterTime,
        $leave_time: appLeaveTime,
        $stay_time: appLeaveTime - appEnterTime
      })
      typeof oldHideHanler === 'function' && oldHideHanler.apply(this,arguments)
    }
  }else{
    warning('Expected the second argument to be a string or an instance of Dttrace') 
  }
  return module
}