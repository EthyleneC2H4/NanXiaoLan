// pages/report/report.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gameList:[],
    teamList:[],
    team1:" ",
    team2:" "
  },
  getData(){
    db.collection("team").get({
      success:res=>{
        console.log(res)
        this.setData({
          teamList:res
        })
      }
    }),
    db.collection("game").get({
      success:res=>{
        console.log(res)
        this.setData({
          gameList:res
        })
      }
    })
  },
  ChangeActive(){
    this.setData({
      TopActive : this.data.TopActive===0?1:0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
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