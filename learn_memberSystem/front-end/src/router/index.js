@import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 定義路由
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: () => import("../views/memberWelcome.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/registercomplete",
    name: "RegisterComplete",
    component: () => import("../views/RegisterComplete.vue")
  }
];

// 創建 VueRouter 實例
const router = new VueRouter({
  mode: "history", // 使用 HTML5 History 模式
  routes
});

export default router;
