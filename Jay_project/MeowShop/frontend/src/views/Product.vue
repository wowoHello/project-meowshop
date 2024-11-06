<template>
  <div class="container">
    <div class="topcontent" v-if="getproductDetail">
      <article class="carousel">
        <vueper-slides ref="vueperslides1" :arrows="false" :touchable="false" fade :autoplay="false" :bullets="false"
        @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
        fixed-height="400px">
          <vueper-slide v-for="(image, i) in getproductDetail.image_url" :key="i" :image='image'>
          </vueper-slide>
        </vueper-slides>
        <vueper-slides class="no-shadow thumbnails" ref="vueperslides2"
          @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
          :visible-slides="getproductDetail.image_url.length" fixed-height="50px" :bullets="false" :touchable="false"
          :gap="2" :arrows="false" v-if="getproductDetail.image_url.length > 1">
          <vueper-slide v-for="(image, i) in getproductDetail.image_url" :key="i" :image="image"
            @click.native="$refs.vueperslides2.goToSlide(i)">
          </vueper-slide>
        </vueper-slides>
      </article>
      <section class="msg">
        <h1>{{ getproductDetail.name }}</h1>
        <h3>{{ getproductDetail.subname }}</h3>
        <p class="txt">
          {{ getproductDetail.description }}
        </p>
        <p class="price">NT$ {{ getproductDetail.price }}</p>
        <p>商品編號：{{ getproductDetail.no }}</p>
        <p class="stock">供貨狀況：{{ getproductDetail.stock }}</p>
        <div class="count">
          <span class="left" @click="clickreduce">－</span>
          <input type="number" v-model="count" />
          <span class="right" @click="clickadd">＋</span>
        </div>
        <div class="shop">
          <font-awesome-icon :class="isAnimating ? 'animating' : ''" @click.prevent="favoritedChange"
            :icon="isFavorited ? ['fas', 'heart'] : ['far', 'heart']" size="2xl"
            style="cursor: pointer;color: var(--err-color);" />
          <button class="btn">加入購物車</button>
        </div>
      </section>
    </div>
    <aside>
      <h2>商品介紹</h2>
      <p class="txt" v-if="getproductDetail">
        {{ getproductDetail.content }}
      </p>
    </aside>
    <section>
      <h2>相關商品</h2>
      <ul>
        <li>
          <img src="/public/img/catlife.jpg" alt="life" />
          <h3>貓貓小屋</h3>
          <p class="price">NT $ 1,000</p>
        </li>
        <li>
          <img src="/public/img/catlife.jpg" alt="life" />
          <h3>貓貓小屋</h3>
          <p class="price">NT $ 1,000</p>
        </li>
        <li>
          <img src="/public/img/catlife.jpg" alt="life" />
          <h3>貓貓小屋</h3>
          <p class="price">NT $ 1,000</p>
        </li>
        <li>
          <img src="/public/img/catlife.jpg" alt="life" />
          <h3>貓貓小屋</h3>
          <p class="price">NT $ 1,000</p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Homepage",
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      count: 0,
      isFavorited: false,
      isAnimating: false
    };
  },
  computed: {
    ...mapGetters(['getproductDetail', 'isLoading', 'getError']),
  },
  created() {
    const { category_name, product_no } = this.$route.params;
    this.fetchProductDetail({
      category: category_name,
      product_no: product_no
    });
  },
  methods: {
    ...mapActions(['fetchProductDetail']),
    favoritedChange() {
      this.isFavorited = !this.isFavorited;
      this.isAnimating = true;
      if (this.isFavorited) {
        this.isAnimating = true;
      } else {
        this.isAnimating = false;
      }
    },
    clickadd() {
      this.count++;
    },
    clickreduce() {
      if (this.count > 1) {
        this.count--;
      }
    },
  },
  watch: {
    '$route.params.product_no': {
      handler(newCategoryName) {
        this.fetchProductDetail(newCategoryName);
      },
      immediate: true
    }
  },
};

</script>
<style scoped lang="scss">
@import "@/assets/scss/product.scss";
.animating {
  animation-name: favorited;
  animation-duration: .5s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
}

.thumbnails {
  margin: 5px auto;
  max-width: 300px;
  
  .vueperslide {
    box-sizing: border-box;
    border: 1px solid #fff;
    transition: 0.3s ease-in-out;
    opacity: 0.7;
    cursor: pointer;
  }

  .vueperslide--active {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    opacity: 1;
    border-color: var(--main-color);
  }
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 使用 contain 保持圖片完整，避免被截掉 */
}

@keyframes favorited {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    rotate: (0deg);
    transform: scale(1.2);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: scale(1);
  }
}
</style>