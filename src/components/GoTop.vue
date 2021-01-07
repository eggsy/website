<template>
  <transition name="fade">
    <div
      v-if="isActive"
      class="flex items-center p-2 text-gray-700 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-gray-800"
      @click="goTop"
    >
      <icon name="chevron-up" class="w-6 h-6" />
    </div>
  </transition>
</template>

<script>
export default {
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
    isActive() {
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
  beforeDestory() {
    window.removeEventListener("scroll", this.updatePosition)
  },
}
</script>
