<template>
  <!-- Internal URL -->
  <nuxt-link
    v-if="
      href &&
      ((isInternalPage === true && external === false) || internal === true)
    "
    :to="href"
    :target="blank && '_blank'"
    :title="title"
  >
    <slot />
  </nuxt-link>

  <!-- External URL -->
  <a
    v-else
    :href="href && (utm === false ? href : `${href}?utm_source=eggsy.xyz`)"
    :target="blank && '_blank'"
    rel="noreferrer"
    :title="title"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: [String, Object, Boolean],
      required: true,
      default: "",
    },
    blank: {
      type: Boolean,
      required: false,
      default: false,
    },
    internal: {
      type: Boolean,
      required: false,
      default: false,
    },
    external: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    utm: {
      type: [Boolean, String],
      required: false,
      default: true,
    },
  },
  computed: {
    /**
     * Checks if the href leads to an internal page and returns boolean.
     * @returns {boolean}
     */
    isInternalPage() {
      const { href } = this

      if (typeof href === "object") return true
      else if (["/", "#"].includes(href[0])) return true
      else return false
    },
  },
}
</script>
