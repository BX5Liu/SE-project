// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { data: medicines } = await cloud.database()
      .collection("bx_medicine")
      .field({ _id: false, medicinename: true })
      .where({})
      .get();
    console.log(medicines);
    if (medicines.length === 0) {
      throw new Error("没有找到药品信息");
    }
    return medicines[0].medicinename;
  } catch (err) {
    console.log(err);
    return "";
  }
};
