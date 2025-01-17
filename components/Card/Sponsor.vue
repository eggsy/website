<script setup lang="ts">
// Types
import type { Sponsor } from "~/types/Response/Sponsors"

interface Props {
  sponsor: Sponsor
  monthly?: boolean
}

withDefaults(defineProps<Props>(), {
  monthly: false,
})
</script>

<template>
  <SmartLink
    :href="`https://github.com/${sponsor.login}`"
    class="card-base rounded-lg flex flex-col gap-2"
    blank
  >
    <SmartImage
      :src="sponsor.avatarUrl"
      class="h-10 w-10 flex-shrink-0 rounded-full"
    />

    <div class="flex overflow-x-hidden flex-col leading-tight">
      <span class="truncate">{{ sponsor.login }}</span>
      <span class="text-sm text-black/30 dark:text-white/30 truncate">
        {{ monthly ? "Monthly" : "One time" }}
      </span>
    </div>
  </SmartLink>
</template>
