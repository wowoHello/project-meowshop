import "@/assets/resetCSS.css"
import "@/assets/fonts/fonts.css"
import "@/assets/scss/global.scss"
import 'vueperslides/dist/vueperslides.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from "axios";
import Swal from 'sweetalert2';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; 

// FontAwesomeIcon 相關與圖標
Vue.component('font-awesome-icon', FontAwesomeIcon);
import { faAddressCard, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faEye, faEyeSlash, faMagnifyingGlassDollar, faTicket, faStore, faRightFromBracket, faPaw, faHeart as faHeartSolid, faTrashCan, faCat } from '@fortawesome/free-solid-svg-icons';
const regularIcon = [faAddressCard, faHeartRegular];
const boldIcons = [faEye, faEyeSlash, faMagnifyingGlassDollar, faTicket, faStore, faRightFromBracket, faPaw, faHeartSolid, faTrashCan, faCat];
library.add(...regularIcon, ...boldIcons);

// 設定 axios 的全域配置
const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
axios.defaults.baseURL = 'http://localhost:3000';  // 基本 API URL
axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;  // 自動附帶 Token

// 將 axios 掛載到 Vue 原型，這樣在每個組件中都可以使用 this.$axios
Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;
Vue.prototype.$swal = Swal;

Vue.config.productionTip = false;

store.dispatch('checkLoginStatus').then(() => {
  if (store.getters.isLoggedIn) {
    store.dispatch('userInfo');
  }
  store.dispatch('getCategories');
}).finally(() => {
  // 在初始化完成後創建 Vue 實例
  new Vue({
    store,
    router,
    el: "#app",
    render: (h) => h(App)
  });
});