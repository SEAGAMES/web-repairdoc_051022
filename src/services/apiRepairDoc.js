import axios from "axios";
import { apiConvertImg, serverRepairDoc } from "../services/constants";
import httpClient from "./httpClient";

const getDeviceFilter = async () => {
  const result = await httpClient.get(`${serverRepairDoc.GETDEVICEFILTER}`);
  // console.log(result.data)
  if (result.data.message == "ok") {
    return result.data.result;
  }
};

const createRepairDoc = async (data) => {
  const result = await httpClient.post(
    `${serverRepairDoc.CREATEREPAIRDOC}`,
    data
  );
  // console.log(result.data)
  return result.data.message;
};

const getBillRepair = async () => {
  const result = await httpClient.get(`${serverRepairDoc.GETBILLREPAIR}`);
  if (result.data.message == "ok") {
    return result.data.result;
  }
};

const getBillRepairDetail = async (id) => {
  const result = await httpClient.get(`${serverRepairDoc.GETBILLREPAIRDETAIL}/${id}`);
  if (result.data.message == "ok") {
    return result.data.result;
  }
};

const deleteBillRepeair = async (id) => {
  // console.log(id)
  const result = await httpClient.delete(
    `${serverRepairDoc.GETBILLREPAIR}/${id}`
  );
  return result.data.result;
};

const getBillRepairModify = async (id) => {
  const result = await httpClient.get(
    `${serverRepairDoc.GETBILLREPAIRMODIFY}/${id}`
  );
  return result.data;
};

const updateRepairDoc = async (id, data) => {
  // console.log(data, id)
  const result = await httpClient.post(
    `${serverRepairDoc.UPDATEREPAIRDOC}/${id}`,
    data
  );
  // console.log(result.data.result)
  return result.data.result;
};

const updateStatus = async (data) => {
  // data.Notifier = this.$store.state.
  console.log("back", data);
  if (data.status == "3") {
    let dataFinishUpdate = {
      ID: data.BillID,
      finishDate: new Date(),
    };
    // แก้ไข
    await httpClient.post(`${serverRepairDoc.UPDATEFINISHDATE}`,dataFinishUpdate);
  }
  const result = await httpClient.post(`${serverRepairDoc.UPDATESTATUS}`, data);
  return result.data.result;
};

const getSumBill = async (data) => {
  const result = await httpClient.post(`${serverRepairDoc.GETSUMBILL}`, data);
  return result.data;
};

const updateApprove = async (data) => {
  const result = await httpClient.post(serverRepairDoc.UPDATEAPPROVE, data)
  return result.data.result
}

const getHistoryBill = async (DeviceNo) => {
  const data = {
    DeviceNo: DeviceNo
  }
  const result = await httpClient.post(serverRepairDoc.GETHISTORYBILL, data)
  return result.data.result
}

const convertImg = async(data) => {
  console.log('Backend', data)
  const result = await axios.post(apiConvertImg, { UrlIMG : data});
  return result.data.result;
}

export default {
  getDeviceFilter,
  createRepairDoc,
  getBillRepair,
  deleteBillRepeair,
  getBillRepairModify,
  updateRepairDoc,
  updateStatus,
  getSumBill,
  updateApprove,
  getBillRepairDetail,
  getHistoryBill,
  convertImg
};
