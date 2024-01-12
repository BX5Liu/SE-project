
const BaseProjectModel = require('./base_project_model.js');

class BillPayModel extends BaseProjectModel {

}

// 集合名
BillPayModel.CL = BaseProjectModel.C('bill_join');

BillPayModel.DB_STRUCTURE = {
	_pid: 'string|true',
	BILL_JOIN_ID: 'string|true',

	BILL_JOIN_IS_ADMIN: 'int|true|default=0|comment=是否管理员添加 0/1',

	BILL_USER_ID: 'string|true|comment=用户ID',


	ACTIVITY_JOIN_FORMS: 'array|true|default=[]|comment=表单',
	ACTIVITY_JOIN_OBJ: 'object|true|default={}',

	ACTIVITY_JOIN_STATUS: 'int|true|default=1|comment=状态  0=待审核 1=报名成功, 99=审核未过',
	ACTIVITY_JOIN_REASON: 'string|false|comment=审核拒绝或者取消理由',

	ACTIVITY_JOIN_ADD_TIME: 'int|true',
	ACTIVITY_JOIN_EDIT_TIME: 'int|true',
	ACTIVITY_JOIN_ADD_IP: 'string|false',
	ACTIVITY_JOIN_EDIT_IP: 'string|false',
};

// 字段前缀
BillPayModel.FIELD_PREFIX = "BILL_";

/**
 * 状态 0=待审核 1=报名成功, 99=审核未过
 */



module.exports = BillPayModel;