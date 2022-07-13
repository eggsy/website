<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: false,
      default: null,
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
      type: [] as PropType<any>,
      required: false,
      default: null,
    },
    tight: {
      type: Boolean,
      required: false,
      default: false,
    },
    elevated: {
      type: Boolean,
      required: false,
      default: false,
    },
    cursor: {
      type: Boolean,
      required: false,
      default: true,
    },
    truncate: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      classes: "rounded-md focus-ring overflow-x-hidden transition-colors",
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
      'cursor-pointer': cursor === true,
      'bg-gray-100 dark:bg-neutral-800/40': elevated === true,
      'hover:bg-gray-100 dark:hover:bg-neutral-800/40': elevated === false,
      'items-center flex space-x-4': $slots.icon || $slots['icon-left'],
      'justify-between': $slots.icon && !$slots['icon-left'],
    }"
    v-bind="href ? $attrs : false"
  >
    <div v-if="$slots['icon-left']" class="flex-shrink-0">
      <slot name="icon-left" />
    </div>

    <div class="overflow-x-hidden">
      <h2
        v-if="title"
        class="font-medium text-gray-700 truncate dark:text-neutral-100"
      >
        {{ title }}
      </h2>

      <p
        v-if="$slots.default"
        class="text-neutral-500"
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
