<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String as PropType<"repository" | "iframe" | "song" | "block">,
      required: false,
      default: "block",
    },
    iframeUrl: {
      type: [String, Boolean],
      required: false,
      default: null,
    },
  },
  data() {
    return {
      itemLoaded: false,
    }
  },
})
</script>

<template>
  <!-- Repository Card -->
  <div
    v-if="type === 'repository'"
    class="rounded-md space-y-2 bg-gray-200 bg-opacity-40 p-4 dark:bg-neutral-800"
  >
    <div class="flex items-center justify-between">
      <div class="rounded-md bg-gray-300 h-5 animate-pulse w-7/12 dark:bg-neutral-700" />
      <div class="rounded-md bg-gray-300 h-5 animate-pulse w-2/12 dark:bg-neutral-700" />
    </div>

    <div class="rounded-md bg-gray-300 h-4 w-full dark:bg-neutral-700" />
    <div class="rounded-md bg-gray-300 h-4 w-4/12 dark:bg-neutral-700" />
  </div>

  <!-- Iframe -->
  <div
    v-else-if="type === 'iframe'"
    :class="{
      'bg-gray-100 dark:bg-neutral-800 rounded animate-pulse':
        itemLoaded === false,
    }"
  >
    <iframe
      v-if="iframeUrl"
      :class="{
        'w-full h-full rounded': true,
        invisible: itemLoaded === false,
      }"
      :src="iframeUrl"
      @load="itemLoaded = true"
    />
  </div>

  <!-- Song Card -->
  <div
    v-else-if="type === 'song'"
    class="rounded-lg cursor-pointer flex space-x-2 bg-gray-200 bg-opacity-40 py-2 px-4 transition-shadow items-center select-none dark:bg-neutral-800 hover:shadow-md"
  >
    <div class="rounded-md bg-gray-200 flex-shrink-0 h-16 animate-pulse w-16 dark:bg-neutral-700" />

    <div class="flex-grow space-y-1">
      <div class="rounded bg-gray-200 h-4 animate-pulse w-1/3 dark:bg-neutral-700" />

      <div class="rounded bg-gray-200 h-4 animate-pulse w-2/3 dark:bg-neutral-700" />
    </div>
  </div>

  <!-- Block -->
  <div v-else-if="type === 'block'" class="rounded bg-gray-100 animate-pulse dark:bg-neutral-800" />
</template>
