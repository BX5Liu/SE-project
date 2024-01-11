// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { result: medicinename } = await cloud.callFunction({
      name: "getMedicineName",
    });
    console.log('获取成功', medicinename);

    if (!medicinename) {
      throw new Error("药品名称为空");
    }

    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,
      page: 'miniprogram/projects/medicineRemind/pages/medicineRemind',
      data: {
        thing1: {
          value: '用药时间到了！'
        },
        thing2: {
          value: medicinename
        },
        time3: {
          value: '2024年1月11日 14:00'
        },
        thing4: {
          value: '请根据医嘱按时按量用药'
        },
        thing5: {
          value: '点击开启用药提醒，从现在开始为健康打卡！'
        }
      },
      templateId: 'HoD6Xp0jhBigBTxdsJwhmqIM7d9P1E0SA3k_BQgqX9k'
    });
    console.log(result);
    return result.errCode;
  } catch (err) {
    console.log(err);
    return err;
  }
};
