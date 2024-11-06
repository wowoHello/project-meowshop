<template>
  <div class="container">
    <!-- 左側導航 -->
    <nav class="sidebar">
      <ul>
        <li v-for="category in categories" :key="category.id">
          <router-link :to="`/category/${category.categoryname}`"><p>{{ category.name }}</p></router-link>
        </li>
      </ul>
    </nav>
    <!-- 右側內容 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Products",
  data() {
    return {
      categories: [
        { id: 1, categoryname: 'litterbox', name: '貓砂盆' },
        { id: 2, categoryname: 'travel', name: '旅行外出' },
        { id: 3, categoryname: 'life', name: '喵生活' },
        { id: 4, categoryname: 'toys', name: '喵玩具' },
        { id: 5, categoryname: 'all', name: '全館商品' }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/category.scss";
</style>