<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: [],
    },
  },
  computed: {
    getDescriptions() {
      return typeof this.description === "string"
        ? [this.description]
        : this.description
    },
  },
})
</script>

<template>
  <div class="text-black/50 dark:text-white/30">
    <header class="space-y-2 my-12">
      <h1 class="text-black/90 dark:text-white/90 text-4xl font-semibold">
        {{ title }}
      </h1>

      <p
        v-for="(description, index) in getDescriptions"
        :key="`description-${index}`"
      >
        {{ description }}
      </p>
    </header>

    <slot />
  </div>
</template>
