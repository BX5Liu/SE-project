class BillModel {
  constructor() {
    // 集合名
    this.CL = 'bx_bill';

    // 数据库结构
    this.DB_STRUCTURE = {
      _pid: 'string|true',
      BILL_ID: 'string|true',
      BILL_TITLE: 'string|true|comment=标题',
      BILL_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',
      BILL_MAX_CNT: 'int|true|default=20|comment=人数上限 0=不限',
      BILL_START: 'int|false|comment=开始时间',
      BILL_STOP: 'int|true|default=0|comment=截止时间 0=永不过期',
      ACTIVITY_ORDER: 'int|true|default=9999',
      ACTIVITY_ADD_TIME: 'int|true',
      ACTIVITY_ADD_IP: 'string|false',
    };

    // 字段前缀
    this.FIELD_PREFIX = 'BILL_';

    // 状态定义
    this.STATUS = {
      UNUSE: 0,
      COMM: 1,
    };
  }


}
async function insert(data) {
  // 自动ID
  
  let idField = this.FIELD_PREFIX + 'ID';
  if (!data[idField]) data[idField] = Date.now().toString();

  // 更新时间
  let timestamp = this.time();
  let addField = this.FIELD_PREFIX + 'ADD_TIME';
  if (!data[addField]) data[addField] = timestamp;

  let editField = this.FIELD_PREFIX + 'EDIT_TIME';
  if (!data[editField]) data[editField] = timestamp;

  // 更新IP
  let ip = "127.0.0.0";
  let addIPField = this.FIELD_PREFIX + 'ADD_IP';
  if (!data[addIPField]) data[addIPField] = ip;


  // 此处需要根据实际情况进行修改，使用小程序云开发的数据库 API 进行插入
  console.log('Inserting data into collection:', this.CL);
console.log('Data to be inserted:', data);
  const db = wx.cloud.database();
  const result = await db.collection(this.CL).add({
    data: {
      "_pid": "123444123",
     "BILL_ID": "bills1",
     "BILL_TITLE": "标题",
     "BILL_STATUS": 1,
     "BILL_MAX_CNT": 20,
     "BILL_START": 10,
     "BILL_STOP": 19,
     "ACTIVITY_ORDER": 20,
     "ACTIVITY_ADD_TIME": 11,
     "ACTIVITY_ADD_IP": "pasds",
   },
  });
  console.log('Insert result:', data);
  return data;
}
module.exports = BillModel;
