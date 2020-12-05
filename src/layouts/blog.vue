<template>
  <div class="bg-gray-50 w-full min-h-screen">
    <div class="container mx-auto">
      <Navbar />
      <Nuxt class="pt-10 px-2" />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    titleTemplate: "%s - eggsy.xyz",
    htmlAttrs: {
      lang: "tr",
    },
    meta: [
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "eggsy.xyz - blog",
      },
    ],
  },
}
</script>
