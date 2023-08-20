//index.js
Page({
	data: {
		userInfo:{},
	},
	onShow(){
		this.setData({ userInfo: wx.getStorageSync('userInfo') || {}  })
	},
	logout(){
		 wx.removeStorageSync('userInfo')
		 wx.reLaunch({url:'/pages/login2/index'})
	}
	
})
