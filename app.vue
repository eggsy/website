<script setup lang="ts">
const colorMode = useColorMode()

useHead(() => {
  let string = "eggsy.xyz"

  return {
    titleTemplate: `%s - ${string}`,
    htmlAttrs: {
      class: `min-h-screen ${colorMode.preference} ${colorMode.value}`,
    },
    meta: [
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: string,
      },
    ],
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-neutral-900">
    <Navbar class="pt-10" />

    <!-- Nuxt component -->
    <main class="responsive-screen min-h-screen pb-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Go to top button -->
    <GoTop />

    <!-- Sponsor Popup -->
    <SponsorPopup />

    <!-- Other Components -->
    <VitePwaManifest />
    <NuxtLoadingIndicator />
  </div>
</template>
