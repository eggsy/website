<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="!name"></div>
  <div v-else-if="!icon"></div>

  <div
    v-else-if="typeof classes === 'string'"
    :class="`svg-icon ${classes}`"
    v-html="icon"
  ></div>

  <div
    v-else-if="typeof classes === 'object'"
    :class="`svg-icon ${classes}`"
    v-html="icon"
  ></div>

  <div v-else class="svg-icon" v-html="icon"></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    classes: {
      type: [String, Array],
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      icon: this.name ? require(`~/assets/icons/${this.name}.svg?raw`) : null,
    }
  },
}
</script>
