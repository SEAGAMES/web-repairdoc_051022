import { server, serverMould } from "../services/constants";
import httpClient from "./httpClient";

const getMouldBill = async () => {
  const result = await httpClient.get(serverMould.GETMOULDBILL);
  return result.data;
};

const getMouldBillFindOne = async (ModelNo) => {
  const result = await httpClient.get(`${serverMould.GETMOULDBILL}/${ModelNo}`);
  return result.data;
};

const getOrderNumber = async () => {
  const result = await httpClient.get(serverMould.GETORDERNUMBER);
  return result.data;
};

const getModelMould = async (OrderNumber) => {
  const result = await httpClient.post(serverMould.GETMODELMOULD, OrderNumber);
  return result.data;
};

const getJobmould = async () => {
  const result = await httpClient.get(serverMould.GETJOBMOULD);
  return result.data;
};

const insertBillMould = async (data) => {
  const result = await httpClient.post(serverMould.INSERTBILL, data);
  return result.data.result;
};

const deleteBillMould = async (id) => {
  const result = await httpClient.delete(`${serverMould.DELETEBILL}/${id}`);
  // console.log(result.data.result)
  return result.data.result;
};

const updateStatus02 = async (data) => {
  const result = await httpClient.post(`${serverMould.UPDATESTATUS}02`, data);
  return result.data.result;
};

const updateStatus03 = async (data) => {
  const result = await httpClient.post(`${serverMould.UPDATESTATUS}03`, data);
  return result.data.result;
};

const updateStatus04 = async (data) => {
  const result = await httpClient.post(`${serverMould.UPDATESTATUS}04`, data);
  return result.data.result;
};

const getModifyBill = async (id) => {
  const result = await httpClient.get(`${serverMould.GETMODIFYBILL}/${id}`);
  return result.data;
};

const getModelAll = async () => {
  const result = await httpClient.get(serverMould.GETMODELMOULDALL);
  return result.data;
};

const getMouldBillDetail = async (ModelNo) => {
  const data = {
    ModelNo: ModelNo,
  };
  const result = await httpClient.post(
    `${serverMould.GETMOULDBILLDETAIL}`,
    data
  );
  return result.data;
};

const getMouldDepart = async () => {
  const result = await httpClient.get(serverMould.GETMOULDDEPART);
  return result.data;
};

const modifyBill = async (data) => {
  const result = await httpClient.post(serverMould.MODIFYBILL, data);
  return result.data.result;
};

const getOrderNumberEX = async () => {
  const result = await httpClient.get(serverMould.GETORDERNUMBEREX);
  return result.data;
};

const getPictDetail = async (ModelNo) => {
  const data = {
    ModelNo: ModelNo,
  };
  const result = await httpClient.post(serverMould.GETPICTDETAIL, data);
  return result.data;
};



export default {
  getMouldBill,
  getOrderNumber,
  getModelMould,
  getJobmould,
  insertBillMould,
  deleteBillMould,
  updateStatus02,
  updateStatus03,
  updateStatus04,
  getModifyBill,
  getModelAll,
  getMouldBillDetail,
  getMouldDepart,
  modifyBill,
  getOrderNumberEX,
  getPictDetail,
  getMouldBillFindOne
};
