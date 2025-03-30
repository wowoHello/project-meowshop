<template>
  <div class="container">
    <div class="title" v-if="categoryData">
      <img  :src=" categoryData.category_titleimg" alt="catlitterTitle">
      <h1>{{  categoryData.category_title }}</h1>
    </div>
    <div class="content" v-if="getProducts.length">
      <div class="cardGroup" v-for="product in getProducts" :key="product.id">
        <router-link :to="`/product/${product.category_name}/${product.no}`">
          <img :src="product.image_url[0]" alt="Product Image" />
          <h1>{{ product.name }}</h1>
          <p>NT${{ product.price }}</p>
        </router-link>
      </div>
    </div>
    <p class="noItem" v-else>暫無產品資料</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCategory', 'getProducts', 'isLoading', 'getError']),
    categoryData() {
      const categoryName = this.$route.params.category_name;
      return this.getCategory.find(item => item.category_name === categoryName);
    },
  },
  methods: {
    ...mapActions(['getAllProducts']),
  },
  watch: {
    '$route.params.category_name': {
      handler(newCategoryName) {
        this.getAllProducts(newCategoryName);
      },
      immediate: true
    }
  },
};
</script>
<style scoped lang="scss">
.container {
  position: relative;

  .title {
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      opacity: .4;
    }

    h1 {
      position: absolute;
      width: 100%;
      margin: auto;
    }
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 60%;
    padding: 0 20px;
    margin: 20px auto;
    gap: 20px;

    .cardGroup {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 0 1 calc(33.333% - 20px);
      border-radius: 20px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      transform: scale(1);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }

      a {
        img {
          width: 100%;
          border-radius: 20px 20px 0 0;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 26px;
        }

        p {
          color: var(--price-color);
          margin-bottom: 20px;
          text-align: center;
        }
      }
    }
  }

  p.noItem {
    margin: 2rem auto;
    text-align: center;
  }
}
</style>