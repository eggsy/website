<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    date: {
      type: [String, Date],
      required: true,
      default: null,
    },
    thumbnail: {
      type: String,
      required: true,
      default: null,
    },
  },
  computed: {
    /**
     * Compares the dates between the provided date and current date and returns a title which will be used in cards' title.
     * @returns {string} The title "Today's Song" or formatted date.
     */
    getDateText(): string {
      if (
        this.$moment(this.date).format("DD/MM/YYYY") ===
        this.$moment_tz().tz("Europe/Istanbul").format("DD/MM/YYYY")
      )
        return "Today's Song"
      else return this.$moment(this.date).format("DD/MM/YYYY")
    },
  },
})
</script>

<template>
  <div
    class="rounded-lg cursor-pointer flex space-x-2 py-2 px-4 transition-colors items-center select-none hover:bg-gray-200/40 dark:hover:bg-neutral-800/40"
  >
    <div class="rounded-md flex-shrink-0">
      <SmartImage
        :src="thumbnail"
        fit="outside"
        class="rounded-md max-w-full max-h-full h-16 w-16"
        width="64"
        height="64"
      />
    </div>

    <div class="truncate">
      <div class="flex space-x-1 items-center">
        <IconStar
          v-if="getDateText.startsWith('Today')"
          class="flex-shrink-0 h-4 text-gray-900 w-4 dark:text-gray-100"
        />

        <span class="flex-shrink-0 text-sm text-gray-600 dark:text-gray-300">{{ getDateText }}</span>
      </div>

      <h3
        class="font-semibold flex-shrink-0 text-lg leading-tight text-gray-900 truncate dark:text-gray-100"
      >{{ title }}</h3>
    </div>
  </div>
</template>
