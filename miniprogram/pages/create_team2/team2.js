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
    id_:'',
    areaCode:'请选择队伍',
    hideModal:true, //模态框的状态  true-隐藏  
    indexstatus:-1,//默认显示
    animationData:{},//

    date:'',
    task : [],
    button_ac : 0,
    tem2:'',
    TopActive:1,
    team_number:'球队二',
    load,
    welcome:'球队二的名称',
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
   showModal: function (e) {
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

  bindKeyInputId_2:function(e){
    this.setData({
        date:e.detail.value
    })
  }
  ,

  change_name :function (e) {
    this.setData({
      id_:app.globalData.id
    })
    console.log(this.data.id_)
    if(this.data.tem2 != '' && this.data.date !=''){
      db.collection('game').where({
        _id:this.data.id_
      }).update({
        data:{
          date:this.data.date,
          team2:this.data.areaCode,
          score2:this.data.tem2
        },
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1000,
        mask: true,
        success: function(){
          setTimeout(function () {
            //要延时执行的代码
            wx.reLaunch({
              url: '/pages/game/game',
            })
          }, 1000) //延迟时间
        },
      });
      
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
  onLoad:function(option) {
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