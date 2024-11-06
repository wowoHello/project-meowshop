<template>
  <div class="user-block" ref="dropdown">
    <!-- 會員區塊 -->
    <div class="user" v-if="selectedTab === 'user'">
      <div v-if="!isLoggedIn" class="link">
        <router-link to="/login" class="login" @click.native="hideUserBlock">會員登入</router-link>
        <router-link to="/register" class="register" @click.native="hideUserBlock">會員註冊</router-link>
      </div>
      <div v-else class="logged-in">
        <div class="account">
          <h3 v-if="getUser">{{ getUser.username }} 您好！</h3>
          <h3 v-else>訪客 您好！</h3>
        </div>
        <p>
          <font-awesome-icon :icon="['far', 'address-card']" />
          <router-link to="/account" @click.native="hideUserBlock">我的帳戶</router-link>
        </p>
        <p>
          <font-awesome-icon :icon="['fas', 'magnifying-glass-dollar']" />
          <router-link to="/orders" @click.native="hideUserBlock">訂單查詢</router-link>
        </p>
        <p>
          <font-awesome-icon :icon="['fas', 'ticket']" />
          <router-link to="/coupons" @click.native="hideUserBlock">專屬優惠券</router-link>
        </p>
        <p>
          <font-awesome-icon :icon="['far', 'heart']" />
          <router-link to="/wishlist" @click.native="hideUserBlock">收藏清單</router-link>
        </p>
        <p>
          <font-awesome-icon :icon="['fas', 'store']" />
          <router-link to="/sellercenter" @click.native="hideUserBlock">賣家中心</router-link>
        </p>
        <p>
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          <span @click="handleLogout" replace>登出</span>
        </p>
      </div>
    </div>
    <!-- 購物車區塊 -->
    <div class="cart" v-if="selectedTab === 'cart'">
      <div class="noitem" v-if="cart.length === 0">
        <img src="./icons/cartempty.svg" alt="cartempty">
        <p>目前購物車是空的</p>
      </div>
      <div class="haveitem" v-else>
        <p>最近加入的商品</p>
        <div class="item-group" v-for="(item, i) in cart" :key="i">
          <div class="img-container">
            <img :src="item.img" :alt="item.name">
          </div>
          <span class="txt">{{ item.name }}</span>
          <span class="price">$ {{ formatPrice(item.price) }}</span>
        </div>
        <div class="btnlink">
          <router-link to="/cart" @click.native="hideUserBlock">
            <span>查看我的購物車</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 搜尋區塊 -->
    <div class="search" v-if="selectedTab === 'search'">
      <p>搜尋內容</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserBlock',
  props: ['selectedTab'],
  data() {
    return {
      toggle: '',
      cart: [
        {
          user: '天喵小舖',
          img: '/img/catlitter.png',
          name: '貓砂盆Lorem ipsum dolor sit amet',
          count: 2,
          price: 1000000,
        },
        {
          user: '天喵小舖',
          img: '/img/cattravel.jpg',
          name: '貓背包Lorem ipsum dolor sit amet',
          count: 1,
          price: 200000,
        },
        {
          user: '喵主子',
          img: '/img/cattoy.jpg',
          name: '貓草蘿蔔Lorem ipsum dolor sit amet',
          count: 5,
          price: 40000,
        },
        {
          user: '喵主子',
          img: '/img/catlife.jpg',
          name: '貓の家Lorem ipsum dolor sit amet',
          count: 1,
          price: 10000,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUser']),
  },
  mounted() {
    document.addEventListener('click', this.handleOutsideClick, true);
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick, true);
  },

  methods: {
    ...mapActions(['logout']),
    formatPrice(value) {
      if (typeof value !== "number") return value;
      return value.toLocaleString('en-US');
    },
    handleOutsideClick(event) {
      const dropdownElement = this.$refs.dropdown;

      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.$emit('closeUserBlock', this.toggle); // 通知父組件更新 v-model 的值
      }
    },
    hideUserBlock() {
      this.$emit('closeUserBlock', this.toggle); // 通知父組件更新 v-model 的值
    },
    handleLogout() {
      this.hideUserBlock();
      this.logout();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  }
}
</script>
<style scope lang="scss">
@import "@/assets/scss/userblock.scss";
@import "@/assets/scss/cartblock.scss";
@import "@/assets/scss/searchblock.scss";

a,
a:link,
a:visited {
  color: var(--font-color);
  text-decoration: none;
}

.user-block {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 3px var(--font-color);
  transform: translateY(10px);
  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    bottom: 100%;
    left: 100%;
    transform: translateX(calc(-300% - 5px));
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--font-color);
  }
}
</style>