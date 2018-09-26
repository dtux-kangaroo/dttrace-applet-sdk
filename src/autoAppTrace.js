import Dttrace from './dttrace'
import warning from './utils/warning'
import isPlainObject from './utils/isPlainObject'
export default function autoAppTrace(dttrace,options){
  if(dttrace instanceof Dttrace){

    if(isPlainObject(options)){
      dttrace.launchRocket(2003,{
        $path: options.path,
        $query: options.query,
        $scene: options.scene,
        $share_ticket: options.shareTicket,
        $referrer_info: options.referrerInfo
      })
    }else{
      warning('Expected the third argument to be a plain object') 
    }

    let isFirst = true
    let appEnterTime
    for(const attr in dttrace){
      if(dttrace.hasOwnProperty(attr)){
        if(attr.indexOf('on')>-1){
          switch(attr){
            case 'onShow':
              const oldShow = this.onShow
              this.onShow = function(){
                if(!isFirst){
                  appEnterTime = new Date().getTime()
                  dttrace.launchRocket(2008,{
                    $enter_time: appEnterTime
                  })
                }else{
                  isFirst = false
                }
                oldShow.apply(this,arguments);
              }
              break
            case 'onHide':
              const oldHide = this.onHide
              this.onHide = function(){
                dttrace.launchRocket(2009,{
                  $enter_time: appEnterTime,
                  $leave_time: new Date().getTime()
                })
                oldHide.apply(this,arguments)
              }
              break
            case 'onHide':  
            default: 
          }
        }
      }
    }
  }else{
    warning('Expected the argument to be a Dttrace') 
  }
}