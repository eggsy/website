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
  },
}
</script>
