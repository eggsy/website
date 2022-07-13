nta
<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    href: {
      type: String,
      required: false,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    iconProps: {
      type: Object as PropType<{ [key: string]: string }>,
      required: false,
      default: () => ({}),
    },
  },
})
</script>

<template>
  <component
    :is="href ? 'SmartLink' : 'div'"
    :href="href ? href : false"
    class="px-2 cursor-pointer select-none hover:bg-gray-300 dark:hover:bg-neutral-800/60 rounded-lg w-full py-3 text-neutral-600 dark:text-white/60 group flex items-center justify-between space-x-2"
  >
    <div
      class="flex-shrink-0"
      :class="{
        'flex items-center gap-2': icon,
      }"
    >
      <Component :is="icon" v-if="icon" class="h-5 w-5" v-bind="iconProps" />
      <span class="text-sm">{{ title }}</span>
    </div>

    <span class="group-hover:block hidden text-xs text-neutral-600 truncate">
      jump to
    </span>
  </component>
</template>
