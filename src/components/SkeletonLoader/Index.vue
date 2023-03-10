<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String as PropType<
        "repository" | "iframe" | "song" | "block" | "spinner" | "rounded"
      >,
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
  <SkeletonLoaderRepository v-if="type === 'repository'" />

  <!-- Iframe -->
  <SkeletonLoaderIframe v-else-if="type === 'iframe'" :iframe-url="iframeUrl" />

  <!-- Song Card -->
  <SkeletonLoaderSong v-else-if="type === 'song'" />

  <!-- LastFm Card -->
  <SkeletonLoaderLastfm v-else-if="type === 'lastfm'" />

  <!-- Spinner -->
  <SkeletonLoaderSpinner v-else-if="type === 'spinner'" />

  <!-- Block -->
  <div
    v-else-if="type === 'block'"
    class="bg-black/5 rounded animate-pulse dark:bg-white/5"
  />

  <!-- Rounded -->
  <div
    v-else-if="type === 'rounded'"
    class="bg-black/5 rounded-full animate-pulse dark:bg-white/5"
  />
</template>
