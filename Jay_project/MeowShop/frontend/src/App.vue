<template>
  <div id="app">
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
html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.meow-header {
  position: relative;
}

.router-view-container {
  position: relative;
  flex: 1;
}
</style>
