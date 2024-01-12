const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const ActivityBiz = require('../../../../biz/activity_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../../public/project_setting.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.SETUP_CONTENT_ITEMS[0].title + '-管理',
		});
		this.setData({
			ACTIVITY_NAME: projectSetting.SETUP_CONTENT_ITEMS[0].title
		});

		//设置搜索菜单
		// this._getSearchMenu();

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { 
    this._getDataFromDatabase();
  },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	url: async function (e) {
		pageHelper.url(e, this);
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
	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	// bindJoinMoreTap: async function (e) {
	// 	if (!AdminBiz.isAdmin(this)) return;
	// 	let itemList = ['报名名单管理', '清空数据'];

	// 	let activityId = pageHelper.dataset(e, 'id');
	// 	let title = encodeURIComponent(pageHelper.dataset(e, 'title'));

	// 	wx.showActionSheet({
	// 		itemList,
	// 		success: async res => {
	// 			switch (res.tapIndex) {
	// 				case 0: {
	// 					wx.navigateTo({
	// 						url: '../join_list/admin_activity_join_list?activityId=' + activityId + '&title=' + title,
	// 					});
	// 					break;
	// 				}
	// 				case 1: {
	// 					this._clear(e);
	// 				}
	// 			}
	// 		},
	// 		fail: function (res) { }
	// 	})
	// },

	_clear: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '处理中'
				}
				await cloudHelper.callCloudSumbit('admin/activity_clear', params, opts).then(res => {
					let node = {
						'ACTIVITY_JOIN_CNT': 0,
					}
					pageHelper.modifyPrevPageListNodeObject(id, node, 1);

					pageHelper.showSuccToast('清空完成');
				});
			} catch (err) {
				console.log(err);
			}
		}
		pageHelper.showConfirm('确认清空所有数据？清空后不可恢复', callback);

	},

	bindStatusMoreTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let itemList = ['删除'];
		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //删除
						await this._del(e);
						break;
					}
				}
			},
			fail: function (res) { }
		})
	},

	_del: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/activity_del', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (err) {
				console.log(err);
			}
		}
		pageHelper.showConfirm('确认删除？删除后账单数据将一并删除且不可恢复', callback);

	},


	// _getSearchMenu: function () {
	// 	let cateIdOptions = ActivityBiz.getCateList();


	// 	let sortMenus = [
	// 		{ label: '全部', type: '', value: '' },
	// 		{ label: '正常', type: 'status', value: 1 },
	// 		{ label: '截止', type: 'status', value: 0 },
	// 	]
	// 	this.setData({
	// 		search: '',
	// 		cateIdOptions,
	// 		sortMenus,
	// 		isLoad: true
	// 	})
	// }

})