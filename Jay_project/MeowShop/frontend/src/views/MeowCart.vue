<template>
  <div class="cart-container">
    <div class="no-item" v-if="cart && cart.length === 0">
      <img src="/img/meowcart.png" alt="cartempty">
      <p>目前購物車是空的。</p>
    </div>
    <div v-else>
      <!-- 標題列 -->
      <div class="cart-header">
        <input type="checkbox" id="selectall" class="cart-checkbox">
        <span style="text-align: left;">商品</span>
        <span>單價</span>
        <span>數量</span>
        <span>總計</span>
        <span>操作</span>
      </div>
      <!-- 每個商品項目 -->
      <div class="shop-user" v-for="(products, user) in groupedCart" :key="user">
        <p><font-awesome-icon :icon="['fas', 'cat']" style="padding-right: 10px;" /> {{ user }}</p>
        <transition-group name="shrink" tag="div" class="cart-items">
          <div class="cart-item" v-for="(item, i) in products" :key="i">
            <input type="checkbox" class="cart-checkbox">
            <div class="cart-product">
              <img :src="item.img" alt="item.name" class="product-image">
              <span class="product-name">{{ item.name }}</span>
            </div>
            <span class="cart-price">NT$ {{ formatPrice(item.price) }}</span>
            <div class="cart-quantity">
              <span class="quantity-decrease" @click="clickreduce(user, i)">-</span>
              <input type="number" v-model.number="item.count" class="quantity-input" />
              <span class="quantity-increase" @click="clickadd(user, i)">+</span>
            </div>
            <span class="cart-total">NT$ {{ formatPrice(item.price * item.count) }}</span>
            <div class="cart-action">
              <font-awesome-icon :icon="['fas', 'trash-can']" style="color: var(--main-color); cursor: pointer;"
                @click="removeItem(user, i)" />
            </div>
          </div>
        </transition-group>
      </div>
      <!-- footer列 -->
      <div class="cart-coupon">
        <p @click.prevent="couponShow">輸入優惠券或選擇優惠券</p>
        <MeowCoupon v-show="coupon" @close="closeCoupon"></MeowCoupon>
      </div>
      <div class="cart-footer">
        <input type="checkbox" id="selectall" class="cart-checkbox">
        <span>全選</span>
        <span style="color: var(--price-color); font-size: 20px;">總金額： NT$ {{ formatPrice(total) }}</span>
        <router-link to="/">去付款</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import MeowCoupon from "@/components/MeowCoupon.vue";

export default {
  components: {
    MeowCoupon,
  },
  data() {
    return {
      coupon: false,
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
    groupedCart() {
      return this.cart.reduce((groups, item) => {
        if (!groups[item.user]) {
          groups[item.user] = [];
        }
        groups[item.user].push(item);
        return groups;
      }, {});
    },
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.count, 0);
    }
  },
  methods: {
    couponShow() {
      this.coupon = !this.coupon;
    },
    closeCoupon() {
      this.coupon = false;
    },
    clickadd(user, index) {
      const product = this.groupedCart[user][index];
      if (product) {
        const cartIndex = this.cart.findIndex(
          (item) => item.user === user && item.name === product.name
        );
        if (cartIndex > -1) {
          this.cart[cartIndex].count++;
        }
      }
    },
    clickreduce(user, index) {
      const product = this.groupedCart[user][index];
      if (product) {
        // 查找原始 cart 中對應的項目並更新數量
        const cartIndex = this.cart.findIndex(
          (item) => item.user === user && item.name === product.name
        );
        if (cartIndex > -1 && this.cart[cartIndex].count > 1) {
          this.cart[cartIndex].count--;
        }
      }
    },
    removeItem(user, index) {
      const userCart = this.groupedCart[user];
      if (userCart) {
        const cartIndex = this.cart.findIndex(
          (item) => item.user === user && this.groupedCart[user][index] === item
        );
        if (cartIndex > -1) {
          this.cart.splice(cartIndex, 1);
        }
      }
    },
    formatPrice(value) {
      if (typeof value !== "number") return value;
      return value.toLocaleString('en-US');
    },
  }
}
</script>
<style scope lang="scss">
input[type=checkbox] {
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid var(--font-color);
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
}

input[type=checkbox]:checked {
  background-color: var(--main-color);
}

.cart-container {
  width: 80%;
  margin: 20px auto;
  padding-bottom: 20px;
  display: grid;
  gap: 15px;
}

.no-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 20px;

  img {
    width: 200px;
  }

  p {
    font-size: 20px;
  }
}

/* 標題列設置 */
.cart-header {
  display: grid;
  width: 100%;
  grid-template-columns: 5% 40% 15% 15% 15% 10%;
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 5px solid white;
  justify-content: center;
  align-items: center;
  background: var(--navbar-color);
}

/* 單個商品項目的布局 */
.shop-user {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  p {
    padding: 10px;
    background: var(--navbar-color);
    color: var(--font-color);
    font-weight: bold;
  }
}

.cart-item {
  display: grid;
  grid-template-columns: 5% 40% 15% 15% 15% 10%;
  align-items: center;
  padding: 10px 0;
}

.cart-product {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-image {
  width: 50px;
  height: auto;
}

.product-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cart-price,
.cart-total,
.cart-action {
  text-align: center;
}

.cart-price,
.cart-total {
  color: var(--price-color);
}

.cart-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  border: 1px solid var(--font-color);
}

.quantity-decrease,
.quantity-increase {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-weight: bold;
  background: none;
  cursor: pointer;
}

.quantity-input {
  width: 60%;
  text-align: center;
  height: 24px;
  border: none;
  outline: none;
}

.cart-coupon {
  text-align: end;
  padding: 1rem;
  border-top: 5px solid white;
  border-bottom: 3px dashed white;
  color: var(--link-color);
  background: var(--navbar-color);
  p {
    cursor: pointer;
  }
}

.cart-footer {
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 5% 60% 25% 10%;
  padding: 20px 0;
  background: var(--navbar-color);

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background: var(--main-color);
    border-radius: 10px;
    color: white;
    margin: 0 10px;
  }
}

.shrink-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: scale(0);
}

.shrink-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>