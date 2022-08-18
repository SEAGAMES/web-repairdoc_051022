import axios from "axios";
import { apiServer } from "./constants";

const apiURL = apiServer + 'apiProcess/'

const apiURLPrismaServer = apiServer + 'process/'

const getProcess = (async (EmpCode) => await axios.post(`${apiURL}getProcessChoice`, EmpCode));

const getItemForProcess = (async (OrderNumber) => (await axios.post(`${apiURL}getItemforProcress`, { OrderNumber: OrderNumber })).data);

const getOrderforprocess = async () => await axios.get(`${apiURL}getorderforprocess`);

const insertBill = async (dataInsert) => await (await axios.post(`${apiURLPrismaServer}insertBill`, (dataInsert))).data;

const getProcessBill = async () => await axios.get(`${apiURLPrismaServer}getProcessBill`);

const getPict = async (bill_ID) => await axios.post(`${apiURLPrismaServer}getPictForBill`, { bill_ID: bill_ID });

export default { getProcess, getItemForProcess, getOrderforprocess, insertBill, getProcessBill, getPict }