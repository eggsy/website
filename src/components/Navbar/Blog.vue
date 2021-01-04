<template>
  <nav
    class="fixed top-0 left-0 z-40 w-full bg-gray-900 shadow-lg dark:bg-gray-800"
  >
    <!-- Desktop Navbar -->
    <div
      class="container hidden mx-auto font-medium text-gray-200 truncate bg-gray-900 sm:block dark:bg-gray-800"
    >
      <div class="flex">
        <nuxt-link
          to="/blog"
          class="px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          Blog
        </nuxt-link>

        <div class="flex-grow"></div>

        <div class="flex items-center mx-auto">
          <label for="input" class="hidden">Gönderi Ara</label>
          <input
            id="input"
            v-model="input"
            placeholder="Gönderi ara..."
            class="px-4 py-2 bg-gray-900 rounded-none hover:bg-gray-800 focus:bg-gray-800 dark:bg-gray-800 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:outline-none"
            @keydown.enter="search"
          />
        </div>

        <nuxt-link
          v-for="(page, index) in pages"
          :key="`page-${index}`"
          :to="page.url"
          class="px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          {{ page.title }}
        </nuxt-link>

        <nuxt-link
          to="/daily"
          target="_blank"
          class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          Günlük Müzik
        </nuxt-link>

        <nuxt-link
          v-tippy="{ content: 'Ana Sayfaya Dön', placement: 'bottom' }"
          to="/"
          title="Ana siteye dön"
          class="flex items-center px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          <icon name="chevron-double-right" class="w-4 h-4" />
        </nuxt-link>
      </div>
    </div>

    <!-- Moble Navbar -->
    <div
      class="container flex items-center px-4 py-2 mx-auto font-medium text-gray-200 bg-gray-900 sm:hidden shadow:lg"
    >
      <div v-if="mobileMenu">
        <div
          class="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-20"
          @click="mobileMenu = false"
        ></div>
        <div
          class="absolute top-0 left-0 w-2/3 min-h-screen bg-gray-900 shadow-lg"
        >
          <input
            ref="search"
            v-model="input"
            placeholder="Gönderi ara..."
            class="w-full px-4 py-4 bg-gray-800 rounded-none hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
            @keydown.enter="search"
          />

          <nuxt-link
            v-if="$route.path !== '/blog' && $route.path !== '/blog/'"
            to="/blog"
            class="block px-4 py-4 truncate hover:bg-gray-800"
          >
            <div class="flex items-center space-x-2">
              <icon name="home" class="w-6 h-6" />
              <span>Ana Sayfa</span>
            </div>
          </nuxt-link>

          <nuxt-link
            v-else
            to="/"
            class="block px-4 py-4 truncate hover:bg-gray-800"
          >
            <div class="flex items-center space-x-2">
              <icon name="home" class="w-6 h-6" />
              <span>Ana Siteye Dön</span>
            </div>
          </nuxt-link>

          <nuxt-link
            v-for="(page, index) in pages"
            :key="`page-mobile-${index}`"
            :to="page.url"
            class="block px-4 py-4 truncate hover:bg-gray-800"
            @click="mobileMenu = false"
          >
            <div class="flex items-center space-x-2">
              <icon :name="page.icon" class="w-6 h-6" />
              <span>{{ page.title }}</span>
            </div>
          </nuxt-link>

          <nuxt-link
            to="/daily"
            class="flex items-center px-4 py-4 space-x-2 truncate cursor-pointer hover:bg-gray-800"
          >
            <icon name="music-note" class="w-6 h-6" />
            <span>Günlük Müzik</span>
          </nuxt-link>

          <a
            class="flex-1 block px-4 py-4 mt-auto truncate hover:bg-gray-800"
            @click="closeMobileMenu"
          >
            <div class="flex items-center space-x-2">
              <icon name="arrow-left" class="w-6 h-6" />
              <span>Kapat</span>
            </div>
          </a>
        </div>
      </div>

      <div
        class="p-2 rounded-full hover:bg-gray-800"
        @click="mobileMenu = true"
      >
        <icon name="menu" class="w-6 h-6" />
      </div>

      <nuxt-link
        to="/blog"
        class="flex-grow px-4 py-2 text-lg font-semibold text-center hover:bg-gray-800"
      >
        Blog
      </nuxt-link>

      <div class="p-2 rounded-full hover:bg-gray-800" @click="focusSearch">
        <icon name="search" class="w-6 h-6" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      mobileMenu: false,
      daily: null,
      pages: [
        {
          title: "Haber",
          url: "/blog/etiket/haber",
          icon: "document",
        },
        {
          title: "Linux",
          url: "/blog/etiket/linux",
          icon: "linux",
        },
        {
          title: "Oyun",
          url: "/blog/etiket/oyun",
          icon: "controller",
        },
        {
          title: "Discord",
          url: "/blog/etiket/discord",
          icon: "discord",
        },
      ],
    }
  },
  watch: {
    "$route.path": "closeMobileMenu",
  },
  methods: {
    goToDaily() {
      if (this.$fetchState.pending === true || this.$fetchState.error === true)
        return
      window.open(`https://youtube.com/watch?v=${this.daily}`, "_blank")
    },
    search() {
      if (this.input)
        this.$router.push({ name: "blog-ara", query: { q: this.input } })
      if (this.mobileMenu) this.mobileMenu = false
    },
    focusSearch() {
      this.mobileMenu = true
      setTimeout(() => this.$refs.search?.focus())
    },
    closeMobileMenu() {
      this.mobileMenu = false
    },
  },
}
</script>
