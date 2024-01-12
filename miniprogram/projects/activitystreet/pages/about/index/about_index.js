const behavior = require('../../../../../comm/behavior/about_bh.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const projectSetting = require('../../../public/project_setting.js');
Page({

	behaviors: [behavior],

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (options && options.key)
			this._loadDetail(options.key, projectSetting.SETUP_CONTENT_ITEMS);
  },
  onShow: async function () { 
    this._getDataFromDatabase();
  },
  url: async function (e) {
		pageHelper.url(e, this);
	},
  // 按钮点击事件
  handleButtonClick: function (e) {
    try {
      wx.cloud.callFunction({
        name: 'getBills',
        data: {/* 传递给云函数的参数 */}
      }).then(result => {
        const data = result.result;
        let that = this; 
        console.log(data[e.currentTarget.dataset.id]); 
        console.log(e); 
        wx.cloud.callFunction({
          name: "pay",
          data: {
            orderid: "" + e.currentTarget.dataset.id,
            money: e.currentTarget.dataset.bills,
          },
        }).then(payResult => {
          console.log("提交成功", payResult.result);
          that.pay(payResult.result,e.currentTarget.dataset.id,e.currentTarget.dataset.bills);
        }).catch(payError => {
          console.error('支付失败', payError);
          // 处理支付失败的情况
        });
  
      }).catch(error => {
        console.error('获取数据失败', error);
        // 处理获取数据失败的情况
      });
    } catch (error) {
      console.error('发生错误', error);
      // 处理其他错误
    }

  },
  _getDataFromDatabase: async function () {
    try {
      // 调用云函数或其他方法获取数据
      const result = await wx.cloud.callFunction({
        name: 'getBills', // 云函数的名称
        data: {/* 传递给云函数的参数 */},
      });
    
      const dataFromCloudFunction = result.result; // 获取云函数返回的数据
      this.setData({
        dataList: dataFromCloudFunction.data, // 假设从数据库获取的数据直接放在 dataList 中
        isLoad: true // 如果需要，设置加载状态
      });
    } catch (error) {
      console.error('Failed to fetch data from database:', error);
      // 处理错误，例如显示错误提示
    }
  },
   //实现小程序支付
  pay(payData,id,bill) {
  
    //官方标准的支付方法
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
      signType: 'MD5',
      paySign: payData.paySign, //签名
      success(res) {
        wx.cloud.callFunction({
          name: 'RenewPay', // 替换成你的云函数名称
          data: {
            _id:id,
            formBills:bill
            // 传递给云函数的参数
            // 可根据需要传递支付成功的相关信息
          },
          success: function (cloudFunctionRes) {
            console.log('云函数调用成功', cloudFunctionRes);
          },
          fail: function (cloudFunctionErr) {
            console.error('云函数调用失败', cloudFunctionErr);
          }
        });
      },
      fail(res) {
        console.log("支付失败", res)
      },
      complete(res) {
        console.log("支付完成", res)
      }
    })
  }


})