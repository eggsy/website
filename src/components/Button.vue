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
      type: String as PropType<"primary" | "secondary" | "patreon" | "github">,
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
    getVariantClasses(): string {
      if (this.variant === "patreon")
        return "bg-[#FF424D] bg-opacity-100 text-white hover:(bg-[#FF424D] bg-opacity-75)"
      else if (this.variant === "github")
        return "bg-gray-200 text-black bg-opacity-100 dark:(bg-neutral-800 text-white)  hover:bg-opacity-60"
      return "text-gray-700 dark:text-neutral-400"
    },
  },
})
</script>

<template>
  <SmartLink
    :href="disabled === false && href"
    :blank="blank"
    class="cursor-pointer flex space-x-2 transition-colors btn items-center justify-center"
    :class="{
      // Variants
      [getVariantClasses]: true,

      // Tightness
      'px-2 py-1': rounded === false && tight === true,
      'px-4 py-2': rounded === false && tight === false,

      // Borders
      rounded: rounded === false,
      'rounded-full p-2': rounded === true,

      // Width
      'sm:w-max': block === false,

      // Rest
      'line-through': disabled === true,
      'flex items-center space-x-2': $slots.icon,
      'dark:hover:bg-neutral-800 hover:bg-gray-200':
        variant === 'primary' && elevated === false && disabled === false,
      'bg-gray-200 hover:bg-gray-200/40 dark:(bg-neutral-800 hover:bg-neutral-800/40)':
        variant === 'primary' && elevated === true && disabled === false,
    }"
  >
    <component :is="getIconName" v-if="icon && !$slots.icon" class="h-5 w-5" />

    <slot v-else name="icon" />

    <span v-if="$slots.default">
      <slot />
    </span>
  </SmartLink>
</template>
