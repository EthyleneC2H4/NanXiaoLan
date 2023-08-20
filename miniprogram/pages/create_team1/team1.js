// pages/team/team.js
var app = getApp()

var load = {
  name :'提交',
}

const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: 
  { 
    areaCode:'请选择队伍',
    hideModal:true, //模态框的状态  true-隐藏  
    indexstatus:-1,//默认显示
    animationData:{},//

    task : [],
    button_ac : 0,
    tem2:'',
    TopActive:0,
    team_number:'球队一',
    load,
    welcome:'球队一的名称',
    wel_number: '队伍得分',
  },


  //动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(600).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 

  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },100)//先执行下滑动画，再隐藏模块
    
  },
   // 显示遮罩层
   showModal: function () {
    var that=this;
    this.setData({
      button_ac:1,
    })
    console.log(this.data.button_ac)
    const team1 = db.collection('team');

    team1.get({
      success:function(res){
        console.log(res.data)
        that.setData({
          task:res.data
        })
        console,log(that.data.task)
      }
    })

    that.setData({
      hideModal:false
    })
    var animation = wx.createAnimation({
      duration: 100,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },100)   
  },

  // 选择队伍
  getValueTap:function(e){
    // console.log(e)
    // console.log(e.currentTarget.dataset.dialogid)
    let dialogid=e.currentTarget.dataset.dialogid;
    // console.log(this.data.areaList[dialogid])//得到队伍
    this.setData({
      areaCode:this.data.task[dialogid].name,//赋值给输入框
      indexstatus: dialogid, //更新
    })
  },

  bindKeyInputId_1:function(e){
    this.setData({
        tem2:e.detail.value,
    })
  }
  ,
  //下一步，并把队伍一的数据传入到数据库
  change_name :function (e) {
    if(this.data.tem2 != ''){//判断输入是否合法
      db.collection('game').add({
        data:{
          team1 : this.data.areaCode,
          score1 : this.data.tem2
        },
        success:function(res){
          app.globalData.id = res._id
          console.log(res._id)
        }
      })
      wx.showToast({
        title: '成功',
        duration: 1000,
   })
    wx.reLaunch({
      url: '/pages/create_team2/team2',//跳转
  }),1000
    }else{
      wx.showModal({
        cancelColor: 'black',
        title:'Eorro !!',
        content:'信息错误'
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(app.globalData.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})