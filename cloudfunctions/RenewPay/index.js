// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

/**更新 */
exports.main = async (event, context) => {
  const {
    _id,
    formTitle,
    formOrder,
    formMaxCnt,
    formStart,
    formStop,
    formBills,
    formComplete,
  } = event;

  try {
    // 构造需要更新的数据对象
    const db = cloud.database();
    const originalData = await db.collection("bx_bill").doc(_id).get();

    const updateData = {
      // BILL_TITLE: formTitle || originalData.data.BILL_TITLE,
      // BILL_ORDER: formOrder || originalData.data.BILL_ORDER,
      // BILL_MAX_CNT: formMaxCnt || originalData.data.BILL_MAX_CNT,
      // BILL_START: formStart || originalData.data.BILL_START,
      // BILL_STOP: formStop || originalData.data.BILL_STOP,
      // BILL_BILLS: formBills || originalData.data.BILL_BILLS,
      BILL_COMPLETE: originalData.data.BILL_COMPLETE+1,
    };

    // 调用小程序云开发的数据库 API 进行更新
    console.log('Updating data in collection: bx_bill');
    console.log('Data to be updated:', updateData);

    const result = await db.collection("bx_bill").doc(_id).update({
      data: updateData,
    });

    console.log('Update result:', result);

    // 返回更新结果，或者根据需要返回其他信息
    return result;
  } catch (error) {
    // 处理更新失败时的错误
    console.error('Failed to update bill:', error);
    throw error;
  }
};
