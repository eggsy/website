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
      class="text-gray-800 hover:underline dark:text-gray-100"
      blank
    >
      <h3 class="text-lg">{{ title }}</h3>
    </SmartLink>

    <div
      class="
        flex
        space-x-2
        divide-x-2 divide-gray-300
        text-sm text-gray-500
        items-center
        dark:(divide-gray-700
        text-gray-400)
      "
    >
      <div class="flex items-center flex-shrink-0 space-x-2">
        <IconClock class="w-4 h-4" />
        <span>{{ date }}</span>
      </div>

      <div v-if="position" class="pl-2 truncate">{{ position }}</div>
    </div>
  </div>
</template>
