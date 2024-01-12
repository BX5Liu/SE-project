const BaseProjectModel = require('./base_project_model.js');

class BillModel extends BaseProjectModel {

}

// 集合名
BillModel.CL = BaseProjectModel.C('bill');

BillModel.DB_STRUCTURE = {
	_pid: 'string|true',
	BILL_ID: 'string|true',

	BILL_TITLE: 'string|true|comment=标题',
	BILL_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',


	BILL_MAX_CNT: 'int|true|default=20|comment=人数上限 0=不限',
	BILL_START: 'int|false|comment=开始时间',
	BILL_STOP: 'int|true|default=0|comment=截止时间 0=永不过期',

	ACTIVITY_ORDER: 'int|true|default=9999',
	// ACTIVITY_VOUCH: 'int|true|default=0',

	// ACTIVITY_FORMS: 'array|true|default=[]',
	// ACTIVITY_OBJ: 'object|true|default={}',

	// ACTIVITY_JOIN_FORMS: 'array|true|default=[]',

	// ACTIVITY_ADDRESS: 'string|false|comment=详细地址',
	// ACTIVITY_ADDRESS_GEO: 'object|false|comment=详细地址坐标参数',

	// ACTIVITY_QR: 'string|false',
	// ACTIVITY_VIEW_CNT: 'int|true|default=0',
	// ACTIVITY_JOIN_CNT: 'int|true|default=0',
	// ACTIVITY_COMMENT_CNT: 'int|true|default=0',

	// ACTIVITY_USER_LIST: 'array|true|default=[]|comment={name,id,pic}',

	ACTIVITY_ADD_TIME: 'int|true',
	// ACTIVITY_EDIT_TIME: 'int|true',
	ACTIVITY_ADD_IP: 'string|false',
	// ACTIVITY_EDIT_IP: 'string|false',
};

// 字段前缀
BillModel.FIELD_PREFIX = "BILL_";

/**
 * 状态 0=未启用,1=使用中 
 */
BillModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = BillModel;