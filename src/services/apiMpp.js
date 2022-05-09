import { server, serverMpp } from '../services/constants'
import httpClient from './httpClient'


const mppMeshDataDetail = async (orderNumber) => {
    let responseDetail = await httpClient.post(serverMpp.GETMPPSTATUS, orderNumber);
    const responseInv = await httpClient.post(serverMpp.GETSTONEBYITEM, orderNumber);
    const responsePart = await httpClient.post(serverMpp.GETPARTSBYITEM, orderNumber);
    // console.log('DDD', responseDetail);
    // console.log('RRR', responseInv);
    // console.log('PPP', responsePart);
    let result = responseDetail.data;
    responseDetail.data.forEach((dataDetail, index) => {
        result[index].boxSelect = false;
        result[index].stone = responseInv.data.filter((dataFilter) => {
            return dataFilter.OrderItemNo === dataDetail.OrderItemNo;
        });
    });
    responseDetail.data.forEach((dataDetail, index) => {
        result[index].parts = responsePart.data.filter((dataFilter) => {
            return dataFilter.OrderItemNo === dataDetail.OrderItemNo;
        })
    })
    return result
}

const mppUpdatePiority = async(orderNumber, piority) => {
    const data = {
        orderNumber : orderNumber,
        Piority: piority
    }
    console.log(data);
    const result = await httpClient.post(`${serverMpp.UPDATEPIORITY}`, data );
    // console.log(result.data);
    return result.data
}

const mppGetMoldStatus = async() => {
    const result = await httpClient.get(serverMpp.GETMOLDSTATUS);
    return result.data
}

const mppGetFilterDate = async(data) => {
    const result = await httpClient.post(`${serverMpp.GETFILTERDATE}`, data );
    return result.data
 }

 const mppGetFilterStatusStone = async(orderNumber, statusStone) => {
     const data = {
         orderNumber: orderNumber,
         statusStone: statusStone
     }
     const result = await httpClient.post(serverMpp.GETFILTERSTATUSSTONE, data);
     return result.data
 }

 const mppGetStoneWaxSet = async(orderNumber) => {
     const data = {
         orderNumber: orderNumber
     }
    const result = await httpClient.post(`${serverMpp.GETFILTERSTONEWAXSET}`, data );
    return result.data
 }

 const mppGetDateStoneWaxSet = async(data) => {
    const result = await httpClient.post(`${serverMpp.GETFILTERDATESTONEWAXSET}`, data );
    return result.data
 }

 const mppGetDateStoneNonWaxSet = async(data) => {
    const result = await httpClient.post(serverMpp.GETFILTERDATESTONENONWAXSET, data );
    return result.data
 }

 const mppGetDatePearl = async(data) => {
    const result = await httpClient.post(serverMpp.GETFILTERDATEPEARL, data );
    return result.data
 }

 const getQueForFilter = async (orderNumber) => {
    const data = {
        orderNumber: orderNumber
    };
    const result = await httpClient.post(serverMpp.GETQUEFORFILTER, data);
    return result.data;
} 

const getHistoryDue = async (orderNumber, InvCode) => {
    const data = {
        orderNumber: orderNumber,
        InvCode: InvCode
    };
    const result =  await httpClient.post(serverMpp.GETHISTORYDUE, data);
    return result.data;
}

const getDataPurchaseDetail = async (orderNumber, InvCode) => {
    const data = {
        orderNumber: orderNumber,
        InvCode: InvCode
    };
    const result =  await httpClient.post(serverMpp.GETPURCHASEDETAIL, data);
    return result.data;
}

const getBillForReceive = async (orderNumber, billID, factoryTeam) => {
    const data = {
        orderNumber: orderNumber,
        billID: billID,
        factoryTeam: factoryTeam
    }
    const result = await httpClient.post(serverMpp.GETBILLFORRECEIVE, data);
    return result.data;
}   

const getBillMaterails = async (orderNumber, factoryTeam) => {
    const data = {
        orderNumber: orderNumber,
        factoryTeam: factoryTeam
    }
    const result = await httpClient.post(serverMpp.GETBILLMATERAILS, data);
    return result.data;
}   

const confirmReceiveBill = async ( billID, receiver ) => {
    const data = {
        billID: billID,
        receiver: receiver
    }
    // console.log(data)
    const result = await httpClient.post(serverMpp.CONFIRMBILLRECEIVE, data);
    return result.data
}

const CheckinProgram = async (username, route) => {
    const data = {
        username: username,
        route: route
    }
    // console.log(data);
    const res = await httpClient.post(serverMpp.CHECKINPROGRAM, data);
    console.log(res.data.result);
}

 // GAME 
// CREATESTATUSHISTORY
const createStatusHistory = async (orderNo, itemNo, updater, statusFrom, statusTo) => {
    const data = {
      OrderNo: orderNo,
      ItemNo: itemNo,
      Updater: updater,
      StatusFrom: statusFrom,
      StatusTo: statusTo,
    };
    const result = await httpClient.post(serverMpp.CREATESTATUSHISTORY, data);
    // console.log("DataDetail : ", data);
    return result;
  };

 // GETSTATUSDETAIL
const getHistoryStatusMold = async (orderNumber , itemNo) => {
    const data = {
        orderNumber: orderNumber,
        ItemNo: itemNo,
    };
    // console.log('data : ' , data)
    const result = await httpClient.post(serverMpp.GETHISTORYSTATUSMOLD, data);
    return result.data;
  }

export default {
    // mppStatus,
    // mppGetStone,
    mppUpdatePiority,
    mppGetMoldStatus,
    mppMeshDataDetail,
    mppGetFilterDate,
    mppGetFilterStatusStone,
    mppGetDatePearl,
    mppGetDateStoneWaxSet,
    mppGetDateStoneNonWaxSet,
    mppGetStoneWaxSet,
    getQueForFilter,
    getHistoryDue,
    getDataPurchaseDetail,
    getBillForReceive,
    confirmReceiveBill,
    getBillMaterails,
    CheckinProgram,
    // GAME
    getHistoryStatusMold,
    createStatusHistory,
}