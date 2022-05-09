import httpClient from './httpClient'
import { server, serverOrderStatus } from './constants'


const getOrderStatus = async(data) => {
    // console.log(data);
    const result = await httpClient.post(serverOrderStatus.getOrderStatus, data)
    // console.log(result.data)
    return result.data
}

const getOrderStatusBetween = async(data) => {
    const result = await httpClient.post(serverOrderStatus.getOrderStatusBetween, data)
    return result.data
}

const getStoneByOrder = async (OrderNumber) => {
    const data = {
        OrderNumber: OrderNumber
    };
    const result = await httpClient.post(serverOrderStatus.GETSTONEBYORDER, data)
    // console.log('service', result)
    return result.data
};

const getProduct = async (OrderNumber) => {
    const data = {
        OrderNumber: OrderNumber
    };
    const result = await httpClient.post(serverOrderStatus.GETPRODUCTBYORDER, data)
    return result.data
}

const getStoneProduct = async(OrderNumber) => {
    const data = {
        OrderNumber: OrderNumber
    }
    const result = await httpClient.post(serverOrderStatus.GETSTONEPRODUCT, data)
    return result.data
}

const getdetailStatus = async(OrderNumber) => {
    const data = {
        OrderNumber: OrderNumber
    }
    // console.log('backend', data)
    const result = await httpClient.post(serverOrderStatus.GETORDERDETAILSTATUS, data)
    return result.data
}

const getWeightDiffGold = async()=> {
    const result = await httpClient.get(serverOrderStatus.GETWIGHTDIFFGOLD)
    return result.data
}

const getDataLineChartQA = async(pdTeam) => {
    const data = {
        pdTeam: pdTeam
    };
    const result = await httpClient.post(serverOrderStatus.GETDATALINECHART ,data);
    return result.data
};



export default {
    getOrderStatus,
    getOrderStatusBetween,
    getStoneByOrder,
    getProduct,
    getStoneProduct,
    getdetailStatus,
    getWeightDiffGold,
    getDataLineChartQA
}