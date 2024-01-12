const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const AdminActivityBiz = require('../../../../biz/admin_activity_biz.js');
const ActivityBiz = require('../../../../biz/activity_biz.js');
const validate = require('../../../../../../helper/validate.js');
const PublicBiz = require('../../../../../../comm/biz/public_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
// const BillModel = require('../../../../../../../cloudfunctions/pay/pay/bill_model');
// const newpay = require('../../../../../../../cloudfunctions/pay/pay/newpay'); // 引入 newpay 类
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.SETUP_CONTENT_ITEMS[0].title + '-添加',
		});

		this.setData(AdminActivityBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	url: function (e) {
		pageHelper.url(e, this);
	},
	switchModel: function (e) {
		pageHelper.switchModel(this, e);
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let data = this.data;
		// data = validate.check(data, AdminActivityBiz.CHECK_FORM, this);
		// if (!data) return;
    console.log(data);
		if (data.formStop< data.formStart) {
			return pageHelper.showModal('截止时间不能早于开始时间');
		}

		// let forms = this.selectComponent("#cmpt-form").getForms(true);
		// if (!forms) return;
		// data.forms = forms;

		// data.cateName = ActivityBiz.getCateName(data.cateId);

		try {
      // 调用云函数
      let result = await wx.cloud.callFunction({
        name: 'NewPay', // 云函数的名称
        data: data, // 传递给云函数的参数
      });
    
      let activityId = result.result.id;
    
      // 在这里添加你的逻辑
    
      pageHelper.showSuccToast('添加成功', 2000);
    
    } catch (err) {
      console.error(err);
    }
    
	},

	bindJoinFormsCmpt: function (e) {
		this.setData({
			formJoinForms: e.detail,
		});
	},

	bindMapTap: function (e) {
		AdminActivityBiz.selectLocation(this);
	}
})