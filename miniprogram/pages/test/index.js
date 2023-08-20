// pages/test/index.js
const DB = wx.cloud.database().collection("test")
let name1=""
let age=""
let id =""
Page({
  login(){
    console.log("log")
    wx.getUserProfile({
      desc: '完善信息',
      success(res) {
        console.log("success",res.userInfo)
      },
      fail(res){
        console.log("fail",res)
      }
    })

  },
  getopenid(){
    wx.cloud.callFunction({
       name:"getopenid",
       success(res){
         console.log(res.result.openid)
       },
       fail(){
         console.log(res)
       }
    })
  },
  addName(e){
    name1=e.detail.value,
    console.log(name1)
  },
  addAge(e){
    age=e.detail.value,
    console.log(age)
  },
  addID(event){
    console.log(event),
    id=event.detail.value
  },
  
  addData(){
    DB.add({
      data:{
        name:name1,
        age:age
      },
      success(res){
        console.log("成功",res)
      },
      fail(res){
        console.log("失败",res)
      }
    })
  },
  deleteData(){
    DB.doc("a9ad01ce6396bf0d0156ecd2176de0b0").remove({
      success(res){
        console.log("成功",res)
      },
      fail(res){
        console.log("失败",res)
      }
    })
  },
  getData(){
      DB.get({
        success(res){
          console.log("查询数据成功",res)
        },
        fail(res){
          console.log("查询失败",res)
        }
      })
  },


  onLoad(options) {

  },

})