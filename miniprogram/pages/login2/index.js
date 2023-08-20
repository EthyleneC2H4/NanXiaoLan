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
    if( wx.getStorageSync('userInfo'))  {
      wx.reLaunch({url: '/pages/home/index'})
    }
  },
	vmodel({currentTarget:{ dataset: {k, v} },detail:{value}}){
		this.setData({ [k] : v || value })
	},
	async sub(){
		wx.showLoading()
    const {acc,pwd} = this.data;
    if([acc,pwd].some(v=> !v)) 
      return  wx.showToast({title:'请完整输入用户名与帐号',icon: 'none'});
		const {result:res} = await wx.cloud.callFunction({ 
      name: 'admin',  
      data: {
			tb: 'user',
			head: 'select',
			page: 1,
			pageSize:1,
			filtering:[
				{oper: 'eq', k: 'acc', v: acc},
				{oper: 'eq', k: 'pwd', v: pwd},
			]
			
		} });
		wx.hideLoading()
		if(res.code !== 200) return;
		if(!res.data || !res.data[0]) return wx.showToast({title:'账号或密码错误',icon: 'none'})
		 wx.showToast({title:'登录成功'})
		 wx.reLaunch({url: '/pages/home/index'})
		 wx.setStorageSync('userInfo', res.data[0])
  },
  signup(){
    wx.navigateTo({
      url: '/pages/signUp/index'
    })
  }
	
})
