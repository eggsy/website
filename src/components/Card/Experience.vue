<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
    date: {
      type: String,
      required: false,
      default: "2020",
    },
    position: {
      type: String,
      required: false,
      default: null,
    },
  },
})
</script>

<template>
  <div class="text-gray-500 overflow-hidden dark:text-neutral-700">
    <div class="flex space-x-2 items-center justify-between">
      <SmartLink
        :href="url"
        class="text-gray-800 dark:text-neutral-200 hover:underline"
        blank
      >
        <h3 class="text-lg">{{ title }}</h3>
      </SmartLink>

      <span>{{ date }}</span>
    </div>

    <div v-if="position" class="truncate">{{ position }}</div>
  </div>
</template>
