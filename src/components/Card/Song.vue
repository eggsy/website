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
        this.$moment(this.date).utcOffset(3).format("DD/MM/YYYY") ===
        this.$moment(this.$getTurkeyTime()).format("DD/MM/YYYY")
      )
        return "Today's Song"
      else return this.$moment(this.date).utcOffset(3).format("DD/MM/YYYY")
    },
  },
})
</script>

<template>
  <div class="rounded-lg cursor-pointer card-base flex flex-col space-y-2">
    <div class="rounded-md flex-shrink-0">
      <SmartImage
        :src="thumbnail"
        fit="outside"
        class="rounded-md max-w-full max-h-full h-16 w-16"
        width="64"
        height="64"
      />
    </div>

    <div class="space-y-1 truncate">
      <h3 class="font-medium flex-shrink-0 leading-tight truncate">
        {{ title }}
      </h3>

      <div
        class="flex space-x-1 text-sm items-center text-black/50 dark:text-white/30"
      >
        <IconStar
          v-if="getDateText.startsWith('Today')"
          class="flex-shrink-0 h-4 w-4"
        />

        <IconCalendar class="h-4 w-4" />

        <span>
          {{ getDateText }}
        </span>
      </div>
    </div>
  </div>
</template>
