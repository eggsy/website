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

<script>
export default {
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
      default: "auto",
    },
    height: {
      type: String,
      required: false,
      default: "auto",
    },
  },
  data: () => ({ error: false, loaded: false }),
  computed: {
    /**
     * Optimizes images and returns optimized image URL.
     * @returns {string}
     */
    getBackgroundUrl() {
      if (this.error === true) return "/icon.png"

      const { format, height, width, fit, src } = this
      const image = this.$img(src, { format, height, width, fit })

      return image
    },
  },
}
</script>
