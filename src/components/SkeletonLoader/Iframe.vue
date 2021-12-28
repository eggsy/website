<script>
export default {
  props: {
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
}
</script>

<template>
  <div
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
</template>
