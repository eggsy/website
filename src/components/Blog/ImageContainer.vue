<script lang="ts">
import Vue, { PropType } from "vue"

export default Vue.extend({
  props: {
    type: {
      type: String as PropType<"grid" | "flex">,
      required: false,
      default: "grid",
    },
  },
})
</script>

<template>
  <div
    :class="{
      'md:(flex space-x-2 items-center)': type === 'flex',
      'grid md:grid-flow-col md:auto-cols-fr gap-2': type === 'grid',
    }"
  >
    <slot />
  </div>
</template>
