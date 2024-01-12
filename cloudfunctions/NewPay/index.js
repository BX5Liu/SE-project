// 云函数入口文件
const cloud = require('wx-server-sdk')

const BillModel = require('./pay/BillModel');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境


/**添加 */
exports.main = async (event, context) => {
  const {
    formTitle,
    formOrder,
    formMaxCnt,
    formStart,
    formStop,
    formBills
  } = event;

  try {
    // 创建一个包含所有需要插入的数据的对象
    const billData = {
      BILL_ID: "bills1",
      BILL_TITLE: formTitle,
      BILL_STATUS: 1,
      BILL_MAX_CNT: formMaxCnt,
      BILL_START: formStart,
      BILL_STOP: formStop,
      BILL_ORDER: formOrder,
      BILL_BILLS: formBills,
      BILL_COMPLETE:0
    };

    // 调用小程序云开发的数据库 API 进行插入
    console.log('Inserting data into collection: bx_bill');
    console.log('Data to be inserted:', billData);

    const db = cloud.database();
    const result = await db.collection("bx_bill").add({
      data: billData,
    });

    console.log('Insert result:', result);

    // 返回插入结果，或者根据需要返回其他信息
    return result;
  } catch (error) {
    // 处理插入失败时的错误
    console.error('Failed to insert bill:', error);
    throw error;
  }
};
