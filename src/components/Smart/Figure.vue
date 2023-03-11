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
    border: {
      type: Boolean,
      required: false,
      default: false,
    },
    zoomable: {
      type: Boolean,
      required: false,
      default: true,
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
      :class="[
        imageClass,
        border && 'border border-black/10 dark:border-white/10',
      ]"
      :data-zoomable="zoomable"
    />

    <figcaption v-if="caption" class="text-center">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<style>
.medium-zoom-overlay {
  @apply z-40;
}

.medium-zoom-image.medium-zoom-image--opened {
  @apply z-50;
}
</style>
