import './asset/resetCSS.css';
import './asset/all.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './router'; 

// Vue2 需要關閉開發模式提示訊息
Vue.config.productionTip = false;

new Vue({
  router,  // 註冊路由器
  el: '#app',
  render: h => h(App),  // 渲染根組件
})



