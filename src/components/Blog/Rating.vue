<script lang="ts">
import Vue from "vue"

/* Interfaces */
interface Platform {
  platform?: string
  classes?: string
}

interface Status {
  component?: string
  title?: string
  classes?: string
}

export default Vue.extend({
  props: {
    rating: {
      type: [String, Number],
      required: true,
      default: "0",
    },
    max: {
      type: [String, Number],
      required: false,
      default: "10",
    },
    isnew: {
      type: Boolean,
      required: false,
      default: false,
    },
    platform: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    /**
     * Returns platform according to the prop.
     * @returns {Platform}
     */
    getPlatformInfo(): Platform {
      if (!this.platform) return {}

      const platform = this.platform.toLowerCase()
      let classes

      switch (platform) {
        case "netflix":
          classes = "text-red-600 bg-black"
          break
        case "fox":
          classes = "text-gray-100 bg-red-500"
          break
        case "apple tv+":
          classes = "text-white bg-black"
          break
        case "tnt":
          classes = "text-white bg-red-600"
          break
        case "amazon-prime":
          classes = "text-gray-100 bg-blue-500"
          break
        case "disney+":
          classes = "text-white bg-blue-900"
          break
        case "adult-swim":
          classes = "text-gray-100 bg-black"
          break
        case "bbc":
          classes = "text-gray-100 bg-black"
          break
        default:
          classes = "bg-gray-200 dark:bg-neutral-800"
          break
      }

      return {
        platform,
        classes,
      }
    },
  },
})
</script>

<template>
  <div class="flex items-center space-x-2 truncate">
    <div class="flex items-center flex-shrink-0 space-x-1">
      <!-- Channel Icon -->
      <IconChannel
        v-tippy="{
          content: platform,
          placement: 'top',
        }"
        :platform="getPlatformInfo.platform"
        class="flex-shrink-0 w-6 h-6 p-1 rounded-full focus:outline-none"
        :class="getPlatformInfo.classes"
      />

      <div
        v-tippy="{
          content: `${rating}/${max} puan`,
          placement: 'top',
        }"
        class="rounded-md cursor-default flex font-medium bg-gray-200 flex-shrink-0 text-sm p-1 text-gray-700 w-12 items-center justify-center dark:(bg-neutral-800 text-gray-200) focus:outline-none"
      >
        {{ rating }} P
      </div>
    </div>

    <div
      class="text-gray-900 truncate dark:text-gray-100"
      :class="{ new: isnew }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  @apply border-b border-black/10 transition-colors dark:(border-white/10 hover:border-white/30) hover:border-black/30;
}

.new a {
  @apply border-blue-500 border-b-2  hover:border-blue-800;
}
</style>
