<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
})
</script>

<template>
  <Card :title="title">
    <template #icon>
      <IconDev :brand="title" class="flex-shrink-0 h-7 w-7" />
    </template>
  </Card>
</template>
