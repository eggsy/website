<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: false,
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    nowPlaying: {
      type: Boolean,
      required: false,
      default: false,
    },
    plays: {
      type: Number,
      required: false,
      default: null,
    },
  },
})
</script>

<template>
  <SmartLink
    :href="url"
    :title="name"
    class="rounded-md flex space-x-4 p-4 transition-colors focus-ring overflow-x-hidden items-center hover:bg-gray-100 dark:hover:bg-neutral-800"
    :class="{
      'justify-between': plays !== null,
    }"
    blank
  >
    <div class="flex space-x-4 truncate items-center">
      <div class="flex-shrink-0 h-16 w-16 relative">
        <SmartImage :src="image" class="rounded-md" />

        <div
          v-if="nowPlaying"
          title="Playing now..."
          class="rounded-md flex bg-black/75 inset-0 items-center justify-center absolute"
        >
          <IconPlay class="h-6 text-neutral-300 w-6" />
        </div>
      </div>

      <div class="flex flex-col truncate">
        <span class="text-neutral-700 truncate dark:text-neutral-400">{{
          name
        }}</span>
        <span v-if="artist" class="text-xs truncate">by {{ artist }}</span>
      </div>
    </div>

    <div
      v-if="plays"
      class="rounded-full font-semibold flex-shrink-0 text-sm p-2"
    >
      {{ plays }} plays
    </div>
  </SmartLink>
</template>
