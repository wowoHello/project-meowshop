<template>
  <div class="container">
    <!-- 左側導航 -->
    <nav class="sidebar">
      <h1>我的帳戶</h1>
      <ul>
        <router-link to="/account">
          <li>我的帳戶</li>
        </router-link>
        <router-link to="/updateaccount">
          <li>個人資訊</li>
        </router-link>
        <router-link to="/updatepassword">
          <li>更改密碼</li>
        </router-link>
        <router-link to="/orders">
          <li>訂單查詢</li>
        </router-link>
        <router-link to="/wishlist">
          <li>收藏清單</li>
        </router-link>
      </ul>
    </nav>
    <!-- 右側內容 -->
    <section class="main-content">
      <div class="left">
        <div class="msg" v-if="getUser.username">
          <h1>{{ getUser.username.toUpperCase() }}</h1>
          <p @click="handleLogout">登出</p>
        </div>
        <div class="msg" v-else>
          <p>訪客</p>
        </div>
        <p><router-link to="/updateaccount">查看個人資訊</router-link></p>
      </div>
      <div class="right">
        <p>總累計消費金額 NT$000,000</p>
        <p>可用紅利點數 100 點</p>
        <p>專屬優惠券 0 張</p>
        <p class="order">查詢訂單</p>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "userAccount",
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout(); // 調用 Vuex 的 logout action
      this.$router.push('/'); // 跳轉到首頁
      this.$emit("input", false);
    },
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/usermenu.scss";
// 右側內容區
.main-content {
  position: relative;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
  margin-top: 4rem;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid var(--font-color);

  .left {
    flex: 1;
    border-right: 1px solid var(--font-color);

    p {
      margin: 10px 0;
    }

    .msg {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;

      h1 {
        font-size: 26px;
        color: var(--font-color);
      }

      p {
        padding: 20px 35px;
        border-radius: 10px;
        border: 1px solid var(--main-color);
        color: var(--main-color);
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

  .right {
    flex: 2 1;
    margin: 20px;
    justify-content: flex-start;

    p {
      padding: 10px;
    }

    p.order {
      text-align: center;
      font-size: 26px;
      width: 8rem;
      padding: 20px 25px;
      background-color: var(--main-color);
      border-radius: 10px;
      margin-top: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>