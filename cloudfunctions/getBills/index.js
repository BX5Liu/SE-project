// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

/**获取所有数据 */
exports.main = async (event, context) => {
  try {
    // 调用小程序云开发的数据库 API 进行查询
    console.log('Fetching all data from collection: bx_bill');

    const db = cloud.database();
    const result = await db.collection("bx_bill").get();

    console.log('Fetch result:', result);

    // 返回查询结果，或者根据需要返回其他信息
    return result;
  } catch (error) {
    // 处理查询失败时的错误
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
