# dttrace-applet-sdk

## 1. 集成
### 1.1 原生

1.下载符合CommonJS规范的dttrace-applet-sdk到本地的项目里的utils文件下（可根据项目情况选择压缩版或未压缩版）

2.在app.js中导入dttrace-applet-sdk并初始化
```
//app.js
const {Dttrace} = require('./utils/dttrace-applet')
App({
  onLaunch: function (options) {
    ....
  },
  globalData: {
    userInfo: null
  },
  dttrace:new Dttrace({
    appKey: <在DT.Trace上申请的小程序appKey>,
    appletId: <微信小程序的AppID>,
    appletSecret:<微信小程序的AppSecret>
  })
})
```

### 1.2 mpvue
1.下载符合ES6 Modules规范的dttrace-applet-sdk到本地的项目里的utils文件下（可根据项目情况选择压缩版或未压缩版）

2.在src/main.js中导入dttrace-applet-sdk并初始化
```
//main.js
import Vue from 'vue'
import App from './App'
import {Dttrace} from './utils/dttrace-applet.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.dttrace = new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})
const app = new Vue(App)


app.$mount()
```
### 1.3 wepy
1.下载符合ES6 Modules规范的dttrace-applet-sdk到本地的项目里的utils文件下（可根据项目情况选择压缩版或未压缩版）

2.在src/app.wpy中导入dttrace-applet-sdk并初始化
```
//app.wpy
<style lang="less">
  ...
</style>
<script>
import wepy from 'wepy'
import {Dttrace} from './utils/dttrace-applet.js'
wepy.app.prototype.dttrace=wepy.page.prototype.dttrace=new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})
export default class extends wepy.app {
  config = {
    ...
  }
  constructor () {
    super()
    ...
  }
  onLaunch() {
    ...
  }
}
</script>
```
## 2 使用
使用launchRocket方法即可进行埋点操作，launchRocket接收以下两个参数：
- eventId 事件ID，与DT.Trace上定义的事件ID相对应。类型：Number
- otherParams 额外的采集数据。类型：Object
### 2.1 原生
```
const app = getApp()
Page({
  data: {
    ...
  },
  onLoad: function () {
    ...
  },
  onShow: function () {
    //埋点操作
    app.dttrace.launchRocket(3001,{
      tag:'隔壁老王来了'
    })
  }
})
```
### 2.2 mpvue
```
<template>
  ...
</template>
<script>
export default {
  data () {
    return {
      ...
    }
  },
  onShow(){
    //埋点操作
    this.dttrace.launchRocket(3001,{
      tag:'隔壁老王来了'
    })
  },
}
</script>
<style>
  ...
</style>
```
### 2.3 wepy
```
<style lang="less">
  ...
</style>
<template>
  ...
</template>
<script>
export default class Index extends wepy.page {
  config = {
    ...
  }
  data = {
    ...
  }
  onShow(){
    //埋点操作
    this.dttrace.launchRocket(3001,{
      tag:'隔壁老王来了'
    })
  },
}
</script>
```
## 3 预置采集数据
| 名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| $DTTID | String | DT.Trace生成的设备唯一表示 |
| $open_id | String | 对应小程序的openid，用户唯一标识 |
| $union_id | String | 对应小程序的unionid，用户在开放平台的唯一标识符 |
| $device_model | String | 手机型号 |
| $brand | String | 手机品牌	 |
| $pixel_ratio | Number | 设备像素比 |
| $screen_width | Number | 屏幕宽度 |
| $screen_height | Number | 屏幕高度 |
| $window_width | Number | 可使用窗口宽度 |
| $window_height | Number | 可使用窗口高度 |
| $status_bar_height | Number | 状态栏的高度 |
| $os | String | 操作系统 |
| $os_version | String | 操作系统版本 |
| $language | String | 微信设置的语言 |
| $wx_version | String | 微信版本号 |
| $wx_sdk_version | String | 客户端基础库版本 |
| $platform | String | 客户端平台 |
| $font_size_setting | Number | 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px |
| $bench_mark_level | Number | (仅Android小游戏) 性能等级，-2 或 0：该设备无法运行小游戏，-1：性能未知，>=1 设备性能值，该值越高，设备性能越好 (目前设备最高不到50) |
| $event_id | Number | 事件ID，与DT.Trace上定义的事件ID相对应 |
| $network_type | String | 网络类型 |
| $token | String | 用于采集数据上传的校验码 |
| $timestamp | Number | 每次采集数据上传到服务器的时间戳 |

**注：预置采集参数均”$“开头，自定义采集参数请不要以”$“开头，以免混淆。**


## 4 自动化埋点
dttrace-applet-sdk提供名自动化埋点功能，可根据实际情况需要去选择是否集成自动化埋点。

**App**

| 事件名称 | 描述 | 触发时机 |
| ------ | ------ | ------ |
| App.onLaunch | 生命周期回调—监听小程序初始化 | 小程序初始化完成时（全局只触发一次）|
| App.onShow | 生命周期回调—监听小程序显示 | 小程序启动，或从后台进入前台显示时。但是dttrace-applet-sdk会忽略小程序启动这一次|
| App.onHide | 生命周期回调—监听小程序隐藏 | 小程序从前台进入后台时 | 

**App.onLaunch预置采集数据**

| 名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| $launch_time | Number | 小程序初始化完成时间戳
| $path | String | 打开小程序的路径 |
| $query | Object | 打开小程序的query |
| $scene | Number | 打开小程序的场景值 |
| $share_ticket | String | shareTicket |
| $referrer_info | Object | 当场景为由从另一个小程序或公众号或App打开时，返回的信息 |

**App.onShow预置采集数据**

| 名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| $enter_time | Number | 从后台进入前台的时间戳 |
| $path | String | 打开小程序的路径 |
| $query | Object | 打开小程序的query |
| $scene | Number | 打开小程序的场景值 |
| $share_ticket | String | shareTicket |
| $referrer_info | Object | 当场景为由从另一个小程序或公众号或App打开时，返回的信息 |

**App.onHide预置采集数据**

| 名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| $enter_time | Number | 小程序启动或者从后台进入前台的时间戳 |
| $leave_time | Number | 小程序从前台进入后台的时间戳 |
| $stay_time | Number | 小程序停留时长，单位：ms（毫秒） |

**Page**

| 事件名称 | 描述 |
| ------ | ------ | 
| Page.onShow | 生命周期回调—监听页面显示 |
| Page.onHide | 生命周期回调—监听页面隐藏 |

**Page.onShow预置采集数据**

| 名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| $query | Object | 打开当前页面路径中的参数 |
| $url_path | String | 页面路径 |
| $referrer | String | 前向页面地址 |
| $enter_time | Number | 页面显示的时间戳 |

**Page.onHide预置采集数据**

| 名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| $enter_time | Number | 页面显示的时间戳 |
| $leave_time | Number | 页面隐藏的时间戳 |
| $stay_time | Number | 页面停留时长，单位：ms（毫秒） |
### 4.1 原生
**app.js**
```
const { autoAppTrace, Dttrace} = require('./utils/dttrace-applet')
App(autoAppTrace({
  onLaunch: function (options) {
    ...
  },
  globalData: {
    userInfo: null
  },
  dttrace:new Dttrace({
    appKey: <在DT.Trace上申请的小程序appKey>,
    appletId: <微信小程序的AppID>,
    appletSecret:<微信小程序的AppSecret>
  })
},'dttrace'))
```
**page**
```
const {autoPageTrace} = require('../../utils/dttrace-applet')
const app = getApp()

Page(autoPageTrace({
  data: {
    ...
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){
    ...
  }
},app.dttrace))
```
### 4.2 mpvue
**App.vue**
```
<script>
import {autoAppTrace} from './utils/dttrace-applet.js'
export default autoAppTrace({
  created(){
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
    
  },
  onShow(){
    ...
  },
  onHide(){
    ...
  }
},'dttrace')
</script>

<style>
  ...
</style>
```
**page**
```
<template>
  ...
</template>

<script>
// Use Vuex
import store from './store'
import {autoPageTrace} from '../../utils/dttrace-applet.js'
export default autoPageTrace({
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  },
  onLoad(){
    ...
  }
},'dttrace')
</script>

<style>
  ...
</style>

```
### 4.3 wepy
**app.wpy**
```
import wepy from 'wepy'
import {Dttrace,AutoAppTrace} from './utils/dttrace-applet.js'

wepy.app.prototype.dttrace=wepy.page.prototype.dttrace=new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})

@AutoAppTrace("dttrace")
export default class extends wepy.app {
  config={
    ...
  }
  constructor () {
    super()
  }
  onLaunch() {
    ...
  }
}
```
**page**
```
import {AutoPageTrace} from '../utils/dttrace-applet.js'

@AutoPageTrace("dttrace")
export default class Index extends wepy.page {
  config = {
    ...
  }
  data = {
    ...
  }
  onShow(){
    ...
  }
}
```
## 5 API说明
### new Dttrace
初始化Dttrace实例

| 参数 | 类型 | 是否必填 |说明 |
| ------ | ------ | ------ | ------ |
| appKey | String | 是 | 在DT.Trace上申请的小程序appKey |
| appletId | String | 是 | 微信小程序的AppID |
| appletSecret | String | 是 | 微信小程序的AppSecret |

**示例：**
```
const dttrace = new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})
```

### launchRocket
采集数据（Dttrace实例上的方法）

| 参数 | 类型 | 是否必填 |说明 |
| ------ | ------ | ------ | ------ |
| eventId | Number | 是 | 事件ID，与DT.Trace上定义的事件ID相对应 |
| otherParams | Object | 否 | 额外采集数据 |

**示例：**
```
const dttrace = new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})

dttrace.launchRocket(2001,{
  message:'隔壁老王来了'
})
```

### params
Dttrace实例上的全局采集参数

#### get
获取全局采集数据

| 参数 | 类型 | 是否必填 |说明 |
| ------ | ------ | ------ | ------ |
| name | String | 否 | 需要获取的全局采集数据的参数名 |
**示例：**
```
const dttrace = new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})

console.log(dttrace.params.get()) //全局采集数据
console.log(dttrace.params.get('message')) //全局采集数据中参数名为name对应的数据
```

#### set
设置用户自定义采集参数

| 参数 | 类型 | 是否必填 |说明 |
| ------ | ------ | ------ | ------ |
| customParams | Object | 是 | 用户自定义的全局采集参数 |
**示例：**
```
const dttrace = new Dttrace({
  appKey: <在DT.Trace上申请的小程序appKey>,
  appletId: <微信小程序的AppID>,
  appletSecret:<微信小程序的AppSecret>
})

dttrace.params.set({
  message:'隔壁老王来了'
})
console.log(dttrace.params.get('message')) //隔壁老王来了
```

### options
Dttrace实例上的配置

#### get
获取Dttrace实例上配置

| 参数 | 类型 | 是否必填 |说明 |
| ------ | ------ | ------ | ------ |
| name | String | 否 | 获取配置指定项对应的值 |

**示例：**
```
const dttrace = new Dttrace({
  appKey: '78742340',
  appletId: 'wxf1cae51ae6d86154',
  appletSecret: '6a1cf856402b3282eb463e2b7e9f95e9'
})

console.log(dttrace.options.get()) //全部配置
console.log(dttrace.options.get('appKey')) //78742340
```

#### set
设置Dttrace实例上的配置

| 参数 | 类型 | 是否必填 |说明 |
| ------ | ------ | ------ | ------ |
| options | Object | 是 | 需要更新的配置 |

**示例：**
```
const dttrace = new Dttrace({
  appKey: '78742340',
  appletId: 'wxf1cae51ae6d86154',
  appletSecret: '6a1cf856402b3282eb463e2b7e9f95e9'
})

dttrace.options.set({
  appKey: '123456'
})

console.log(dttrace.options.get('appKey')) //123456
console.log(dttrace.options.get('appletId')) //wxf1cae51ae6d86154
```
