<template>
  <div
    class="flex items-center px-4 py-2 space-x-2 bg-gray-100 rounded-md cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800"
  >
    <SkeletonLoader
      type="image"
      :image-url="thumbnail"
      background-size="auto"
      class="flex-shrink-0 w-16 h-16 rounded-md"
    />

    <div class="truncate">
      <div class="flex items-center space-x-1">
        <icon
          v-if="getDateText.startsWith('Today')"
          name="star"
          class="flex-shrink-0 w-4 h-4 text-gray-900 dark:text-gray-100"
        />

        <span class="flex-shrink-0 text-sm text-gray-600 dark:text-gray-300">{{
          getDateText
        }}</span>
      </div>

      <h3
        class="flex-shrink-0 text-lg font-semibold leading-tight text-gray-900 truncate dark:text-gray-100"
      >
        {{ title }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
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
    getDateText() {
      if (
        this.$moment(this.date).format("DD/MM/YYYY") ===
        this.$moment().format("DD/MM/YYYY")
      )
        return "Today's Song"
      else return this.$moment(this.date).format("DD/MM/YYYY")
    },
  },
}
</script>
