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
      default: new Date().getFullYear(),
    },
    position: {
      type: String,
      required: false,
      default: null,
    },
    hiddenBadge: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <SmartLink :href="url" blank>
    <div class="card-base leading-relaxed rounded-lg">
      <div class="flex space-x-2 items-center justify-between">
        <h3>{{ title }}</h3>

        <span class="text-black/50 dark:text-white/30 text-sm">{{ date }}</span>
      </div>

      <div
        v-if="position"
        class="truncate text-sm text-black/50 dark:text-white/30"
        :class="hiddenBadge && 'flex items-center justify-between'"
      >
        {{ position }}
        <IconPlus v-if="hiddenBadge" class="h-4 w-4" />
      </div>
    </div>
  </SmartLink>
</template>
