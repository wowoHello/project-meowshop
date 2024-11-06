<template>
  <main>
    <div class="carousel">
      <vueper-slides :dragging-distance="70" prevent-y-scroll :slide-ratio="9 / 16" autoplay>
        <vueper-slide v-for="(image, i) in slides" :key="i" :image="image.src">
        </vueper-slide>
      </vueper-slides>
    </div>
    <section class="cardGroup">
      <div class=" itemTitle">
      <span class="cardTitle">貓砂盆 🐾</span>
      </div>
      <div class="item">
        <div class="card" v-for="(product, i) in getProducts" :key="i" v-if="product.category_id === 1">
          <router-link :to="`/product/${product.category_name}/${product.no}`">
            <img :src="product.image_url[0]" alt="cat01">
            <h1>{{ product.name }}</h1>
            <p>
              {{ product.description }}
            </p>
          </router-link>
        </div>
        <router-link :to="`/${getProducts[0].category_name}`">
          <div class="more">查看更多</div>
        </router-link>
      </div>
    </section>
    <section class="cardGroup">
      <div class="itemTitle">
        <span class="cardTitle">旅行外出 🐾</span>
      </div>
      <div class="item">
        <div class="card" v-for="(product, i) in getProducts" :key="i" v-if="product.category_id === 2">
          <router-link :to="`/product/${product.category_name}/${product.no}`">
            <img :src="product.image_url[0]" alt="cat01">
            <h1>{{ product.name }}</h1>
            <p>
              {{ product.description }}
            </p>
          </router-link>
        </div>
        <router-link :to="`/${getProducts[5].category_name}`">
          <div class="more">查看更多</div>
        </router-link>
      </div>
    </section>
  </main>
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Homepage",
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [
        { src: '/img/funjing01.jpg' },
        { src: '/img/funjing02.jpg' },
        { src: '/img/funjing03.jpg' },
        { src: '/img/funjing04.jpg' }
      ],
    };
  },
  mounted() {
    this.loadProducts(["catlitter", "travel"]);
  },
  computed: {
    ...mapGetters(["getProducts", "isLoading", "getError"])
  },
  methods: {
    ...mapActions(["getAllProducts"]),
    loadProducts(categories) {
      this.getAllProducts(categories);
    },
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  margin: auto;

  .carousel {
    position: relative;
    display: block;
  }

  section.cardGroup {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
    margin: auto;
    .itemTitle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 0;

      &::after,
      &::before {
        content: '';
        flex-grow: 0.2;
        height: 1px;
        background-color: var(--font-color);
      }

      &::after {
        margin-left: 2rem;
      }

      &::before {
        margin-right: 2rem;
      }

      .cardTitle {
        white-space: nowrap;
        font-size: 24px;
      }
    }

    .item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .card {
        flex: 0 1 calc(30% - 20px);
        text-align: center;
        padding: 1rem;
        margin: 0 20px 20px 0;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        transform: scale(1);
        transition: all .3s ease;
        &:hover {
          transform: scale(1.05);
        }
        a {
          text-decoration: none;
          color: var(--font-color);
        }

        h1 {
          font-size: 24px;
          padding: 1rem;
          border-top: 1px solid var(--font-color);
        }

        p {
          line-height: 1.5;
        }

        img {
          width: 100%;
        }
      }

      .card:nth-child(3n) {
        margin-right: 0;
      }
    }
    a {
      width: 100%;
      div.more {
        font-size: 24px;
        padding-bottom: 2rem;
        text-align: center;
        
      }
    }
  }
}
</style>