<template>
  <div class="container">
    <!-- 左側導航 -->
    <nav class="sidebar">
      <ul>
        <router-link to="/sellercenter/myproducts">
          <li>我的商品</li>
        </router-link>
        <router-link to="/sellercenter/newproducts">
          <li>新增商品</li>
        </router-link>
        <router-link to="/sellercenter/ordersmanagement">
          <li>訂單管理</li>
        </router-link>
        <router-link to="/sellercenter/datacenter">
          <li>數據中心</li>
        </router-link>
        <router-link to="/sellercenter/activity">
          <li>銷售活動</li>
        </router-link>
      </ul>
    </nav>
    <!-- 右側內容 -->
    <section class="rightbar">
      {{ content }} 暫時內容
    </section>
  </div>
</template>
<script>
export default {
  name: "SellerCenter",
  data() {
    return {
      content: this.$route.path,
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/sellercenter.scss';
</style>