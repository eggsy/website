<template>
  <transition name="fade">
    <div
      v-show="isActive"
      class="rounded-full cursor-pointer flex bg-gray-200 p-2 text-gray-500 items-center hover:shadow-md dark:bg-gray-800"
      @click="goTop"
    >
      <IconChevron up class="h-6 w-6" />
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      position: 0,
    }
  },
  computed: {
    /**
     * Checks if the position is higher than a specific number and returns a boolean value.
     * @returns {boolean} Higher than the given number.
     */
    isActive(): boolean {
      return this.position > 100
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updatePosition)
  },
  methods: {
    /**
     * Updates the Vue data when it's called.
     */
    updatePosition() {
      this.position = window.scrollY
    },
    /**
     * Scrolls window to top.
     */
    goTop() {
      window.scrollTo(0, 0)
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updatePosition)
  },
})
</script>
