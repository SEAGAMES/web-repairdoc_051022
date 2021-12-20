import httpClient from './httpClient'
import { server, serverOrderStatus } from './constants'


const getOrderStatus = async() => {
    const result = await httpClient.get(serverOrderStatus.getOrderStatus)
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

const test = [
    {
        Purchase_Bill_ID: 1,
        BillID: 1,
        PurChaseDate: new Date(),
        Owner: '1372',
        Detail: [
            {
                itemNo: 1,
                ProductID: '123',
                Qty: 100
            },
            {
                itemNo: 2,
                ProductID: '123',
                Qty: 100
            },
            {
                itemNo: 3,
                ProductID: '123',
                Qty: 100
            },
            {
                itemNo: 4,
                ProductID: '123',
                Qty: 100
            },
            {
                itemNo: 5,
                ProductID: '123',
                Qty: 100
            },
        ]
    }
]

export default {
    getOrderStatus,
    getOrderStatusBetween,
    getStoneByOrder,
    getProduct,
    getStoneProduct,
    getdetailStatus,
    getWeightDiffGold
}