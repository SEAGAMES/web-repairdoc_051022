import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";


// import api from "../services/api";


Vue.use(VueRouter);


const checkLogin = async(to, from, next) => {
    next()
    // if (await api.isLoggedIn() === true) {
    //     next()
    // } else {
    //     next()
    // }
}

const routes = [
    {
        path: "/home",
        name: "home",
        component: Home,
        beforeEnter: checkLogin
    },
    {
        path: "/about",
        name: "about",
        component: About,
        beforeEnter: checkLogin
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/report",
        name: "report",
        component: () => import(/* webpackChunkName: "report" */ "../views/report.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/water-report",
        name: "water-report",
        component: () => import(/* webpackChunkName: "water-report" */ "../views/Waterlog/water-report.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/water-meter",
        name: "water-meter",
        component: () => import(/* webpackChunkName: "water-meter" */ "../views/Waterlog/waterMeter.vue"),
        beforeEnter: checkLogin
    },
     {
        path: "/sound-control",
        name: "sound-control",
        component: () => import(/* webpackChunkName: "sound-control" */ "../views/SoundControl.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/repairdoc-master",
        name: "repairdoc-master",
        component: () => import(/* webpackChunkName: "repairdoc-master" */ "../views/repairdoc/repiarDocMaster.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/repairdoc-edit",
        name: "repairdoc-edit",
        component: () => import(/* webpackChunkName: "repairdoc-edit" */ "../views/repairdoc/repairdocEdit.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/repairdoc-detail",
        name: "repairdoc-detail",
        component: () => import(/* webpackChunkName: "repairdoc-detail" */ "../views/repairdoc/repairdocDetail.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/repairdoc-create",
        name: "repairdoc-create",
        component: () => import(/* webpackChunkName: "repairdoc-create" */ "../views/repairdoc/repairdocCreate.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/device-master",
        name: "device-master",
        component: () => import(/* webpackChunkName: "device-master" */ "../views/Device/deviceMaster.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/device-detail/:id",
        name: "device-detail",
        params: true,
        component: () => import(/* webpackChunkName: "deviceDetail" */ "../views/Device/deviceDetail.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/device-create",
        name: "device-create",
        component: () => import(/* webpackChunkName: "device-create" */ "../views/Device/deviceCreate.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mould-master",
        name: "mould-master",
        component: () => import(/* webpackChunkName: "mould-master" */ "../views/Mould/MouldMaster.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mould-detail",
        name: "mould-detail",
        component: () => import(/* webpackChunkName: "mould-detail" */ "../views/Mould/MouldDetail.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mould-create",
        name: "mould-create",
        component: () => import(/* webpackChunkName: "mould-create" */ "../views/Mould/MouldCreate.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mould-modify",
        name: "mould-modify",
        component: () => import(/* webpackChunkName: "mould-modify" */ "../views/Mould/MouldModify.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mould-multicreate",
        name: "mould-multicreate",
        component: () => import(/* webpackChunkName: "mould-multicreate" */ "../views/Mould/MouldMultiCreate.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mould-history",
        name: "mould-history",
        component: () => import(/* webpackChunkName: "mould-history" */ "../views/Mould/MouldHistory.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/orderstatus",
        name: "orderstatus",
        component: () => import(/* webpackChunkName: "orderstatus" */ "../views/OrderStatus/orderStatus.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/orderstatus-detail",
        name: "orderstatus-detail",
        component: () => import(/* webpackChunkName: "orderstatus-detail" */ "../views/OrderStatus/orderstatusdetail.vue"),
        props: true,
        beforeEnter: checkLogin
    },
    {
        path: "/product-late",
        name: "product-late",
        component: () => import(/* webpackChunkName: "product-late" */ "../views/OrderStatus/productLate.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/stonefororder",
        name: "stonefororder",
        component: () => import(/* webpackChunkName: "stonefororder" */ "../views/OrderStatus/StoneforOrder.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/statusstone",
        name: "statusstone",
        component: () => import(/* webpackChunkName: "statusstone" */ "../views/Stone/statusstone.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/emp-master",
        name: "emp-master",
        component: () => import(/* webpackChunkName: "emp-master" */ "../views/Employee/EmpMaster.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/weightdiifgold",
        name: "weightdiifgold",
        component: () => import(/* webpackChunkName: "weightdiifgold" */ "../views/ReportMD/weightDiffGold.vue"),
        beforeEnter: checkLogin
    },
    //Update 20-10-2564
    {
        path: "/purchase-request",
        name: "purchase-request",
        component: () => import(/* webpackChunkName: "purchase-request" */ "../views/Purchase-Request/Purchase_Request.vue"),                                                          
        beforeEnter: checkLogin
    },
    {
        path: "/purchase-confirm",
        name: "purchase-confirm",
        component: () => import(/* webpackChunkName: "purchase-confirm" */ "../views/Purchase-Request/Purchase_Confirm.vue"), 
        beforeEnter: checkLogin
    },
    {
        path: "/purchase-master",
        name: "purchase-master",
        component: () => import(/* webpackChunkName: "purchase-master" */ "../views/Purchase-Request/Purchase-Master.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/purchase-detail",
        name: "purchase-detail",
        component: () => import(/* webpackChunkName: "purchase-detail" */ "../views/Purchase-Request/Purchase_Detail.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/purchase-edit",
        name: "purchase-edit",
        component: () => import(/* webpackChunkName: "purchase-edit" */ "../views/Purchase-Request/Purchase_Edit.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/purchase-edit-price",
        name: "purchase-edit-price",
        component: () => import(/* webpackChunkName: "purchase-edit-price" */ "../views/Purchase-Request/Purchase_Edit_Price.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mpp-status",
        name: "MPP_Status",
        component: () => import(/* webpackChunkName: "MPP_Status" */ "../views/MPP/MPP_Status.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mpp-orderStatus",
        name: "MPP_OrderStatus",
        component: () => import(/* webpackChunkName: "MPP_orderStatus" */ "../views/MPP/MPP_orderStatus.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mpp-menuPage",
        name: "MPP_MenuPage",
        component: () => import(/* webpackChunkName: "MPP_menuPage" */ "../views/MPP/MPP_MenuPage.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mpp-receivebill",
        name: "MPP_ReceiveBill",
        component: () => import(/* webpackChunkName: "MPP_receivebill" */ "../views/MPP/MPP_ReceiveBill.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mpp-billmaterails",
        name: "MPP_BillMaterails",
        component: () => import(/* webpackChunkName: "MPP_billmaterails" */ "../views/MPP/MPP_BillMaterial.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/mpp-testinsertimg",
        name: "mpp-testinsertimg",
        component: () => import(/* webpackChunkName: "MPP_Status" */ "../views/MPP/MPP_TestInsertImg.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/rules",
        name: "rules",
        component: () => import(/* webpackChunkName: "rules" */ "../views/rules.vue"),
        beforeEnter: checkLogin
    },
    {
        path: "/resetpassword",
        name: "resetpassword",
        component: () => import(/* webpackChunkName: "resetpassword" */ "../views/resetpassword.vue"),
    },
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "*",
        redirect: "login" //page not found
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;