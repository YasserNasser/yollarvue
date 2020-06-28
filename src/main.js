import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from "moment";
//import Vue from 'vue';
import VueToast from "vue-toast-notification";
// Import one of available themes
import "vue-toast-notification/dist/theme-default.css";
//import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);
Vue.prototype.$axios = axios;
window.Event = new Vue();
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.use(CKEditor);
//let token = localStorage.getItem('token');
// if(localStorage.getItem('token')){
//   let token = localStorage.getItem('token');
//   Vue.prototype.$token = token;
// }else{
//   Vue.prototype.$token = null;
// }

//this.$axios.defaults.baseUrl = 'http://localhost:8080';

//window.axios.defaults.params= {api_token:token}

let baseUrl = "http://localhost:8080";
Vue.prototype.$baseUrl = baseUrl;

Vue.config.productionTip = false;
Vue.use(vuetify);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
