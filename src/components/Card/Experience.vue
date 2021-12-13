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
  <div class="overflow-hidden">
    <SmartLink
      :href="url"
      class="text-gray-800 dark:text-neutral-200 hover:underline"
      blank
    >
      <h3 class="text-lg">{{ title }}</h3>
    </SmartLink>

    <div
      class="flex space-x-2 divide-x-2 divide-gray-300 text-sm text-gray-500 items-center dark:(divide-neutral-700 text-neutral-500) "
    >
      <div class="flex space-x-2 flex-shrink-0 items-center">
        <IconClock class="h-4 w-4" />
        <span>{{ date }}</span>
      </div>

      <div v-if="position" class="pl-2 truncate">{{ position }}</div>
    </div>
  </div>
</template>
