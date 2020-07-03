<template>
  <div class="loader-container" v-if="loading">
    <Spinner :animation-duration="1250" :size="66" color="#ff1d5e" />
  </div>
</template>

<script>
import Spinner from "../node_modules/epic-spinners/src/components/lib/FulfillingBouncingCircleSpinner.vue";

export default {
  components: {
    Spinner
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  z-index: 999;
  background: hsl(0, 0%, 12.9%);
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>