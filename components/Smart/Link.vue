<script setup lang="ts">
const attrs = useAttrs()

const props = defineProps<{
  href: any
  blank?: boolean
  internal?: boolean
  external?: boolean
  title?: string | null
  utm?: boolean
}>()

const isInternalPage = computed((): boolean => {
  const href = props.href

  if (typeof href === "object") return true
  else if (typeof href === "string" && ["/", "#"].includes(href[0])) return true
  else return false
})

const getUtmLink = computed((): string => {
  try {
    const url = new URL(props.href)
    url.searchParams.append("utm_source", "eggsy.xyz")

    return url.href
  } catch (err) {
    return props.href
  }
})
</script>

<template>
  <!-- Internal URL -->
  <NuxtLink
    v-if="
      href &&
      ((isInternalPage === true && external === false) || internal === true)
    "
    :to="href"
    :target="blank ? '_blank' : ''"
    :title="title"
    v-bind="{ ...attrs }"
  >
    <slot />
  </NuxtLink>

  <!-- External URL -->
  <a
    v-else
    :href="href && (utm === false ? href : getUtmLink)"
    :target="blank ? '_blank' : ''"
    rel="noreferrer noopener"
    :title="title ?? ''"
    v-bind="{ ...attrs }"
  >
    <slot />
  </a>
</template>
