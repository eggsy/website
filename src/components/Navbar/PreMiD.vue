<template>
  <nav
    class="fixed top-0 left-0 z-40 w-full bg-gray-900 shadow-lg dark:bg-gray-800"
  >
    <div class="container hidden mx-auto md:flex">
      <nuxt-link
        to="/"
        class="flex items-center px-2 space-x-2 bg-gray-800 hover:bg-gray-700"
      >
        <icon
          name="arrow-left"
          title="Go back to website"
          class="w-6 h-6 mx-auto text-gray-500"
        />
        <span class="text-gray-300">Go Back Home</span>
      </nuxt-link>

      <div class="flex justify-center flex-grow">
        <div class="flex items-center px-2 space-x-4 text-gray-200">
          <nuxt-link
            v-for="(link, index) in links"
            :key="`link-${index}`"
            :to="{ name: link.path }"
            :class="{
              ' flex items-center space-x-2 p-2': true,
              'hover:bg-gray-800 dark:hover:bg-gray-900':
                $route.name !== link.path,
              'bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-900':
                $route.name === link.path,
            }"
          >
            <icon :name="link.icon" class="w-6 h-6" />
            <span>{{ link.title }}</span>
          </nuxt-link>
        </div>
      </div>

      <a
        href="https://premid.app/?utm_source=eggsy.xyz"
        rel="noreferrer"
        target="_blank"
        class="flex items-center px-2 space-x-2 bg-gray-800 hover:bg-gray-700"
      >
        <span class="text-gray-300">PreMiD</span>
        <icon
          name="cursor-click"
          title="Visti PreMiD's website"
          class="w-6 h-6 mx-auto text-gray-500"
        />
      </a>
    </div>

    <div
      class="flex justify-center w-full py-4 text-gray-100 font-lg md:hidden"
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
          path: "stats",
        },
        {
          title: "Metadata Creator",
          icon: "computer",
          path: "mdcreator",
        },
        {
          title: "Custom Status",
          icon: "document",
          path: "custom-status",
        },
      ].map((link) => {
        link.path = `projects-premid-${link.path}`
        return link
      }),
    }
  },
}
</script>
