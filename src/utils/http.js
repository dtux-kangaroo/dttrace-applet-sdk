function http(method,url,data){
  return new Promise ((resolve,reject)=>{
    wx.request({
      url,
      method,
      data,
      success:res=>resolve(res),
      fail:err=>reject(err.errMsg)
    })
  })
}

export default {
  post:(url,data)=>http('post',url,data),
  get:(url,data)=>http('get',url,data)
}