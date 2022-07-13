<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
    date: {
      type: String,
      required: false,
      default: "2020",
    },
    position: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      hasBackground: false,
    }
  },
  methods: {
    toggleBackground() {
      this.hasBackground = true

      setTimeout(() => {
        this.hasBackground = false
      }, 500)
    },
  },
})
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
    duration="125"
    @enter="toggleBackground"
  >
    <div
      class="px-4 text-gray-500 cursor-default hover:bg-gray-200 dark:hover:bg-neutral-800/40 rounded-lg transition-colors overflow-hidden dark:text-neutral-600"
      :class="{
        'bg-gray-200 dark:bg-neutral-800/40': hasBackground,
      }"
    >
      <div class="flex space-x-2 items-center justify-between">
        <SmartLink
          :href="url"
          class="text-gray-800 dark:text-neutral-200 hover:underline"
          blank
        >
          <h3 class="text-lg">{{ title }}</h3>
        </SmartLink>

        <span>{{ date }}</span>
      </div>

      <div v-if="position" class="truncate">{{ position }}</div>
    </div>
  </Transition>
</template>
