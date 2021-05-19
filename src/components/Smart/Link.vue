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
    :href="href && (utm === false ? href : getUtmLink)"
    :target="blank && '_blank'"
    rel="noreferrer noopener"
    :title="title"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "SmartLink",
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
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    /**
     * Checks if the href leads to an internal page and returns boolean.
     * @returns {boolean}
     */
    isInternalPage(): boolean {
      const href = this.href

      if (typeof href === "object") return true
      else if (typeof href === "string" && ["/", "#"].includes(href[0]))
        return true
      else return false
    },
    /**
     * Adds UTM query parameter to URL and returns it.
     * @returns {string}
     */
    getUtmLink(): string {
      try {
        const url = new URL(this.href)
        url.searchParams.append("utm_source", "eggsy.xyz")

        return url.href
      } catch (err) {
        return this.href
      }
    },
  },
})
</script>
