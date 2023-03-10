<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    // String
    href: {
      type: [] as PropType<any>,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },

    // Boolean
    block: {
      type: Boolean,
      required: false,
      default: false,
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    getIconName(): string {
      return this.icon?.startsWith("Icon") ? this.icon : `Icon${this.icon}`
    },
  },
})
</script>

<template>
  <SmartLink
    :href="!disabled && href"
    :blank="blank"
    class="cursor-pointer justify-center px-5 py-2 rounded-lg card-base flex items-center space-x-2"
    :class="{
      'w-max': !block,
      'rounded-full': rounded,
    }"
  >
    <component :is="getIconName" v-if="icon && !$slots.icon" class="h-4 w-4" />

    <slot v-else name="icon" />

    <span v-if="$slots.default">
      <slot />
    </span>
  </SmartLink>
</template>
