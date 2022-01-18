<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    // Boolean
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },

    // String
    title: {
      type: String,
      required: false,
      default: "",
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    getIconName(): string {
      return this.icon?.startsWith("Icon") ? this.icon : `Icon${this.icon}`
    },
    getSafeHtml(): string {
      return this.title.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    },
  },
})
</script>

<template>
  <div
    :title="description"
    class="rounded-md cursor-pointer transition-colors select-none"
    :class="{
      // Loading
      'animate-pulse bg-neutral-800/40 ml-2 py-5': loading === true,
      'py-2 px-2': loading === false,

      // Not loading
      'bg-neutral-800/40 text-neutral-300':
        loading === false && active === true,
      'hover:bg-neutral-800/40 text-neutral-400':
        loading === false && active === false,
      'flex items-center space-x-2': loading === false && icon !== null,
    }"
  >
    <Component
      :is="getIconName"
      v-if="loading === false && icon !== null"
      class="h-5 w-5"
    />

    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-if="loading === false" class="truncate" v-html="getSafeHtml"></span>
  </div>
</template>

<style scoped>
span >>> strong {
  @apply font-medium text-neutral-300;
}
</style>
