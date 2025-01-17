<script setup lang="ts">
interface Props {
  src?: string | null
  alt?: string | null
  caption?: string | null
  imageClass?: string | null
  border?: boolean
  zoomable?: boolean
}

withDefaults(defineProps<Props>(), {
  src: null,
  alt: null,
  caption: null,
  imageClass: null,
  border: false,
  zoomable: true,
})
</script>

<template>
  <figure class="w-full h-full overflow-hidden">
    <img
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
