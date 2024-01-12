/**
 * Notes: 打卡模块控制器
 */

// 引入基础项目控制器
const BaseProjectController = require('./base_project_controller.js');

// 引入打卡服务
const EnrollService = require('../service/enroll_service.js');

// 引入时间工具
const timeUtil = require('../../../framework/utils/time_util.js');

// 引入内容校验工具
const contentCheck = require('../../../framework/validate/content_check.js');

// 打卡模块控制器，继承自基础项目控制器
class EnrollController extends BaseProjectController {

    // 格式化时间显示
    _getTimeShow(start, end) {
        let startDay = timeUtil.timestamp2Time(start, 'Y-M-D');
        let startTime = timeUtil.timestamp2Time(start, 'h:m');
        let week = timeUtil.week(timeUtil.timestamp2Time(start, 'Y-M-D'));
        week = ''; // TODO: 这里 week 赋值为空，可能需要根据具体情况处理

        if (end) {
            let endDay = timeUtil.timestamp2Time(end, 'M月D日');
            let endTime = timeUtil.timestamp2Time(end, 'h:m');

            if (startDay != endDay)
                return `${startDay} ${startTime} ${week}～${endDay} ${endTime}`;
            else
                return `${startDay} ${startTime}～${endTime} ${week}`;
        }
        else
            return `${startDay} ${startTime} ${week}`;
    }

    /** 
     * 获取打卡列表 
     * @returns {Object} 打卡列表数据
     */
    async getEnrollList() {

        // 数据校验规则
        let rules = {
            search: 'string|min:1|max:30|name=搜索条件',
            sortType: 'string|name=搜索类型',
            sortVal: 'name=搜索类型值',
            orderBy: 'object|name=排序',
            page: 'must|int|default=1',
            size: 'int',
            isTotal: 'bool',
            oldTotal: 'int',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 获取打卡列表数据
        let result = await service.getEnrollList(input);

        // 数据格式化
        let list = result.list;

        for (let k = 0; k < list.length; k++) {
            list[k].start = this._getTimeShow(list[k].ENROLL_START);
            list[k].end = this._getTimeShow(list[k].ENROLL_END);
            list[k].statusDesc = service.getJoinStatusDesc(list[k]);

            if (list[k].ENROLL_OBJ && list[k].ENROLL_OBJ.content)
                delete list[k].ENROLL_OBJ.content;
        }

        return result;
    }

    /** 
     * 浏览打卡详细信息 
     * @returns {Object} 打卡详细信息
     */
    async viewEnroll() {
        // 数据校验规则
        let rules = {
            id: 'must|id',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 获取打卡详细信息
        let enroll = await service.viewEnroll(this._userId, input.id);

        if (enroll) {
            enroll.start = this._getTimeShow(enroll.ENROLL_START);
            enroll.end = this._getTimeShow(enroll.ENROLL_END);
            enroll.statusDesc = service.getJoinStatusDesc(enroll);

            if (enroll.ENROLL_DAYS) delete enroll.ENROLL_DAYS;
        }

        return enroll;
    }

    /**
     * 获取某天的打卡参与情况
     * @returns {Object} 打卡参与情况数据
     */
    async getEnrollJoinByDay() {
        // 数据校验规则
        let rules = {
            enrollId: 'must|id',
            day: 'string',

            search: 'string|min:1|max:30|name=搜索条件',
            sortType: 'string|name=搜索类型',
            sortVal: 'name=搜索类型值',
            orderBy: 'object|name=排序',
            page: 'must|int|default=1',
            size: 'int',
            isTotal: 'bool',
            oldTotal: 'int',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 获取某天的打卡参与情况
        let result = await service.getEnrollJoinByDay(input);

        // 数据格式化
        let list = result.list;

        for (let k = 0; k < list.length; k++) {
            list[k].ENROLL_JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].ENROLL_JOIN_ADD_TIME, 'Y-M-D h:m');
        }

        result.list = list;

        return result;
    }

    /** 
     * 获取我的打卡列表 
     * @returns {Object} 我的打卡列表数据
     */
    async getMyEnrollUserList() {

        // 数据校验规则
        let rules = {
            search: 'string|min:1|max:30|name=搜索条件',
            sortType: 'string|name=搜索类型',
            sortVal: 'name=搜索类型值',
            orderBy: 'object|name=排序',
            page: 'must|int|default=1',
            size: 'int',
            isTotal: 'bool',
            oldTotal: 'int',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 获取我的打卡列表数据
        let result = await service.getMyEnrollUserList(this._userId, input);

        // 数据格式化
        let list = result.list;

        for (let k = 0; k < list.length; k++) {
            if (list[k].enroll.ENROLL_DAY_CNT <= 0) list[k].enroll.ENROLL_DAY_CNT = 1;
            list[k].per = Math.round(Number((list[k].ENROLL_USER_JOIN_CNT * 100) / list[k].enroll.ENROLL_DAY_CNT));
        }

        result.list = list;

        return result;
    }

    /** 
     * 获取我的打卡清单列表 
     * @returns {Object} 我的打卡清单列表数据
     */
    async getMyEnrollJoinList() {

        // 数据校验规则
        let rules = {
            enrollId: 'string|must',
            search: 'string|min:1|max:30|name=搜索条件',
            sortType: 'string|name=搜索类型',
            sortVal: 'name=搜索类型值',
            orderBy: 'object|name=排序',
            page: 'must|int|default=1',
            size: 'int',
            isTotal: 'bool',
            oldTotal: 'int',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 获取我的打卡清单列表数据
        let result = await service.getMyEnrollJoinList(this._userId, input);

        // 数据格式化
        let list = result.list;

        for (let k = 0; k < list.length; k++) {
            list[k].ENROLL_JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].ENROLL_JOIN_ADD_TIME, 'Y-M-D h:m');
        }

        result.list = list;

        return result;
    }

    /** 
     * 取消我的打卡参与 
     * @returns {Object} 取消结果
     */
    async cancelMyEnrollJoin() {
        // 数据校验规则
        let rules = {
            enrollId: 'string|must',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 取消我的打卡参与
        return await service.cancelMyEnrollJoin(this._userId, input.enrollId);
    }

    /** 
     * 提交打卡 
     * @returns {Object} 提交结果
     */
    async enrollJoin() {
        // 数据校验规则
        let rules = {
            enrollId: 'must|id',
            forms: 'array|name=表单',
        };

        // 取得数据
        let input = this.validateData(rules);

        // 实例化打卡服务
        let service = new EnrollService();
        // 提交打卡
        return await service.enrollJoin(this._userId, input.enrollId, input.forms);
    }

    /** 
     * 更新图片信息 
     * @returns {Object} 更新结果
     */
    async updateJoinForms() {

        // 数据校验规则
        let rules = {
            id: 'must|id',
            hasImageForms: 'array'
        };

        // 取得数据
        let input = this.validateData(rules);

        // 内容审核
        await contentCheck.checkTextMultiClient(input);

        // 实例化打卡服务
        let service = new EnrollService();
        // 更新图片信息
        return await service.updateJoinForms(input);
    }

}

// 导出打卡模块控制器
module.exports = EnrollController;
