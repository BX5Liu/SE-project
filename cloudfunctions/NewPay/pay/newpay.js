const BillModel = require('./BillModel');

cloud.init();

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
      formTitle,
      formOrder,
      formMaxCnt,
      formStart,
      formStop,
      formBills
    };
    console.log(billData);
    // 调用你的 model 的 insert 函数，将数据插入数据库
    const result = await BillModel.insert(billData);

    // 在这里你可以根据需要处理插入成功后的逻辑
    console.log('Bill inserted successfully:', result);

    // 返回插入结果，或者根据需要返回其他信息
    return result;
  } catch (error) {
    // 处理插入失败时的错误
    console.error('Failed to insert bill:', error);
    throw error; // 可以选择抛出错误，或者进行其他处理
  }
};
