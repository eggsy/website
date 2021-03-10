<template>
  <div class="flex items-center space-x-2 truncate">
    <div class="flex items-center flex-shrink-0 space-x-1">
      <icon
        v-for="(badge, index) in getBadges"
        :key="`badge-${index}`"
        v-tippy="{
          content: badge.title,
          placement: 'top',
        }"
        :name="badge.icon"
        :class="{
          'w-6 h-6 p-1 flex-shrink-0 rounded-full focus:outline-none': true,
          [badge.color]: true,
          [badge.background]: true,
        }"
      />

      <div
        v-if="seasons"
        v-tippy="{
          content: `${seasons} sezon`,
          placement: 'top',
        }"
        class="flex items-center justify-center flex-shrink-0 w-10 p-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md cursor-default dark:text-gray-200 focus:outline-none dark:bg-gray-800"
      >
        {{ seasons }} S
      </div>

      <div
        v-tippy="{
          content: `${rating}/${max} puan`,
          placement: 'top',
        }"
        class="flex items-center justify-center flex-shrink-0 w-12 p-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md cursor-default dark:bg-gray-800 dark:text-gray-200 focus:outline-none"
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

<script>
export default {
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
     * Checks for each prop and returns an badge array.
     * @returns {Array<{icon: string, title: string, color: string, background: string}>}
     */
    getBadges() {
      const array = []

      if (this.platform) {
        const title = this.platform

        let icon = this.platform.toLowerCase().split(" ").join("-")
        let color, background

        if (icon.includes("apple")) icon = "apple"

        switch (icon) {
          case "netflix":
            color = "text-red-600"
            background = "bg-black"
            break
          case "fox":
            color = "text-gray-100"
            background = "bg-red-500"
            break
          case "apple":
            color = "text-white"
            background = "bg-black"
            break
          case "tnt":
            color = "text-white"
            background = "bg-red-600"
            break
          case "amazon-prime":
            color = "text-gray-100"
            background = "bg-blue-500"
            break
          case "disney+":
            color = "text-white"
            background = "bg-blue-900"
            break
          case "adult-swim":
            color = "text-gray-100"
            background = "bg-black"
            break
          case "bbc":
            color = "text-gray-100"
            background = "bg-black"
            break
          default:
            background = "bg-gray-200 dark:bg-gray-800"
            break
        }

        array.push({
          icon,
          title,
          color,
          background,
        })
      }

      if (this.status !== undefined) {
        const statusObject = {
          0: "Devam Ediyor",
          1: "Final Yaptı",
          2: "İptal Edildi",
        }

        let icon

        switch (Number(this.status)) {
          case 1:
            icon = "stop"
            break
          case 2:
            icon = "x"
            break
          default:
            icon = "play-solid"
            break
        }

        array.push({
          icon,
          title: statusObject[Number(this.status)] || statusObject[0],
          background: "bg-gray-200 dark:bg-gray-800",
          color: "text-gray-700 dark:text-gray-200",
        })
      }

      return array
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply dark:border-gray-700 dark:hover:border-gray-100 border-gray-300 hover:border-gray-900 border-b;
}

.new a {
  @apply border-blue-300 border-b-2 hover:border-blue-900;
}
</style>
