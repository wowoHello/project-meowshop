import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

/* 存放全局共享的狀態，類似於 Vue 組件中的 data */
const state = {
  isLoggedIn: false,
  headerLayout: 'default',
  navbarLayout: 'default', 
  user: [],
  category: [],
  products: [],
  productDetail: null,
  loading: false,
  error: null,
}

/* 負責從 state 中取得資料，類似於 Vue 組件中的 computed 屬性 */
const getters = {
  isLoggedIn: state => state.isLoggedIn,
  isLoading: state => state.loading,
  getError: state => state.error,
  getUser: state => state.user,
  getCategory: state => state.category,
  getProducts: state => state.products,
  getproductDetail: state => state.productDetail,
}

/* 負責處理異步操作（例如 AJAX 請求）並調用 mutations 更新 state，不直接改變 state，類似於 Vue 組件中的 methods */
const actions = {
  // 登入
  login({ commit }) {
    commit('SET_LOGGEDIN', true);
  },
  // 登出 API
  async logout({ commit }) {
    commit('SET_LOGGEDIN', true);
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) return;
    
    try {
      const response = await axios.post('/user/logout', { token });
      if (response.data.success) {
        console.log('登出成功');
      }
      // 清除 token 與用戶資訊
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      commit('SET_LOGGEDIN', false);
      commit('CLEAR_USER');
    } catch (err) {
      console.error('登出失敗:', err);
    }
  },
  // 進入網頁時確認有無token
  checkLoginStatus({ commit }) {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      commit('SET_LOGGEDIN', true);
    } else {
      commit('SET_LOGGEDIN', false);
    }
  },
  // 取得使用者資料
  async userInfo({ commit }) {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:3000/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log('取得使用者資料:', response.data);
      commit("SET_USER", response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("無效的 token，請重新登入");
        commit('SET_LOGGEDIN', false);
        commit('CLEAR_USER');
      } else {
        console.error("伺服器錯誤:", err);
      }
    }
  },
  // 取得分類資料
  async getCategories({ commit }) {
    commit('SET_LOADING', true);
  commit('SET_ERROR', null);
  try {
    const response = await axios.get('http://localhost:3000/categories');
    console.log('取得分類:', response.data);
    commit('SET_CATEGORY', response.data);
  } catch (err) {
    commit('SET_ERROR', '取得分類失敗');
    commit('SET_CATEGORY', []); // 確保失敗時 category 為空陣列
    console.error('取得分類失敗:', err);
  } finally {
    commit('SET_LOADING', false);
  }
  },
  // 利用動態網址取得對應分類的產品
  async getAllProducts({ commit }, categories) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    if (!categories) {
      console.error('無法讀取 category_name');
      return;
    }

    try {
      let combinedProducts = [];
      if (Array.isArray(categories)) {
        const requests = categories.map(category =>
          axios.get(`http://localhost:3000/products?category=${category}`)
        );
        const responses = await Promise.all(requests);

        combinedProducts = responses.reduce((acc, response) => acc.concat(response.data.products), []);
      } else {
        const response = await axios.get(`http://localhost:3000/products?category=${categories}`);
        combinedProducts = response.data.products;
      }

      commit('SET_PRODUCTS', combinedProducts);
    } catch (error) {
      commit('SET_ERROR', '產品詳細資料加載失敗');
      console.error('產品詳細資料加載失敗：', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  // 利用動態網址取得產品詳細資料
  async fetchProductDetail({ commit }, { category, product_no }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    if (!category || !product_no) {
      console.error('無法讀取 category_name 或 product_no');
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/product/${category}/${product_no}`
      );
      commit('SET_PRODUCT_DETAIL', response.data.products[0]);
    } catch (error) {
      commit('SET_ERROR', '產品詳細資料加載失敗');
      console.error('產品詳細資料加載失敗：', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
}

/* 負責更改 state 狀態，類似於 Vue 中的 methods，但專門用於修改 state */
const mutations = {
  SET_LOGGEDIN(state, status) {
    state.isLoggedIn = status;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_HEADERLAYOUT(state, layout) {
    state.headerLayout = layout;
  },
  SET_NAVBARLAYOUT(state, layout) {
    state.navbarLayout = layout;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_PRODUCT_DETAIL(state, product) {
    state.productDetail = product;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})