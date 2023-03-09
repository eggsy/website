<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: false,
      default: null,
    },
    alt: {
      type: String,
      required: false,
      default: null,
    },
    caption: {
      type: String,
      required: false,
      default: null,
    },
    imageClass: {
      type: String,
      required: false,
      default: null,
    },
  },
})
</script>

<template>
  <figure class="w-full h-full overflow-hidden">
    <component
      :is="src.endsWith('.gif') ? 'img' : 'nuxt-img'"
      :src="src"
      :alt="alt || caption || 'image'"
      loading="lazy"
      draggable="false"
      fit="cover"
      class="object-cover w-full rounded-md"
      :class="imageClass"
    />

    <figcaption v-if="caption" class="text-center">
      {{ caption }}
    </figcaption>
  </figure>
</template>
