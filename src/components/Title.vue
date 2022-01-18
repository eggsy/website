<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    padding: {
      type: Boolean,
      required: false,
      default: true,
    },
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
    :is="!['sm', 'xs'].includes(size) ? `h${size}` : 'h3'"
    class="text-lg text-gray-400 dark:text-neutral-700"
    :class="{
      'px-4': padding === true,
      'text-2xl': size === '1',
      'text-xl': size === '2',
      'text-sm': size === 'sm',
      'text-xs': size === 'xs',
      'text-lg': !['1', '2', 'sm', 'xs'].includes(size),
      'font-bold': bold === true,
      'font-medium': bold === false,
      uppercase: uppercase === true,
    }"
  >
    <slot></slot>
  </component>
</template>
