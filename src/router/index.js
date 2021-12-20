import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import RepairdocMaster from "../views/repairdoc/repiarDocMaster.vue";
import RepairdocEdit from "../views/repairdoc/repairdocEdit.vue";
import RepairdocCreate from "../views/repairdoc/repairdocCreate.vue";
import RepairdocDetail from "../views/repairdoc/repairdocDetail.vue"
import DeviceMaster from "../views/Device/deviceMaster.vue";
import DeviceDetail from "../views/Device/deviceDetail.vue";
import DeviceCreate from "../views/Device/deviceCreate.vue";
import Report from "../views/report.vue";
import MouldMaster from "../views/Mould/MouldMaster.vue";
import MouldCreate  from "../views/Mould/MouldCreate.vue";
import MouldModify from "../views/Mould/MouldModify.vue";
import MouldMultiCreate from "../views/Mould/MouldMultiCreate.vue"
import MouldDetail from "../views/Mould/MouldDetail.vue"
import MouldHistory from '../views/Mould/MouldHistory.vue'

import api from "../services/api";



Vue.use(VueRouter);

function checkLogin(to, from, next) {
    // console.log(api.isLoggedIn())
    if (api.isLoggedIn() == true) {
        next()
    } else {
        next('/login')
    }


}

const routes = [
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
        component: RepairdocMaster,
        beforeEnter: checkLogin
    },
    {
        path: "/repairdoc-edit",
        name: "repairdoc-edit",
        component: RepairdocEdit,
        beforeEnter: checkLogin
    },
    {
        path: "/repairdoc-create",
        name: "repairdoc-create",
        component: RepairdocCreate,
        beforeEnter: checkLogin
    },
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
        path: "/device-master",
        name: "device-master",
        component: DeviceMaster,
        beforeEnter: checkLogin
    },
    {
        path: "/device-detail/:id",
        name: "device-detail",
        component: DeviceDetail,
        beforeEnter: checkLogin
    },
    {
        path: "/device-create",
        name: "device-create",
        component: DeviceCreate,
        beforeEnter: checkLogin
    },
    {
        path: "/report",
        name: "report",
        component: Report,
        beforeEnter: checkLogin
    },
    {
        path: "/mould-master",
        name: "mould-master",
        component: MouldMaster,
        beforeEnter: checkLogin
    },
    {
        path: "/mould-create",
        name: "mould-create",
        component: MouldCreate,
        beforeEnter: checkLogin
    },
    {
        path: "/mould-modify",
        name: "mould-modify",
        component: MouldModify,
        beforeEnter: checkLogin
    },
    {
        path: "/mould-multicreate",
        name: "mould-multicreate",
        component: MouldMultiCreate,
        beforeEnter: checkLogin
    },
    {
        path: "/mould-history",
        name: "mould-history",
        component: MouldHistory,
        beforeEnter: checkLogin
    },
    {
        path: "/mould-detail",
        name: "mould-detail",
        component: MouldDetail,
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
        path: "/repairdoc-detail",
        name: "repairdoc-detail",
        component: RepairdocDetail,
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
        component: () => import(/* webpackChunkName: "purchase-detail" */ "../views/Purchase-Request/Purchase_Edit.vue"),
        beforeEnter: checkLogin
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