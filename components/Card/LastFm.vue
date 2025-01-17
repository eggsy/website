<script setup lang="ts">
interface Props {
  name: string
  artist?: string | null
  url: string
  image?: string
  nowPlaying?: boolean
  plays?: number | string | null
}

withDefaults(defineProps<Props>(), {
  artist: null,
  nowPlaying: false,
  plays: null,
})
</script>

<template>
  <SmartLink
    :href="url"
    :title="name"
    class="rounded-lg flex items-center gap-4 card-base"
    :class="{
      'justify-between': plays !== null,
    }"
    blank
  >
    <div class="flex space-x-4 truncate items-center">
      <div v-if="image" class="flex-shrink-0 h-14 w-14 relative">
        <SmartImage :src="image" class="rounded-md" />

        <div
          v-if="nowPlaying"
          title="Playing now..."
          class="rounded-md flex bg-black/75 inset-0 items-center justify-center absolute"
        >
          <Icon
            name="svg-spinners:bars-scale-middle"
            class="h-6 text-neutral-300"
          />
        </div>
      </div>

      <div class="flex flex-col truncate">
        <span class="truncate">
          {{ name }}
        </span>

        <span
          v-if="artist"
          class="text-sm text-black/50 dark:text-white/30 truncate"
          >by {{ artist }}</span
        >
      </div>
    </div>

    <div
      v-if="plays"
      class="rounded-md text-blue-600 bg-blue-600/10 ring-[0.5px] ring-blue-600/40 px-4 py-1 flex-shrink-0 text-xs"
    >
      {{ plays }} plays
    </div>
  </SmartLink>
</template>
