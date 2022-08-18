import httpClient from './httpClient'
import { server, serverOrderStatus } from './constants'


const getOrderStatus = async (data) => {
    // console.log(data);
    const result = await httpClient.post(serverOrderStatus.getOrderStatus, data)
    // console.log(result.data)
    return result.data
}

const getOrderStatusBetween = async (data) => {
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

const getStoneProduct = async (OrderNumber) => {
    const data = {
        OrderNumber: OrderNumber
    }
    const result = await httpClient.post(serverOrderStatus.GETSTONEPRODUCT, data)
    return result.data
}

const getdetailStatus = async (OrderNumber) => {
    const data = {
        OrderNumber: OrderNumber
    }
    // console.log('backend', data)
    const result = await httpClient.post(serverOrderStatus.GETORDERDETAILSTATUS, data)
    return result.data
}

const getWeightDiffGold = async () => {
    const result = await httpClient.get(serverOrderStatus.GETWIGHTDIFFGOLD)
    return result.data
}

const getDataLineChartQA = async (pdTeam) => {
    const data = {
        pdTeam: pdTeam
    };
    const result = await httpClient.post(serverOrderStatus.GETDATALINECHART, data);
    return result.data
};


const castingRepairByItem = async (orderNumber) => {
    const res = await httpClient.post(serverOrderStatus.GETCASTINGREPAIRBYITEM, {
        orderNumber: orderNumber
    });
    return res.data
}

const castingRepairByOrder = async (betweenDate) => {
    const res = await httpClient.post(serverOrderStatus.GETCASTINGREPAIRBYORDER, {
        minDate: betweenDate.minDate,
        maxDate: betweenDate.maxDate
    });
    const filterStatus = [...(new Set(res.data.map(({ Status }) => Status)))];
    // console.log(filterStatus);
    return { res: res.data, filterStatus: filterStatus }
}

const getInvForOrder_New = async (orderNumber, material) => {
    // console.log(orderNumber, material)
    if (material === 'stone') {
        const data = {
            orderNumber: orderNumber
        }

        const res = await httpClient.post("getStoneForOrder_New", data);

        return res.data
    } else if (material === 'parts') {
        const data = {
            orderNumber: orderNumber,
            isPart: ''
        }
        const res = await httpClient.post("getPartForOrder_New", data);
        // console.log(res.data);
        return res.data
    }
}

const getTotalQtybyPDProcess = async (orderNumber) => await httpClient.post("getTotalQtybyPdProcess", orderNumber)

const getItemInProcess = async (data) => await httpClient.post("getItemInProcess", data)



export default {
    getOrderStatus,
    getOrderStatusBetween,
    getStoneByOrder,
    getProduct,
    getStoneProduct,
    getdetailStatus,
    getWeightDiffGold,
    getDataLineChartQA,
    castingRepairByItem,
    castingRepairByOrder,
    getInvForOrder_New,
    getTotalQtybyPDProcess,
    getItemInProcess
}