<template>
  <nuxt-link v-if="$props.to" :to="$props.to">
    <div :class="`content ${getBackgroundColor}`">
      <slot></slot>
    </div>
  </nuxt-link>

  <a v-else-if="$props.href" :href="$props.href">
    <div :class="`content ${getBackgroundColor}`">
      <slot></slot>
    </div>
  </a>

  <div v-else :class="`content ${getBackgroundColor}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: false,
      default: null,
    },
    href: {
      type: [String, Object],
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: "information",
    },
  },
  computed: {
    getBackgroundColor() {
      let color = "bg-blue-500 dark:bg-blue-600"

      switch (this.type) {
        case "warning":
          color = "bg-yellow-500 dark:bg-yellow-600"
          break
        case "danger":
          color = "bg-red-500 dark:bg-yellow-600"
          break
      }

      return color
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply no-underline hover:no-underline;
}

.content {
  @apply mb-4 p-4 rounded-md text-gray-100 shadow;

  a {
    @apply text-purple-600 font-medium hover:underline;
  }
}
</style>
