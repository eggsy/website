<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    // String
    href: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },

    // Boolean
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
    variant: {
      type: String as PropType<"primary" | "secondary" | "patreon">,
      required: false,
      default: "primary",
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    blank: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <SmartLink
    :href="href"
    :blank="blank"
    class="rounded cursor-pointer flex space-x-2 transition-colors btn items-center justify-center sm:w-max"
    :class="{
      // Variants
      'bg-[#FF424D] bg-opacity-100 text-white hover:(bg-[#FF424D] bg-opacity-50)':
        variant === 'patreon',
      'text-gray-700 dark:text-neutral-400': variant !== 'patreon',

      // Tightness
      'px-2 py-1': rounded === false && tight === true,
      'px-4 py-2': rounded === false && tight === false,

      // Borders
      'rounded-full p-2': rounded === true,

      // Rest
      'flex items-center space-x-2': $slots.icon,
      'dark:hover:bg-neutral-800 hover:bg-gray-200':
        variant === 'primary' && elevated === false,
      'bg-gray-200 hover:bg-gray-200/40 dark:(bg-neutral-800 hover:bg-neutral-800/40)':
        variant === 'primary' && elevated === true,
    }"
  >
    <component :is="icon" v-if="icon && !$slots.icon" class="h-6 w-6" />

    <slot v-else name="icon" />

    <span>
      <slot />
    </span>
  </SmartLink>
</template>
