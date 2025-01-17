<script setup lang="ts">
import { SmartLink } from "#components"

const attrs = useAttrs()

const { class: className, ...restAttrs } = attrs

withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: string
    href?: any
    tight?: boolean
    elevated?: boolean
    cursor?: boolean
    truncate?: boolean
  }>(),
  {
    tight: false,
    elevated: false,
    cursor: false,
    truncate: false,
  },
)
</script>

<template>
  <component
    :is="href ? SmartLink : 'div'"
    :href="href"
    :class="[
      'rounded-lg card-base overflow-x-hidden transition-colors',
      tight ? 'p-2' : 'p-4',
      {
        'cursor-pointer': cursor === true,
        'items-center flex space-x-4': $slots.icon || $slots['icon-left'],
        'justify-between': $slots.icon && !$slots['icon-left'],
      },
      className,
    ]"
    v-bind="{ ...restAttrs }"
  >
    <div v-if="$slots['icon-left']" class="flex-shrink-0">
      <slot name="icon-left" />
    </div>

    <div class="overflow-x-hidden leading-relaxed space-y-2">
      <h2
        v-if="$slots.title"
        class="font-medium text-black dark:text-white truncate"
      >
        <slot
          name="title"
          class="font-medium text-black dark:text-white truncate"
        />
      </h2>

      <h2
        v-else-if="title"
        class="font-medium text-black dark:text-white truncate"
      >
        {{ title }}
      </h2>

      <p
        v-if="$slots.default"
        class="text-black/50 dark:text-white/30 text-sm"
        :class="truncate === true && 'line-clamp-2'"
      >
        <slot />
      </p>
    </div>

    <div v-if="$slots.icon" class="flex-shrink-0">
      <slot name="icon" />
    </div>
  </component>
</template>
