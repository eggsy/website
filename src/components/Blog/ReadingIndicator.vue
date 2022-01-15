<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    selector: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      el: null as Element | null,
      scrollY: 0,
      rect: {
        top: 0,
        bottom: 0,
      },
      window: {
        height: 0,
        width: 0,
      },
    }
  },
  computed: {
    /**
     * Calculates the position of the element and returns percentage value.
     */
    getPercentLeftBottom(): number {
      const { top, bottom } = this.rect
      const percent = Math.round(
        ((top - this.window.height) / (top - bottom)) * 100
      )

      return percent > 100 ? 100 : percent
    },
    /**
     * Checks if the position is higher than a specific number and returns a boolean value.
     */
    isElementVisible(): boolean {
      return this.scrollY > 175
    },
  },
  mounted() {
    // Find element in the document and set if exists
    const element = document.querySelector(this.selector)
    if (element) this.el = element
    else return

    // Set window dimensions
    const { innerHeight, innerWidth } = window
    this.window = { height: innerHeight, width: innerWidth }

    // Add scroll event to update positions
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeDestroy() {
    // Remove scroll event before changing the page
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      // Set currenc scroll position
      this.scrollY = window.scrollY

      // Set window height and width
      const { innerHeight, innerWidth } = window
      this.window = { height: innerHeight, width: innerWidth }

      // Get element's position
      const { top, bottom } = this.el?.getBoundingClientRect() || {}

      // Save element's position to Vue data
      if (!top || !bottom) return
      this.rect = { top, bottom }
    },
  },
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="isElementVisible"
      v-tippy="{
        content:
          getPercentLeftBottom === 100 ? 'Tüm yazı okundu!' : 'Okuma oranı',
      }"
    >
      <div
        class="rounded-md bg-gray-200 h-40 w-4 hidden relative md:block dark:bg-neutral-800"
      >
        <div
          class="rounded-md inset-x-0 transition bottom-0 absolute"
          :class="{
            'bg-green-500': getPercentLeftBottom === 100,
            'bg-gray-300 dark:bg-neutral-600': getPercentLeftBottom < 100,
          }"
          :style="{ height: `${getPercentLeftBottom}%` }"
        />
      </div>
    </div>
  </transition>
</template>
