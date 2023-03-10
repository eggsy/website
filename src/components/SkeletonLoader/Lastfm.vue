<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  computed: {
    getRandomItem(): string {
      return ["w-2/3", "w-3/4", "w-2/5"][Math.floor(Math.random() * 3)]
    },
  },
})
</script>

<template>
  <div class="rounded-md card-base flex space-x-4 w-full items-center">
    <SkeletonLoader class="rounded-md flex-shrink-0 h-16 w-16" />

    <div class="flex flex-col space-y-2 w-full">
      <SkeletonLoader class="h-5" :class="getRandomItem" />
      <SkeletonLoader class="h-5 w-1/3" />
    </div>
  </div>
</template>
