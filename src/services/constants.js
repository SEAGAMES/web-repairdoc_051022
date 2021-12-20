export const NETWORK_CONNECTION_MESSAGE = "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE = "A Network timeout has occururd, Please try again";
export const UPLOAD_PHOTO_FAIL_MESSAGE = "An error has occurred. The photo was unable to upload";
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

export const apiUrl = "http://192.168.3.7:3000/api/v2"
export const apiConvertImg = "http://192.168.3.5:3000/convertImg"

export const server = {
    LOGIN_URL: 'login',
    REGISTER_URL: 'register',
    PRODUCT_URL: 'product',
    TRANSACTION_URL: 'transaction',
    REPORT_URL: 'report',
    TOKEN_KEY: 'token',
    USERNAME: 'username',
    FULLNAME: 'fullname',
    PolicyCode: 'policycode',
    PolicyName: 'policyname',
    EmpPict: 'EmpPict',
    FACTORY: 'Factory',
    APPOVE: 'Appove'
};

export const serverDevice = {
    GETCATEGORY: 'getcategory',
    GETROOM: 'getroom',
    GETFLOOR: 'getfloor',
    GETEMPLOYEE: 'getemployee',
    CREATEDEVICE: 'create-device',
    GETDEVICEMASTER: 'getdevicemaster',
    GETEDITDEVICE: 'getdeviceedit',
    EDITDEVICE: 'edit-device',
    GETREPAIRDETAIL: 'getRepairDetail',
    UPDATESTATUSDEVICE: 'updatestatusdevice'
}

export const serverRepairDoc = {
    GETDEVICEFILTER: 'getFilterDeviceNo',
    CREATEREPAIRDOC: 'insertrepairdoc',
    GETBILLREPAIR: 'getbillrepairdoc',
    GETBILLREPAIRDETAIL: 'getbillrepairdocdetail',
    GETBILLREPAIRMODIFY: 'getrepairdocmodify',
    UPDATEREPAIRDOC: 'edit-repairdoc',
    UPDATESTATUS: 'updatestatus',
    GETSTATUSSHOW: 'getstatusshow',
    GETSUMBILL: 'getSumBill',
    UPDATEFINISHDATE: 'updatefinishdate',
    UPDATEAPPROVE: 'updateapprove',
    GETHISTORYBILL: 'gethistorybillrepair'
}

export const serverReport = {
    getRepairMonthChart: 'reportChartBill'
}

export const serverpostNews = {
    getpostNews: 'getpostnews',
    createpost: 'createpost',
    deletepost: 'deletepost',
    disablepost: 'disablepost'
}

export const serverMould = {
    GETMOULDBILL: 'getmouldbill',
    GETORDERNUMBER: 'getmouldordernumberwip',
    GETMODELMOULD: 'getmodelmould',
    GETJOBMOULD: 'getjobmould',
    INSERTBILL: 'insertbillmould',
    DELETEBILL: 'deletebillmould',
    UPDATESTATUS: 'updatestatusmould',
    GETMODIFYBILL: 'getmodifymouldbill',
    GETMODELMOULDALL: 'getmodelmouldall',
    GETMOULDBILLDETAIL: 'getmouldbillDetail',
    GETMOULDDEPART: 'moulddepart',
    MODIFYBILL: 'ModifyBillMould',
    GETORDERNUMBEREX: 'getmouldordernumber-ex',
    GETPICTDETAIL: 'selectpictmould'

}

export const serverOrderStatus = {
    getOrderStatus : 'getorderstatus',
    getOrderStatusBetween : 'getorderstatusbetween',
    GETSTONEBYORDER: 'stonepurchasebyorder',
    GETPRODUCTBYORDER: 'getproductbyorder',
    GETSTONEPRODUCT: 'getstoneproduct',
    GETORDERDETAILSTATUS: 'getorderdetailstatus',
    GETWIGHTDIFFGOLD: 'reportworkerweightgold'
}

export const serverStone = {
    GETSTONEPURCHASE : 'stonepurchase',
    GETSTONEPRODUCT: 'stonepurchasebyorder'
}

export const serverWaterLog = {
    WATERLOGREPORTMONTH: 'getmouldbill'
}


// Update 20-10-2564
export const serverPurchaseRequest = {
    GETINVENTORYFULL: 'getInventoryfull',
    GETITEMTYPE: 'getItemType',
    CREATEPURCHASEBILL : 'createPurchaseBill',
    GETPURCHASEBILLMASTER : 'getPurchaseBillMaster',
    GETPURCHASEBILLDETAIL : 'getPurchaseBillDetail',
    GETSECTION : 'getSection' , 
    GETBILLORDER : 'getBillOrder' ,
    GETEMPLOYEE : 'getEmployee' ,
    DELETEBILLPURCHASE : 'deleteBillPurchase',
    GETITEMSTATUS : 'getItemStatus',
    UPDATESTATUS : 'updateStatus',
    GETBILLMASTERBYBILLID :  'getBillMasterByBillId',
    UPDATEINSPACTOR : 'updateInspactor',
    UPDATEBILLDETAIL : 'updateBill_Detail',
    UPDATENEWITEM : 'updateNewItem',
    DELETEFROMEDIT : 'deleteFromEdit',
    DELETEBILLDETAIL : 'deleteBillDetail',
    GETPURCHASEPOSITION : 'getPurchasePosition',
    GETITEMSNAME : 'getItemsName'
}


