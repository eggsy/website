<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      viewed: true,
    }
  },
  mounted() {
    this.viewed = Boolean(localStorage.getItem("sponsor-popup-viewed")) || false
  },
  methods: {
    dismissMessage() {
      localStorage.setItem("sponsor-popup-viewed", "true")
      this.viewed = true
    },
  },
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="viewed === false"
      class="fixed inset-x-0 w-11/12 p-4 mx-auto space-y-1 rounded-lg shadow-md select-none bottom-4 lg:w-1/4 ring-1 ring-white/10 dark:ring-white/20 ring-black/20 lg:mx-0 lg:left-4 background-when-supports"
    >
      <div class="flex items-center justify-between gap-2">
        <SmartLink
          href="https://github.com/sponsors/eggsy"
          blank
          @click.native="dismissMessage"
        >
          <h3 class="font-medium leading-tight dark:text-white">
            💖 Sponsor me via GitHub Sponsors!
          </h3>
        </SmartLink>

        <button
          class="p-1 transition-colors rounded-full hover:bg-black/20 dark:hover:bg-white/20 bg-black/10 dark:bg-white/10 dark:text-white"
          @click="dismissMessage"
        >
          <IconX class="w-3 h-3" />
        </button>
      </div>

      <p class="text-sm light:opacity-50 dark:text-white/50">
        Sponsoring me and my work just got easier with GitHub Sponsors.
        <SmartLink
          href="https://github.com/sponsors/eggsy"
          blank
          class="transition-colors border-b border-black/20 hover:border-black/40 dark:hover:border-white/40 dark:border-white/20"
          @click.native="dismissMessage"
        >
          Click the title
        </SmartLink>
        to see the tier list! Thank you for your support ✨
      </p>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.background-when-supports {
  @apply backdrop-blur-md backdrop-filter dark:bg-neutral-900;
}

@supports (backdrop-filter: blur()) {
  .background-when-supports {
    @apply backdrop-blur-md backdrop-filter dark:bg-neutral-800/10;
  }
}
</style>
