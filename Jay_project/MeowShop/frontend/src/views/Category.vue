<template>
  <div class="container">
    <div class="cardGroup" v-for="category in getCategory" :key="category.id">
      <router-link :to="`/${category.category_name}`">
        <img :src="category.category_listimg" :alt="category.category_title">
        <h1>{{ category.category_title }}</h1>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCategory']),
  },
};
</script>
<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: space-between;
  width: 60%;
  padding: 0 20px;
  margin: 20px auto;
  .cardGroup {
    width: 28%;
    margin: 10px;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transform: scale(1);
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    h1 {
      padding: 20px;
      background-color: var(--main-color);
      color: white;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      border-radius: 0 0 20px 20px;
    }
    img {
      width: 100%;
    }
  }
}
</style>