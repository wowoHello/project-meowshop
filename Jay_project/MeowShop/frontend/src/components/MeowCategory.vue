<template>
  <section class="main-content">
    <div class="title">
      <h1>{{ dynamicTitle }}</h1>
    </div>
    <div v-for="product in filteredProducts" :key="product.id" class="product">
      <img :src="product.image" :alt="product.name">
      <p class="product-name">{{ product.name }}</p>
      <p class="product-price">NT${{ product.price }}</p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      products: [
        { id: 1, categoryId: ['litterbox', 'all'], name: '自動貓砂盆', price: '3,000', image: '/public/img/catlitter.png' },
        { id: 2, categoryId: ['travel', 'all'], name: '寵物外出包', price: '2,000', image: '/public/img/cattravel.jpg' },
        { id: 3, categoryId: ['life', 'all'], name: '貓爪磨爪器', price: '800', image: '/public/img/catlife.jpg' },
        { id: 4, categoryId: ['toys', 'all'], name: '貓玩具球', price: '300', image: '/public/img/cattoy.jpg' },
      ],
      categoryTitles: {
        'litterbox': '貓砂盆',
        'travel': '旅行外出',
        'life': '喵生活',
        'toys': '喵玩具',
        'all': '全館商品'
      }
    };
  },
  
  computed: {
    filteredProducts() {
      const categoryName = this.$route.params.categoryname;
      return this.products.filter(product => product.categoryId.includes(categoryName));
    },
    dynamicTitle() {
      const categoryName = this.$route.params.categoryname;
      return this.categoryTitles[categoryName] || '商品列表'; 
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/category.scss";
</style>