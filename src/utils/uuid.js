
function createRandomString(length){
  let str='';
  while(length>0){
    const fragment= Math.random().toString(16).substring(2);
    if(length>fragment.length){
      str+=fragment;
      length-=fragment.length;
    }else{
      str+=fragment.substring(0,length);
      length=0;
    }
  }
  return str;
}

export default function uuid (){
  return `${createRandomString(8)}-${createRandomString(4)}-${createRandomString(4)}-${createRandomString(4)}-${createRandomString(12)}`
}