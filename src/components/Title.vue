<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    size: {
      type: String as PropType<"1" | "2" | "3" | "4" | "5">,
      required: false,
      default: "3",
    },
    uppercase: {
      type: Boolean,
      required: false,
      default: true,
    },
    bold: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <component
    :is="`h${size}`"
    class="text-lg text-gray-400 dark:text-neutral-700"
    :class="{
      'text-2xl': size === '1',
      'text-xl': size === '2',
      'text-lg': !['1', '2'].includes(size),
      'font-bold': bold === true,
      'font-medium': bold === false,
      uppercase: uppercase === true,
    }"
  >
    <slot></slot>
  </component>
</template>
