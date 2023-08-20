//index.js
Page({
	data: {
		name: '',
		idcard: '',
		phone: '',
		member: '',
		img: '',
	},
	vmodel({currentTarget:{ dataset: {k, v} },detail:{value}}){
		this.setData({ [k] : v || value })
	},
	async chooseImg(){
		const res = await new Promise(r=> wx.chooseImage({count: 9, success: r, fail: ()=> r(false)}));
		if(!res) return;
		this.setData({img: res.tempFilePaths[0] });
	},
	async add(){
		wx.showLoading()
		let {idcard,member,img,name,phone} = this.data;
    if([idcard,member,img,name,phone].some(v=> !v)) 
      return  wx.showToast({title:'请完善信息',icon: 'none'});
	
    const res = await wx.cloud.uploadFile({ 
      cloudPath: `img-${new Date().getTime()}${img.match(/\.[a-zA-Z0-9]+$/)[0]}` , filePath:img})
		if(!res)  return wx.showToast({title:'图片上传失败',icon: 'none'})
		img = res.fileID;
		
		const {result:res2} = await wx.cloud.callFunction({ 
      name: 'admin',  
      data: {
			tb: 'team',
			head: 'create',
			data:{ idcard,member,img,name,phone}
		} });
		if(res2.code !== 200) return wx.hideLoading();
		 wx.showToast({title:'创建成功'})
		 setTimeout(()=> wx.navigateBack(), 1000)
	},
	
})
