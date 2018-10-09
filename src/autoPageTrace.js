import Dttrace from './dttrace'
import warning from './utils/warning'
export default function autoPageTrace(module,dttrace){
  if(typeof dttrace === 'string' || dttrace instanceof Dttrace){
    let pageEnterTime,$url_path,$referrer,$query
    const oldLoadHandler = module.onLoad
    const oldShowHanler = module.onShow
    const oldHideHanler= module.onHide

    module.onLoad = function(query){
      const pages = getCurrentPages();
      $query = query
      $url_path = pages[pages.length - 1].route
      $referrer = pages.length>1?pages[pages.length - 2].route:'直接打开'
      typeof oldLoadHandler === 'function'&& oldLoadHandler.apply(this,arguments)
    }
    module.onShow = function(){
      const instance = typeof dttrace === 'string' ? this[dttrace] : dttrace
      pageEnterTime = new Date().getTime()
      instance.launchRocket(3001,{
        $query,
        $url_path ,
        $referrer, 
        $enter_time: pageEnterTime
      })
      typeof oldShowHanler === 'function'&& oldShowHanler.apply(this,arguments)
    }
    module.onHide = function(){
      const instance = typeof dttrace === 'string' ? this[dttrace] : dttrace
      const pageLeaveTime = new Date().getTime()
      instance.launchRocket(3002,{
        $url_path ,
        $referrer, 
        $enter_time: pageEnterTime,
        $leave_time: pageLeaveTime,
        $stay_time: pageLeaveTime - pageEnterTime
      })
      typeof oldHideHanler === 'function'&& oldHideHanler(arguments)
    }
  }else{
    warning('Expected the second argument to be a string or an instance of Dttrace') 
  }
  return module
}