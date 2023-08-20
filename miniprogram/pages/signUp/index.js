// pages/signUp/index.js
const db = wx.cloud.database()
Page({
  sign(res){
    console.log(res)
    var{acc,pwd}=res.detail.value
    if([acc,pwd].some(v=> !v)) 
      return  wx.showToast({title:'请完善信息',icon: 'none'});
    db.collection('user').add({
      data:{
        acc:acc,
        pwd:pwd
      }
    }).then(res=>{
      console.log(res)
    })
  }
  


})