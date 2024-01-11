// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
	cloud.callFunction({
    name:"send",
    data:{
      openid:'ogOXC5NIb2E1KhQ11RDLBQtbvfoM'
    }
  }).then(res=>{
    console.log("定时发送成功",res)
  }).catch(res=>{
    console.log("定时发送失败",res)
  })
}