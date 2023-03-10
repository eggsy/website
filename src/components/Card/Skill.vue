<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
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
  <div class="card-base rounded-lg flex items-center space-x-4">
    <div class="rounded-lg flex">
      <SmartImage v-if="image" :src="image" class="h-5 w-5 flex-shrink-0" />
      <component
        v-else
        :is="iconPack"
        :brand="title"
        class="flex-shrink-0 h-5 w-5"
      />
    </div>

    <span class="flex-1 truncate text-sm">
      {{ title }}
    </span>
  </div>
</template>
