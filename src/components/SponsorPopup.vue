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
    <SmartLink
      v-if="viewed === false"
      href="https://github.com/sponsors/eggsy"
      blank
    >
      <div
        class="fixed inset-x-0 bottom-4 w-11/12 lg:w-1/4 backdrop-blur-md backdrop-filter p-4 ring-1 ring-white/10 mx-auto select-none shadow-md ring-1 dark:ring-white/20 ring-black/20 lg:mx-0 lg:left-4 dark:bg-black/50 rounded-lg space-y-2"
        @click="dismissMessage"
      >
        <h3 class="text-lg font-medium dark:text-white leading-tight">
          💖 Now you can sponsor me via GitHub Sponsors!
        </h3>

        <p class="dark:text-white/50 text-sm">
          Sponsoring me and my work just got easier with GitHub Sponsors.
          <span class="border-b dark:border-white/20">Click this box</span> to
          see the tier list! Thank you for your support ✨
        </p>
      </div>
    </SmartLink>
  </Transition>
</template>
