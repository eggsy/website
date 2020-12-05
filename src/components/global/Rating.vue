<template>
  <div class="ratings-container">
    <div class="rating">
      {{ rating }}
    </div>
    <div class="truncate">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
}
</script>
