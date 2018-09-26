import Dttrace from './dttrace'
import warning from './utils/warning'
export default function autoPageTrace(dttrace){
  if(dttrace instanceof Dttrace){
    let pageEnterTime;
    const pages = getCurrentPages();
    const $url_path = pages[pages.length - 1].route
    const $referrer = pages.length>1?pages[pages.length - 2].route:'直接打开'
    for(const attr in this){
      if(this.hasOwnProperty(attr)){
        if(attr.indexOf('on')>-1){
          switch(attr){
            case 'onShow':
              const oldShow = this.onShow
              this.onShow = function(){
                pageEnterTime = new Date().getTime()
                dttrace.launchRocket(3001,{
                  $url_path ,
                  $referrer, 
                  $enter_time: pageEnterTime
                })
                oldShow.apply(this,arguments)
              }
              
              break
            case 'onHide':
              const oldHide = this.onHide
              this.onHide = function(){
                dttrace.launchRocket(3002,{
                  $url_path,
                  $referrer,
                  $enter_time: pageEnterTime,
                  $leave_time: new Date().getTime()
                })
                oldHide.apply(this,arguments)
              }
              break
            default:
          }
        }
      }
    }
  }else{
    warning('Expected the argument to be a Dttrace') 
  }
}