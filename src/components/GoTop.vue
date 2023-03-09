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
  beforeDestroy() {
    window.removeEventListener("scroll", this.updatePosition)
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
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="isActive"
      class="right-6 bottom-4 z-50 fixed items-center md:flex md:space-x-2"
    >
      <Button rounded elevated @click.native="goTop">
        <template #icon>
          <IconChevron up class="h-4 w-4" />
        </template>
      </Button>

      <ColorSwitcher class="hidden md:block" />
    </div>
  </transition>
</template>
