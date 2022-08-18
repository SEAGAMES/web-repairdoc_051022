import axios from "axios";
import { apiServer } from "./constants";

const apiURL = apiServer + 'api_facwipstatus/'

const apiURLPrismaServer = apiServer + 'api_facwipstatus/'

const getOrderStatusNew = async (filter) => {
    const { data } = await axios.post(`${apiURL}getOrderStatusNew`, filter)
    return data
};

const insertDueQa = async (dataInput) => {
    const { data } = await axios.post(`${apiURL}insertDueQa`, dataInput)
    return data
}

const getProductStatusNew = async (orderNumber) => {
    const { data } = await axios.post(`${apiURL}getProductStatusNew`, orderNumber)
    // console.log('data', data)
    return data
}

export default { getOrderStatusNew, insertDueQa, getProductStatusNew }