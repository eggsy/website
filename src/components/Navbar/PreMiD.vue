<template>
  <nav
    class="w-full fixed top-0 z-40 left-0 shadow-lg bg-gray-900 dark:bg-gray-800"
  >
    <div class="hidden md:flex container mx-auto">
      <nuxt-link
        to="/"
        class="bg-gray-800 hover:bg-gray-700 px-2 flex items-center space-x-2"
      >
        <icon
          name="arrow-left"
          title="Go back to website"
          class="h-6 w-6 mx-auto text-gray-500"
        />
        <span class="text-gray-300">Go Back Home</span>
      </nuxt-link>

      <div class="flex-grow flex justify-center">
        <ul class="px-2 space-x-4 flex items-center text-gray-200">
          <nuxt-link
            v-for="(link, index) in links"
            :key="`link-${index}`"
            :to="`/projects/premid${link.url}`"
            :class="{
              ' flex items-center space-x-2 p-2': true,
              'hover:bg-gray-800 dark:hover:bg-gray-900':
                $route.path !== `/projects/premid${link.url}`,
              'bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-900':
                $route.path === `/projects/premid${link.url}`,
            }"
          >
            <icon :name="link.icon" class="h-6 w-6" />
            <span>{{ link.title }}</span>
          </nuxt-link>
        </ul>
      </div>

      <a
        href="https://premid.app/?utm_source=eggsy.xyz"
        rel="noreferrer"
        target="_blank"
        class="bg-gray-800 hover:bg-gray-700 px-2 flex items-center space-x-2"
      >
        <span class="text-gray-300">PreMiD</span>
        <icon
          name="cursor-click"
          title="Visti PreMiD's website"
          class="h-6 w-6 mx-auto text-gray-500"
        />
      </a>
    </div>

    <div
      class="font-lg flex justify-center py-4 w-full md:hidden text-gray-100"
    >
      PreMiD
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "Presence Stats",
          icon: "trending-up",
          url: "/stats",
        },
        {
          title: "Metadata Creator",
          icon: "computer",
          url: "/mdcreator",
        },
        {
          title: "Custom Status",
          icon: "document",
          url: "/custom-status",
        },
      ],
    }
  },
}
</script>
