<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    color: {
      type: String,
      required: false,
      default: "#00000010",
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    iconPack: {
      type: String,
      required: false,
      default: "IconDev",
    },
  },
})
</script>

<template>
  <div
    class="dark:bg-neutral-600/10 bg-gray-100 hover:bg-gray-200/50 text-black/50 rounded-md cursor-pointer select-none transition-colors p-3 flex items-center space-x-2 overflow-hidden dark:hover:bg-neutral-600/15 text-white"
  >
    <div
      class="p-2 rounded-lg flex ring-1 ring-black/5 items-center justify-center"
      :style="{ backgroundColor: color }"
    >
      <SmartImage v-if="image" :src="image" class="h-5 w-5 flex-shrink-0" />
      <component
        v-else
        :is="iconPack"
        :brand="title"
        class="flex-shrink-0 h-5 w-5"
      />
    </div>

    <span class="flex-1 dark:text-neutral-500 truncate">{{ title }}</span>
  </div>
</template>
