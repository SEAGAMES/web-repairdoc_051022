import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";
import apiDevice from "../services/apiDevice"
import { server } from "../services/constants";
import apiRepairDoc from "../services/apiRepairDoc"
import apiReport from "../services/apiReport"
import apiMould from "../services/apiMould"
// import moment from "moment";



Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menuShow: false,
        isLogged: false,
        username: "",
        fullName: "",
        EmpPict: "",
        Factory: "",
        levelUser: {
            policyCode: '',
            policyName: '',
            Appove: "",
        },
        deviceMaster: {
            selectDepart: "",
            ShowTable: false,
            editDeviceID: 0,
            showModify: false,
            deviceData: []
        },
        deviceModify: {
            deviceData: {
                JobTypeCode: null,
                CategoryCode: null,
                DeviceNo: null,
                FloorCode: null,
                RoomCode: null,
                PurchaseDate: new Date("2000/01/01"),
                OutWarranty: new Date("2000/01/01"),
                Owner: "",
                Desciption: "",
                Status1: "0",
                Status2: "",
            },
        },
        deviceForm: {
            Category: [],
            Floor: [],
            Room: [],
            Emp: []
        },
        repairMaster: {
            getSumBill: {}
        },
        repairCreate: {
            deviceNo: [],
            BillRepair: []
        },
        repairModify: {
            billRepair: 0,
            dataRepair: {},
            ShowPopupRepairModify: false,
            disableInput: {
                showDevice: false
            }
        },
        repairDetail: {
            dataHeader: {}
        },
        report: {
            chartBillMonth: [],
            datachartShow: null
        },
        mould: {
            mouldBill: [],
            mouldModify: {
                showPopupModify: false,
                dataModifyBill: {
                    BillDate: null,
                    DocID: '',
                    ID: 0,
                    JobType: "0",
                    ModelNo: "",
                    OrderNumber: "",
                    Owner: "",
                    Qty: 0,
                    Receiver: "",
                    RepairModelDesc: "",
                    ReturnDate: null,
                    ReturnPerson: "",
                    Status: ""
                },
                dataMouldAll: [],
                PictMould: '',
                checkOrder: null,
                OrderNumberSelect: [],
                JobTypeSelect: []
            },
            mouldDetail: {
                dataHeader: {
                    BillDate: "",
                    Datelate: 0,
                    DocID: "",
                    ID: 0,
                    JobType: "",
                    JobTypeName: "",
                    ModelNo: "",
                    OrderNumber: "",
                    Owner: "",
                    OwnerFullName: "",
                    Qty: 0,
                    Receiver: "",
                    ReceiverFullName: "",
                    RepairModelDesc: "",
                    ReturnDate: null,
                    ReturnPerson: null,
                    ReturnPersonFullName: null,
                    Status: "",
                },
                dataTable: [],
                PictModel: ''
            }
        },
        orderStatus: {
            orderStatusMaster: {},
            orderStatusDetail: {
                StatusHeader: {}
            }
        },
        InsertDevice: {},
        waterlog: {
            chartData: []
        },
        //Update 20-10-2564
        purchaseDetail: {
            dataHeader: null
        },
        
    },

    getters: {
        isLogin(state) {
            return state.isLogged;
        },
        username(state) {
            return state.username;
        },
        fullName(state) {
            return state.fullName;
        },
        EmpPict(state) {
            return state.EmpPict;
        },
        Factory(state) {
            return state.Factory;
        },
        editDeviceID(state) {
            return state.deviceMaster.editDeviceID;
        },
        showModifyDevice(state) {
            return state.deviceMaster.showModify;
        },
        DataDeviceEdit(state) {
            return state.deviceModify.deviceData;
        },
        DataDeviceMaster(state) {
            return state.deviceMaster.deviceData;
        },
        formDeviceCat(state) {
            return state.deviceForm.Category;
        },
        formDeviceFloor(state) {
            return state.deviceForm.Floor;
        },
        formDeviceRoom(state) {
            return state.deviceForm.Room;
        },
        formDeviceEmp(state) {
            return state.deviceForm.Emp;
        },
        DeviceFilter(state) {
            return state.repairCreate.deviceNo;
        },
        billRepair(state) {
            return state.repairCreate.BillRepair;
        },
        ShowPopupRepairModify(state) {
            return state.repairModify.showPopupRepairModify;
        },
        BillRepairModify(state) {
            return state.repairModify.billRepair;
        },
        DataRepairModify(state) {
            return state.repairModify.dataRepair;
        },
        policyCode(state) {
            return state.levelUser.policyCode;
        },
        policyName(state) {
            return state.levelUser.policyName;
        },
        policyAppove(state) {
            return state.levelUser.Appove;
        },
        getSumBill(state) {
            return state.repairMaster.getSumBill;
        },
        ReportChartBillMonth(state) {
            return state.report.chartBillMonth;
        },
        dataChartShow(state) {
            return state.report.datachartShow;
        },
        mouldBill(state) {
            return state.mould.mouldBill;
        },
        showPopupMouldModify(state) {
            return state.mould.mouldModify.showPopupModify;
        },
        mouldModifybill(state) {
            return state.mould.mouldModify.dataModifyBill;
        },
        dataMouldAll(state) {
            return state.mould.mouldModify.dataMouldAll;
        },
        dataMouldDetail(state) {
            return state.mould.mouldDetail.dataHeader;
        },
        dataMouldDetailTable(state) {
            return state.mould.mouldDetail.dataTable;
        },
        dataPictMouldModify(state) {
            return state.mould.mouldModify.PictMould;
        },
        orderModifySelect(state) {
            return state.mould.mouldModify.OrderNumberSelect;
        },
        jobTypeModifySelect(state) {
            return state.mould.mouldModify.JobTypeSelect;
        },
        pictDetail(state) {
            return state.mould.mouldDetail.PictModel;
        },
        statusDetailHeader(state) {
            return state.orderStatus.orderStatusDetail.StatusHeader;
        },
        // repairInputModify(state) {
        //     return state.repairModify.disableInput.showDevice
        // }

        //Update 20-10-2564
        dataPurchaseDetail(state) {
            return state.purchaseDetail.dataHeader;
        },
    },

    mutations: {
        SET_LOGGED_IN(state) {
            state.isLogged = true;
        },
        SET_LOGGED_OUT(state) {
            state.isLogged = false;
        },
        SET_USERNAME(state, value) {
            state.username = value;
        },
        SET_FULLNAME(state, value) {
            state.fullName = value;
        },
        SET_EmpPict(state, EmpPict) {
            state.EmpPict = EmpPict;
        },
        SET_Factory(state, Factory) {
            state.Factory = Factory;
        },
        SET_MODIFYDEVICEID(state, value) {
            (state.deviceMaster.editDeviceID = value),
            (state.deviceMaster.showModify = true);
        },
        SET_DataDeviceEdit(state, value) {
            state.deviceModify.deviceData = value;
        },
        SET_DataDeviceMaster(state, value) {
            state.deviceMaster.deviceData = value;
        },
        SET_DataFormCat(state, resultCat) {
            state.deviceForm.Category = resultCat;
        },
        SET_DataFormFloor(state, resultFloor) {
            state.deviceForm.Floor = resultFloor;
        },
        SET_DataFormRoom(state, resultRoom) {
            state.deviceForm.Room = resultRoom;
        },
        SET_DataFormEmp(state, resultEmp) {
            state.deviceForm.Emp = resultEmp;
        },
        SET_DataDeviceFilter(state, result) {
            state.repairCreate.deviceNo = result
        },
        SET_DatabillRepair(state, result) {
            state.repairCreate.BillRepair = result
        },
        SET_DataBillRepairModify(state, result) {
            state.repairModify.dataRepair = result
        },
        SET_RepairModifyID(state, result) {
            state.repairModify.billRepair = result
            state.repairModify.ShowPopupRepairModify = true
        },
        SET_PolicyCode(state, result) {
            state.levelUser.policyCode = result
        },
        SET_PolicyName(state, result) {
            state.levelUser.policyName = result
        },
        SET_APPOVE(state, result) {
            state.levelUser.Appove = result
        },
        SET_GetSumBill(state, result) {
            state.repairMaster.getSumBill = result
        },
        SET_DATACHART_BILL(state, result) {
            state.report.chartBillMonth = result
        },
        SET_DATAChartShow(state, result) {
            state.report.datachartShow = result
        },
        SET_GETMOULDBILL(state, result) {
            state.mould.mouldBill = result
        },
        SET_MOULD_MODIFYBILL(state, result) {
            state.mould.mouldModify.dataModifyBill = result
        },
        SET_MODELMOULDALL(state, result) {
            state.mould.mouldModify.dataMouldAll = result
        },
        SET_DATAMOULDDETAIL(state, data) {
            state.mould.mouldDetail.dataHeader = data
        },
        SET_DATAMOULDDETAIL_TABLE(state, result) {
            state.mould.mouldDetail.dataTable = result
        },
        SET_filterImgMould(state, NewPict) {
            state.mould.mouldModify.PictMould = NewPict
        },
        SET_ORDER_MODIFYBILL(state, result) {
            state.mould.mouldModify.OrderNumberSelect = result
        },
        SET_JOBTYPE_MODIFYBILL(state, JobType) {
            state.mould.mouldModify.JobTypeSelect = JobType
        },
        SET_PICTDETAIL(state, result) {
            state.mould.mouldDetail.PictModel = result
        },
        SET_DATAORDERSTATUS(state, data) {
            state.orderStatus.orderStatusDetail.StatusHeader = data
        },
        SET_DATA_WATERLOG_CHART(state, data) {
            state.waterlog.chartData.push(data)
        }
    },
    actions: {
        async doLogin({ commit, dispatch }, { username, password }) {
            let result = await api.login({ username, password });
            if (result == true) {
                let fullName = localStorage.getItem(server.FULLNAME);
                let PolicyCode = localStorage.getItem(server.PolicyCode);
                let PolicyName = localStorage.getItem(server.PolicyName);
                let EmpPict = localStorage.getItem(server.EmpPict);
                let Factory = localStorage.getItem(server.FACTORY);
                let Appove = localStorage.getItem(server.APPOVE);
                // console.log(fullName);
                commit("SET_LOGGED_IN");
                commit("SET_USERNAME", username);
                commit("SET_FULLNAME", fullName);
                commit("SET_PolicyCode", PolicyCode);
                commit("SET_PolicyName", PolicyName);
                commit("SET_APPOVE", Appove);
                commit("SET_EmpPict", EmpPict);
                commit("SET_Factory", Factory);
            } else {
                dispatch("doLogout", {});
            }
        },
        doLogout({ commit }) {
            api.logOff();
            commit("SET_LOGGED_OUT");
            commit("SET_USERNAME", "");
        },
        // เช็คว่า Login อยู่หรือเปล่า ถ้าใช่ให้ไปดึงค่าที่ Storage กลับ
        restoreLogin({ commit }) {
            if (api.isLoggedIn() == true) {
                let username = localStorage.getItem(server.USERNAME);
                let fullName = localStorage.getItem(server.FULLNAME);
                let PolicyCode = localStorage.getItem(server.PolicyCode);
                let PolicyName = localStorage.getItem(server.PolicyName);
                let EmpPict = localStorage.getItem(server.EmpPict)
                let Factory = localStorage.getItem(server.FACTORY);
                let Appove = localStorage.getItem(server.APPOVE);
                commit("SET_LOGGED_IN");
                commit("SET_USERNAME", username);
                commit("SET_FULLNAME", fullName);
                commit("SET_PolicyCode", PolicyCode);
                commit("SET_PolicyName", PolicyName);
                commit("SET_APPOVE", Appove);
                commit("SET_EmpPict", EmpPict);
                commit("SET_Factory", Factory);
            }
        },
        async modifyDeviceID({ commit }, { id }) {
            commit("SET_MODIFYDEVICEID", id);
            const result = await apiDevice.geteditDevice(id);
            commit("SET_DataDeviceEdit", result[0]);
        },

        async loadDataDeviceMaster({ commit }) {
            const result = await apiDevice.getDeviceMaster();
            commit("SET_DataDeviceMaster", result);
            // console.log('data1', result);
        },
        async loadFormDevice({ commit }) {
            const resultCat = await apiDevice.getCategory();
            const resultFloor = await apiDevice.getFloor();
            const resultRoom = await apiDevice.getRoom();
            const resultEmp = await apiDevice.getemployee();
            commit("SET_DataFormCat", resultCat);
            commit("SET_DataFormFloor", resultFloor);
            commit("SET_DataFormRoom", resultRoom);
            commit("SET_DataFormEmp", resultEmp);
        },
        async getDeviceFilter({ commit }) {
            const result = await apiRepairDoc.getDeviceFilter();
            commit("SET_DataDeviceFilter", result)
        },
        async getBillRepair({ commit }) {
            const result = await apiRepairDoc.getBillRepair();
            // console.log(result)
            // console.log('state', moment(result[0].JobDate).format('HH:MM'))
            // console.log('state2', moment(result[0].JobDate).tz("Atlantic/Azores").format('HH:MM'))
            // console.log('state3', result[0].JobDate.toTimeString())
            // console.log('state2', moment.utc(result[0].JobDate).tz("America/Los_Angeles").format('LT'))
            commit("SET_DatabillRepair", result)
        },
        async getBillRepairModify({ commit }, { id }) {
            commit("SET_RepairModifyID", id)
            const result = await apiRepairDoc.getBillRepairModify(id);
            commit("SET_DataBillRepairModify", result[0])
            // commit("")
            // console.log(result[0])
            // console.log(this.$store.state.repairModify.ShowPopupRepairModify)
        },
        async getSumBill({ commit }, { data }) {
            // console.log(data)
            const result = await apiRepairDoc.getSumBill(data);
            // console.log(result)
            commit("SET_GetSumBill", result[0])
        },
        async reportChartBill({ commit }) {
            const result = await apiReport.reportChartBill();
            commit("SET_DATACHART_BILL", result)
        },
        setDataChartShow({ commit }, { data }) {
            commit("SET_DATAChartShow", data)
        },
        async getMouldBill({ commit }) {
            const result = await apiMould.getMouldBill();
            commit("SET_GETMOULDBILL", result)
        },
        async getMouldModifyBill({ commit }, { id }) {
            const result = await apiMould.getModifyBill(id)
            // console.log(result[0])
            commit("SET_MOULD_MODIFYBILL", result[0])
            console.log(result[0])
            let JobType = await apiMould.getJobmould();
            if (result[0].Status === '01') {
                const resultOrder1 = await apiMould.getOrderNumber();
                commit("SET_ORDER_MODIFYBILL", resultOrder1)
                console.log(resultOrder1)
                JobType = JobType.filter((i) => {
                    return i.JobType !== '05'
                })
                commit("SET_JOBTYPE_MODIFYBILL", JobType)
            } else if (result[0].Status === '05') {
                const resultOrderEx = await apiMould.getOrderNumberEX();
                commit("SET_ORDER_MODIFYBILL", resultOrderEx)
                console.log(resultOrderEx)
                JobType = JobType.filter((i) => {
                    return i.JobType === '05'
                })
                commit("SET_JOBTYPE_MODIFYBILL", JobType)
            }
        },
        async getModelMouldAll({ commit }, { ModelNo }) {
            // console.log(OrderNumber);
            // const data = { OrderNumber: OrderNumber }
            const ModelMould = ModelNo
            const result = await apiMould.getModelAll()
            commit("SET_MODELMOULDALL", result)
            let filterImg = result.filter((f) => {
                return f.ModelNo === ModelMould
            })
            // console.log(ModelMould, result)
            // console.log(filterImg[0].NewPict)
            commit("SET_filterImgMould", filterImg[0].NewPict)
        },
        async setDataMouldDetail({ commit }, { data } ) {
            // console.log(data);
            commit("SET_DATAMOULDDETAIL", data)
            const result = await apiMould.getMouldBillDetail(data.ModelNo);
            const result2 = await apiMould.getPictDetail(data.ModelNo);
            // console.log('state', result2)
            commit("SET_PICTDETAIL", result2[0].NewPict)
            commit("SET_DATAMOULDDETAIL_TABLE", result)
        },
        SendDataOrderStatus({ commit }, { data } ) {
            commit("SET_DATAORDERSTATUS", data)
        },
        SetDataWaterLogChart({ commit }, { data }) {
            commit("SET_DATA_WATERLOG_CHART", data)
        }

    }
});