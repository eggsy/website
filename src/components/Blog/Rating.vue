<template>
  <div class="flex space-x-2 items-center truncate">
    <div class="flex space-x-1 flex-shrink-0 items-center">
      <!-- Channel Icon -->
      <IconChannel
        v-tippy="{
          content: platform,
          placement: 'top',
        }"
        :platform="getPlatformInfo.platform"
        class="rounded-full flex-shrink-0 h-6 p-1 w-6 focus:outline-none"
        :class="getPlatformInfo.classes"
      />

      <!-- Status Icon -->
      <component
        :is="getStatusInfo.component"
        v-tippy="{
          content: getStatusInfo.title,
          placement: 'top',
        }"
        class="rounded-full flex-shrink-0 h-6 p-1 w-6 focus:outline-none"
        :class="getStatusInfo.classes"
      />

      <div
        v-if="seasons"
        v-tippy="{
          content: `${seasons} sezon`,
          placement: 'top',
        }"
        class="rounded-md cursor-default flex font-medium bg-gray-200 flex-shrink-0 text-sm p-1 text-gray-700 w-10 items-center justify-center focus:outline-none dark:(text-gray-200 bg-gray-800)"
      >
        {{ seasons }} S
      </div>

      <div
        v-tippy="{
          content: `${rating}/${max} puan`,
          placement: 'top',
        }"
        class="rounded-md cursor-default flex font-medium bg-gray-200 flex-shrink-0 text-sm p-1 text-gray-700 w-12 items-center justify-center focus:outline-none dark:(bg-gray-800 text-gray-200)"
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
      type: String,
      required: true,
      default: "0",
    },
    max: {
      type: String,
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
    status: {
      type: String,
      required: false,
      default: "0",
    },
    seasons: {
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
          classes = "bg-gray-200 dark:bg-gray-800"
          break
      }

      return {
        platform,
        classes,
      }
    },
    /**
     * Checks for each prop and returns an badge array.
     *
     * Note: Had to give it `any` type because of a TypeScript error I couldn't fix. Will try and see in time
     *
     * @returns {Status}
     */
    getStatusInfo(): Status {
      if (this.status !== undefined) return {}

      const statusObject = {
        0: "Devam Ediyor",
        1: "Final Yaptı",
        2: "İptal Edildi",
      }

      let icon

      switch (Number(this.status)) {
        case 1:
          icon = "Stop"
          break
        case 2:
          icon = "X"
          break
        default:
          icon = "Play"
          break
      }

      return {
        component: "Icon" + icon,
        // @ts-ignore-next-line
        title: statusObject[Number(this.status)] || statusObject[0],
        classes:
          "text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-800",
      }
    },
  },
})
</script>

<style lang="scss" scoped>
a {
  @apply dark:(border-gray-700 hover:border-gray-100) border-gray-300 hover:border-gray-900 border-b;
}

.new a {
  @apply border-blue-300 border-b-2 hover:border-blue-900;
}
</style>
