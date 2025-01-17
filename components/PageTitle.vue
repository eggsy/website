<script setup lang="ts">
interface Props {
  size?: "1" | "2" | "3" | "4" | "5" | "sm" | "xs"
  uppercase?: boolean
  bold?: boolean
}

withDefaults(defineProps<Props>(), {
  size: "3",
  uppercase: true,
  bold: false,
})
</script>

<template>
  <component
    :is="!['sm', 'xs'].includes(size) ? `h${size}` : 'h3'"
    class="text-sm text-black/70 dark:text-white/50"
    :class="{
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
