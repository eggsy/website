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
      classes: "rounded-md overflow-x-hidden transition-colors",
    }
  },
})
</script>

<template>
  <component
    :is="href ? 'SmartLink' : 'div'"
    :href="href"
    class="rounded-lg card-base"
    :class="{
      [classes]: true,
      'p-2': tight === true,
      'p-4': tight === false,
      'cursor-pointer': cursor === true,
      'items-center flex space-x-4': $slots.icon || $slots['icon-left'],
      'justify-between': $slots.icon && !$slots['icon-left'],
    }"
    v-bind="href ? $attrs : false"
  >
    <div v-if="$slots['icon-left']" class="flex-shrink-0">
      <slot name="icon-left" />
    </div>

    <div class="overflow-x-hidden leading-relaxed space-y-2">
      <h2 v-if="title" class="font-medium text-black dark:text-white truncate">
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
