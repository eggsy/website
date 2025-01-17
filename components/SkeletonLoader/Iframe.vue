<script setup lang="ts">
interface Props {
  iframeUrl?: string | boolean | null
}

const props = withDefaults(defineProps<Props>(), {
  iframeUrl: null,
})

const itemLoaded = ref(false)
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
