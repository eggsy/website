<template>
  <div
    :style="
      loaded === true && {
        backgroundImage: `url('${getBackgroundUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: fit,
      }
    "
    :class="{
      'bg-gray-100 animate-pulse dark:bg-gray-700 bg-no-repeat':
        loaded === false,
    }"
  >
    <img
      :src="getBackgroundUrl || src"
      :alt="alt"
      :width="width"
      :height="height"
      class="invisible"
      @error="
        error = true
        loaded = true
      "
      @load="loaded = true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
      default: null,
    },
    alt: {
      type: String,
      required: false,
      default: "image",
    },
    format: {
      type: String,
      required: false,
      default: "webp",
    },
    fit: {
      type: String,
      required: false,
      default: "cover",
    },
    width: {
      type: String,
      required: false,
      default: null,
    },
    height: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      error: false,
      loaded: false,
    }
  },
  computed: {
    /**
     * Optimizes images and returns optimized image URL.
     * @returns {string}
     */
    getBackgroundUrl(): string {
      if (this.error === true) return "/icon.png"

      const { format, height, width, fit, src } = this

      const options: {
        format?: string
        fit?: string
        height?: number
        width?: number
      } = {}

      if (format) options.format = format
      if (fit) options.fit = fit
      if (height) options.height = parseInt(height)
      if (width) options.width = parseInt(width)

      /* Return src directly when on SSR to prevent errors */
      if (process.server) return src
      else return this.$img(src, options)
    },
  },
})
</script>
