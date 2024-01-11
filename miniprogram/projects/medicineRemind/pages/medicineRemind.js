// projects/medicineRemind/pages/medicineRemind.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    name:"null",
    remindTime:"",
    medicinename:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

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

  },
  //获取用户openid
  getOpenId:function(e){
    wx.cloud.callFunction({
      name:"getopenid-1"
    }).then(res=>{
      console.log("获取openid成功",res)
    }).catch(res=>{
      console.log("获取openid失败",res)
    })
  },
  //获取用户授权
  shouquan:function(e){
    wx.requestSubscribeMessage({
      tmplIds: ['HoD6Xp0jhBigBTxdsJwhmqIM7d9P1E0SA3k_BQgqX9k'],
      success(res){
        console.log("授权成功",res)
      },
      fail(res){
        console.log("授权失败",res)
      }
    })
  },
  //输入药品名称
  inputMedicineName:function(e){
    this.data.medicinename=e.detail.value
  },
  //选择提醒时间
  //发送消息
  sendtoUser:function(e){
    if(this.data.medicinename==null||this.data.medicinename==''){
      wx.showToast({
        icon:"none",
        title: '请输入药品名',
      })
      return
    }
    wx.cloud.callFunction({
      name:"send",
      data:{
        openid:"ogOXC5NIb2E1KhQ11RDLBQtbvfoM",
        medicinename:this.data.medicinename
      }
    }).then(res=>{
      console.log("发送成功",res)
    }).catch(res=>{
      console.log("发送失败",res)
    })
  }
})

