//index.js
Page({
	data: {
		tab: 0,
		list: [],
		banner:[],
		acc: '',
		pwd: ''
	},
	onLoad(){
		if( wx.getStorageSync('userInfo'))  wx.reLaunch({url: '/pages/home/index'})
	},
	vmodel({currentTarget:{ dataset: {k, v} },detail:{value}}){
		this.setData({ [k] : v || value })
	},
	getUserInfo({detail}){
		if(!detail) return;
		
		wx.showToast({title:'登录成功'})
		wx.reLaunch({url: '/pages/home/index'})
		wx.setStorageSync('userInfo', detail.userInfo)
	}
	
	
})
