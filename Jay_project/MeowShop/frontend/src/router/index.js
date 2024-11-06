import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';

/* 頁面路由 */
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Account from "../views/Account.vue";
import Category from "@/views/Category.vue";
import ProductList from "@/views/ProductList.vue";
import MeowCart from "@/views/MeowCart.vue";
// import CategoryView from "@/components/MeowCategory.vue";
import Product from "@/views/Product.vue";
import UpdateAccount from "@/views/UpdateAccount.vue";
import UpdatePassword from "@/views/UpdatePassword.vue";
import SellerCenter from "@/views/SellerCenter.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: MeowCart,
    },
    {
      path: "/account",
      name: "account",
      component: Account,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/product",
      name: "product",
      component: Product,
    },
    {
      path: "/updateaccount",
      name: "updateaccount",
      component: UpdateAccount,
    },
    {
      path: "/updatepassword",
      name: "updatepassword",
      component: UpdatePassword,
    },
    // -----賣家中心-----
    {
      path: "/sellercenter",
      name: "sellercenter",
      component: SellerCenter,
    },
    {
      path: "/sellercenter/myproducts",
      component: () => import("@/views/SmyProducts.vue"),
    },
    {
      path: "/sellercenter/newproducts",
      component: () => import("@/views/SnewProducts.vue"),
    },
    {
      path: "/sellercenter/ordersmanagement",
      component: () => import("@/views/SmyOrdersManagement.vue"),
    },
    {
      path: "/sellercenter/datacenter",
      component: () => import("@/views/SmyDataCenter.vue"),
    },
    {
      path: "/sellercenter/activity",
      component: () => import("@/views/SmyActivity.vue"),
    },
    {
      path: "/category",
      name: "category",
      component: Category,
    },
    {
      path: "/:category_name",
      name: "categoryProducts",
      component: ProductList,
    },
    {
      path: "/product/:category_name/:product_no",
      name: "productDetail",
      component: Product,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/sellercenter')) {
    await store.commit('SET_HEADERLAYOUT', 'sellercenter');
    await store.commit('SET_NAVBARLAYOUT', 'sellercenter');
  } else {
    await store.commit('SET_HEADERLAYOUT', 'default');
    await store.commit('SET_NAVBARLAYOUT', 'default');
  }
  next();
});

export default router;
