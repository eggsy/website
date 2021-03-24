<template>
  <div
    class="w-full py-4 text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
  >
    <div class="w-11/12 mx-auto sm:w-9/12 md:w-7/12">
      <div
        class="items-center justify-between space-y-4 text-center sm:text-left sm:flex sm:space-y-0 sm:space-x-6"
      >
        <a
          href="https://github.com/eggsy/website"
          class="text-center sm:truncate hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {{ getLocalizedNotice }}
        </a>

        <Socials
          v-if="$route.name !== 'index'"
          class="justify-center flex-shrink-0 sm:justify-start"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    /**
     * Returns localized GitHub notice string in Turkish/English according to current route.
     * @returns {string}
     */
    getLocalizedNotice() {
      if (this.$route.name.includes("blog"))
        return "Bu site GitHub üzerinde açık kaynak olarak paylaşılmıştır."
      else return "This website is open-source on GitHub"
    },
  },
}
</script>
