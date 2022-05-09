import { serverPurchaseRequest } from "../services/constants";
import httpClient from "./httpClient";

const getInvetoryFull = async () => {
  const result = await httpClient.get(
    `${serverPurchaseRequest.GETINVENTORYFULL}`
  );
  return result.data;
};

//GETBILLMASTERBYBILLID
const getBillMasterByID = async (Bill_ID) => {
    const result = await httpClient.get(
      `${serverPurchaseRequest.GETBILLMASTERBYBILLID}/${Bill_ID}`
    );
    //console.log(result.data);
    return result.data;
  };

const getItemType = async () => {
  const result = await httpClient.get(`${serverPurchaseRequest.GETITEMTYPE}`);
  //console.log(result.data);
  return result.data;
};

const getBillMaster = async () => {
  const result = await httpClient.get(
    `${serverPurchaseRequest.GETPURCHASEBILLMASTER}`
  );
  //console.log(result.data);
  return result.data;
};

const getSection = async () => {
  const result = await httpClient.get(`${serverPurchaseRequest.GETSECTION}`);
  //console.log(result.data);
  return result.data;
};

//GETPURCHASEPOSITION
const getPosition = async () => {
  const result = await httpClient.get(`${serverPurchaseRequest.GETPURCHASEPOSITION}`);
  //console.log(result.data);
  return result.data;
};

const getEmployee = async (Request_ID) => {
  const result = await httpClient.get(
    `${serverPurchaseRequest.GETEMPLOYEE}/${Request_ID}`
  );
  //console.log(Request_ID);
  return result.data;
};

//getItemsName
const getItemsName = async () => {
  const result = await httpClient.get(`${serverPurchaseRequest.GETITEMSNAME}`);
  // console.log(result);
  return result.data;
};

const getBillOrder = async (Bill_ID) => {
  var sum = 0
  const result = await httpClient.get(
    `${serverPurchaseRequest.GETBILLORDER}/${Bill_ID}`
  );
  //console.log("result.data : " , result.data);
  result.data.forEach(async (data2, index) => {
    if (data2.PRICE == null) {
      data2.PRICE = 0;
    }
    //console.log("รอบที่ : " , index)
    sum = sum + Number(data2.PRICE);
  });
  result.data.push({
    UNIT_NAME: "รวมสุทธิ",
    PRICE: sum,
  });
  //console.log("result.data : " , result.data)

  return result.data;
};

//GETITEMSTATUS

const getItemStatus = async (itemStatus1 , itemStatus2) => {
  // console.log("itemStatus1 : " , itemStatus1)
  // console.log("itemStatus2 : " , itemStatus2)
  const result = await httpClient.get(
    `${serverPurchaseRequest.GETITEMSTATUS}/${itemStatus1}/${itemStatus2}`
  );
  //console.log(result.data);
  return result.data;
};

const createPurchaseBill = async (empCode, SectionCode, PositionCode, PhoneNumber, Detail) => {
  // const createPurchaseBill = async(emp, dataDetail) => {
  // console.log("create : " , create)
  const data = {
    Request_ID: empCode,
    Section_Code: SectionCode,
    Position_Code: PositionCode,
    Phone_Number: PhoneNumber,
    DataDetail: Detail,
  };
  // console.log("Request_ID : " , data.Request_ID)
  // console.log("Section_Code : " , data.Section_Code)
  // console.log("Datadetail : " , data.DataDetail)
  // console.log("PositionCode API : " , data.Position_Code)
  //console.log("PhoneNumber API : " , data.Phone_Number)
  let result = await httpClient.post(
    serverPurchaseRequest.CREATEPURCHASEBILL,
    data
  );
  // console.log(result.data.result)
  // console.log("DataDetail : " , data)
  return result;
};


const updateStatus = async (StatusCode, Bill_ID) => {
  //console.log("StatusCode หน้า Api : ", StatusCode);
  //console.log("Bill_ID หน้า Api : ", Bill_ID);

  let result = await httpClient.post(
    `${serverPurchaseRequest.UPDATESTATUS}/${StatusCode}/${Bill_ID}`
  );

  return result;
};

//UPDATEINSPACTOR

const updateInspactor = async (Emp_Code, Bill_ID) => {
    //console.log("Emp_Code หน้า Api : ", Emp_Code);
    //console.log("Bill_ID หน้า Api : ", Bill_ID);
  
    let result = await httpClient.post(
      `${serverPurchaseRequest.UPDATEINSPACTOR}/${Emp_Code}/${Bill_ID}`
    );
  
    return result;
  };

//UPDATEBILLDETAIL
const updateBillDetail = async (Bill_ID, datalist) => {
  //console.log("Bill_ID หน้า Api : ", Bill_ID)
  //console.log("datalist หน้า Api : ", datalist);

  let result = await httpClient.post(
    `${serverPurchaseRequest.UPDATEBILLDETAIL}/${Bill_ID}`,datalist
  );

  return result;
};

//UPDATENEWITEM
const updateNewItem = async (Bill_ID, index, datalist) => {
  //console.log("Bill_ID หน้า Api : ", Bill_ID)
  //console.log("index หน้า Api : ", index)
  //console.log("datalist หน้า Api : ", datalist);

  let result = await httpClient.post(
    `${serverPurchaseRequest.UPDATENEWITEM}/${Bill_ID}/${index}`,datalist
  );
  return result;
};

//UPDATEPRICE
const updatePrice = async (ItemID, Price) => {
  let result = await httpClient.post(
    `${serverPurchaseRequest.UPDATEPRICE}/${ItemID}/${Price}`
  );
  return result;
};

//DELETEFROMEDIT
const deleteFromEdit = async (bill_id , item_no) => {
  //console.log("bill_id หน้า API : " , bill_id)
  //console.log("item_no หน้า API : " , item_no)
  const result = await httpClient.delete(
    `${serverPurchaseRequest.DELETEFROMEDIT}/${bill_id}/${item_no}`
  );
  //console.log("result หน้า api : " , result)
  return result
};


const deletePuechaseAllBill = async (id) => {
  //console.log(id);
  const result = await httpClient.delete(
    `${serverPurchaseRequest.DELETEBILLPURCHASE}/${id}`
  );
  return result.data.result;
};

//DELETEBILLDETAIL
const deleteBillDetail = async (bill_id) => {
  //console.log("bill_id หน้า API : " , bill_id)
  const result = await httpClient.delete(
    `${serverPurchaseRequest.DELETEBILLDETAIL}/${bill_id}`
  );
  return result.data.result;
};

// ส่ง empCode เพื่อไปเช็คว่ามีสินค้าพร้อมรับอยู่ไหม(status code 4) 
const StatusWarning = async (empCode) => {
  const result = await httpClient.get(
    `${serverPurchaseRequest.STATUSWARNING}/${empCode}`
  );
  // console.log('result : ' , result.data)
  return result.data;
};

export default {
  getInvetoryFull,
  getItemType,
  createPurchaseBill,
  getBillMaster,
  getSection,
  getEmployee,
  getBillOrder,
  deletePuechaseAllBill,
  getItemStatus,
  updateStatus,
  getBillMasterByID,
  updateInspactor,
  updateBillDetail,
  updateNewItem,
  updatePrice,
  deleteFromEdit,
  deleteBillDetail,
  getPosition,
  getItemsName,
  StatusWarning
};
