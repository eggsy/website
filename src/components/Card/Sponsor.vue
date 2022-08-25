<script lang="ts">
import Vue from "vue"

// Types
import type { Sponsor } from "~/src/types/Response/Sponsors"

export default Vue.extend({
  props: {
    sponsor: {
      type: Object as () => Sponsor,
      required: true,
    },
    monthly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <SmartLink
    :href="`https://github.com/${sponsor.login}`"
    class="flex space-x-3 px-4 py-1.5 rounded-md transition-colors hover:bg-gray-200/40 dark:hover:bg-neutral-800/40 select-none items-center"
    blank
  >
    <SmartImage
      :src="sponsor.avatarUrl"
      class="h-10 w-10 flex-shrink-0 rounded-full"
    />

    <div class="flex overflow-x-hidden flex-col leading-tight">
      <span class="truncate">{{ sponsor.login }}</span>
      <span class="text-sm opacity-50 truncate">
        {{ monthly ? "Monthly" : "One time" }}
      </span>
    </div>
  </SmartLink>
</template>
