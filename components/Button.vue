<script setup lang="ts">
interface Props {
  href?: any
  icon?: string | null
  block?: boolean
  rounded?: boolean
  blank?: boolean
  disabled?: boolean
  backdrop?: boolean
}

defineProps<Props>()
</script>

<template>
  <SmartLink
    :href="!disabled && href"
    :blank="blank"
    :class="[
      'cursor-pointer justify-center px-5 py-2 card-base flex items-center space-x-2',
      rounded ? 'rounded-full' : 'rounded-lg',
      backdrop && 'backdrop-blur-lg',
      !block && 'w-max',
    ]"
  >
    <Icon :name="icon" v-if="icon && !$slots.icon" class="h-4 w-4" />
    <slot v-else name="icon" />
    <span v-if="$slots.default">
      <slot />
    </span>
  </SmartLink>
</template>
