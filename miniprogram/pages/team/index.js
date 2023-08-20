//index.js
Page({
	data: {
		list:[],
	},
	onShow(){
		this.getData();
  },
  
  
	async getData(){
		wx.showLoading()
    const {result:res} = 
    await wx.cloud.callFunction({ 
      name: 'admin',  
      data: {
			tb: 'team',
			head: 'select',
			page: 1,
			pageSize:1000,
			filtering:[]
		} });
		wx.hideLoading()
		if(res.code !== 200) return;
		this.setData({list:res.data})
	},
	add(){
		wx.navigateTo({url: '/pages/addTeam/index'})
	}
})
