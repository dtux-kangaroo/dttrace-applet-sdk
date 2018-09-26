import warning from './utils/warning'

const options = {
  appKey:'',
  server:'http://172.16.10.89:7001/',
  getUserId(){
    return ''
  },
  getOpenId(){
    return ''
  }
}

const get = (name)=>{
  if(name){
    return options[name]
  }else{
    return options
  }
}

const set = (name,value)=>{
  if(!name){
    warning("Expected the first argument to be a string")
  }else if(!value&&value!==0){
    warning("Expected the second argument to not be null or undefined or null character string")
  }else{
    return Object.assign(options,{
      [name]:value
    })
  }
}
export default {
  get,
  set
}