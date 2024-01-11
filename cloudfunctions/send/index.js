// 云函数入口文件
const cloud = require('../timer/node_modules/wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'miniprogram/projects/medicineRemind/pages/medicineRemind', //要跳转到那个小程序页面
      data: {//推送的内容
        thing1: {
          value: '用药时间到了！'
        },
        thing2: {
          value: event.medicinename
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
      templateId: 'HoD6Xp0jhBigBTxdsJwhmqIM7d9P1E0SA3k_BQgqX9k' //模板id
    })
    console.log(result)
    return result.errCode
  } catch (err) {
    console.log(err)
    return err
  }
}