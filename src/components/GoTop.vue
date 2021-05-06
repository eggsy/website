<template>
  <transition name="fade">
    <div
      v-if="isActive"
      class="rounded-full cursor-pointer flex bg-gray-200 p-2 ring-1 ring-gray-300 text-gray-700 items-center dark:(bg-gray-700 ring-gray-800 text-gray-300 hover:bg-gray-800) hover:bg-gray-300"
      @click="goTop"
    >
      <icon name="chevron-up" class="h-6 w-6" />
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
