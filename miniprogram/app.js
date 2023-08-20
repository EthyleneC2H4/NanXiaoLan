//app.js
App({
  globalData:{
    id:''
},
	onLaunch(){
		wx.cloud ? wx.cloud.init({  traceUser: true,env: 'nanxiaolan-4g4j741id4f1e0e5' }) : console.log('版本太低')
  },
})
