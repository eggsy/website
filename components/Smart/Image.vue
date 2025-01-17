<script setup lang="ts">
import { ref, computed } from "vue"

interface Props {
  src?: string | null
  title?: string | null
  alt?: string | null
  format?: string
  fit?: string
  width?: string | null
  height?: string | null
  caption?: string | null
  optimize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: null,
  title: null,
  alt: null,
  format: "webp",
  fit: "cover",
  width: null,
  height: null,
  caption: null,
  optimize: true,
})

const error = ref(false)
const loaded = ref(true)

/**
 * Optimizes images and returns optimized image URL.
 */
const getBackgroundUrl = computed((): string => {
  if (error.value === true || !props.src) return "/icon.png"
  else if (props.optimize === false) return props.src

  return getProxifiedImageUrl(props.src)
})

const getProxifiedImageUrl = (url: string): string => {
  if (url.includes("i.imgur.com"))
    return `https://proxy.duckduckgo.com/iu/?u=${encodeURIComponent(url)}`
  else return url
}

const handleError = () => {
  if (props.optimize === false) return

  error.value = true
  loaded.value = true
}
</script>

<template>
  <div
    v-if="src"
    :style="
      loaded === true
        ? {
            backgroundImage: `url('${getBackgroundUrl}')`,
            backgroundPosition: 'center',
            backgroundSize: fit,
          }
        : {}
    "
    :class="{
      'bg-gray-100 animate-pulse dark:bg-neutral-700 bg-no-repeat':
        loaded === false,
      'relative caption': caption,
    }"
    :smart-image="true"
    :title="title || caption"
    :failed-image-url="error && src"
  >
    <img
      :src="getBackgroundUrl"
      :alt="alt || caption || title || 'image'"
      :width="width"
      :height="height"
      class="invisible"
      loading="lazy"
      @error="handleError"
      @load="loaded = true"
    />

    <span
      v-if="caption"
      class="mx-8 text-center text-sm inset-x-0 -bottom-7 text-neutral-400 truncate absolute"
    >
      {{ caption }}
    </span>
  </div>
</template>
