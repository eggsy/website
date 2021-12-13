<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    href: {
      type: String,
      required: false,
      default: null,
    },
    tight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      classes:
        "rounded-md overflow-x-hidden hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
    }
  },
})
</script>

<template>
  <component
    :is="href ? 'SmartLink' : 'div'"
    :href="href"
    :class="{
      [classes]: true,
      'p-2': tight === true,
      'p-4': tight === false,
      'items-center justify-between flex space-x-2': $slots.icon,
    }"
    v-bind="href ? $attrs : false"
  >
    <div class="line-clamp-2">
      <h2 class="font-semibold text-gray-700 truncate dark:text-neutral-100">
        {{ title }}
      </h2>

      <p v-if="$slots.default" class="text-neutral-500 line-clamp-2">
        <slot />
      </p>
    </div>

    <div v-if="$slots.icon" class="flex-shrink-0">
      <slot name="icon" class="h-8 w-8" />
    </div>
  </component>
</template>
