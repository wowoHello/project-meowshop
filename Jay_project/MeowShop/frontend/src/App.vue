<template>
  <div>
    <!-- header -->
    <MeowHeader class="meow-header" />
    <!-- content -->
    <div class="router-view-container">
      <router-view />
    </div>
    <!-- footer -->
    <MeowFooter />
  </div>
</template>
<script>
import MeowHeader from "@/components/MeowHeader.vue";
import MeowFooter from "@/components/MeowFooter.vue";

export default {
  components: {
    MeowHeader,
    MeowFooter,
  },
}
</script>
<style scoped>
.meow-header {
  position: relative;
}

.router-view-container {
  position: relative;
}
</style>
