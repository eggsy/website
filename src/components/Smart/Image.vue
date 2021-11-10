<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    alt: {
      type: String,
      required: false,
      default: null,
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
      if (this.error === true || !this.src) return "/icon.png"

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
  methods: {
    handleError() {
      this.error = true;
      this.loaded = true;
    }
  }
})
</script>

<template>
  <div
    v-if="src"
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
    :smart-image="true"
    :title="title"
  >
    <img
      :src="getBackgroundUrl || src"
      :alt="alt || title || 'image'"
      :width="width"
      :height="height"
      class="invisible"
      loading="lazy"
      @error="handleError"
      @load="loaded = true"
    />
  </div>
</template>
