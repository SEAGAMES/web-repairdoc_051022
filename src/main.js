import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuemoment from 'vue-moment'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import VueMqtt from 'vue-mqtt';
// import VueHtmlToPaper from 'vue-html-to-paper';
import moment from 'moment-timezone'
import ImageUploader from 'vue-image-upload-resize'


// const options = {
//   name: '_blank',
//   specs: [
//     'fullscreen=yes',
//     'titlebar=yes',
//     'scrollbars=yes'
//   ],
//   styles: [
//     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
//     'https://unpkg.com/kidlat-css/css/kidlat.css'
//   ],
//   timeout: 1000, // default timeout before the print window appears
//   autoClose: true, // if false, the window will not close after printing
//   windowTitle: window.document.title, // override the window title
// }


Vue.use(Vuemoment, {
    moment
});
Vue.use(VueSweetalert2, ImageUploader);
Vue.use(VueMqtt, 'ws://192.168.3.7:8083/mqtt', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)})
// Vue.use(VueHtmlToPaper);

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");

