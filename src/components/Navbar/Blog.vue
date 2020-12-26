<template>
  <nav
    class="w-full fixed top-0 z-40 left-0 shadow-lg bg-gray-900 dark:bg-gray-800"
  >
    <!-- Desktop Navbar -->
    <div
      class="hidden sm:block truncate container mx-auto bg-gray-900 dark:bg-gray-800 font-medium text-gray-200"
    >
      <div class="flex">
        <nuxt-link
          to="/blog"
          class="hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2"
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
            class="px-4 py-2 bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 dark:bg-gray-800 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:outline-none rounded-none"
            @keydown.enter="search"
          />
        </div>

        <nuxt-link
          v-for="(page, index) in pages"
          :key="`page-${index}`"
          :to="page.url"
          class="hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2"
        >
          {{ page.title }}
        </nuxt-link>

        <div
          class="hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 flex items-center cursor-pointer"
          @click="goToDaily"
        >
          <icon
            v-if="$fetchState.pending === true"
            name="sync"
            class="h-6 w-6 animate-spin"
          />

          <icon
            v-else-if="$fetchState.error === true"
            name="ban"
            class="h-6 w-6 cursor-not-allowed"
          />

          <span v-else>Günlük Müzik</span>
        </div>

        <nuxt-link
          to="/"
          title="Ana siteye dön"
          class="hover:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 flex items-center"
        >
          <icon name="chevron-double-right" class="h-4 w-4" />
        </nuxt-link>
      </div>
    </div>

    <!-- Moble Navbar -->
    <div
      class="flex sm:hidden shadow:lg container mx-auto bg-gray-900 font-medium text-gray-200 py-2 items-center px-4"
    >
      <div v-if="mobileMenu">
        <div
          class="min-h-screen bg-black bg-opacity-20 absolute left-0 top-0 w-full"
          @click="mobileMenu = false"
        ></div>
        <div
          class="bg-gray-900 min-h-screen w-2/3 absolute left-0 top-0 shadow-lg"
        >
          <input
            ref="search"
            v-model="input"
            placeholder="Gönderi ara..."
            class="px-4 w-full py-4 bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none rounded-none"
            @keydown.enter="search"
          />

            <nuxt-link
              v-if="$route.path !== '/blog' && $route.path !== '/blog/'"
              to="/blog"
              class="hover:bg-gray-800 block px-4 py-4 truncate"
            >
              <div class="flex items-center space-x-2">
                <icon name="home" class="h-6 w-6" />
                <span>Ana Sayfa</span>
              </div>
            </nuxt-link>

            <nuxt-link
              v-else
              to="/"
              class="hover:bg-gray-800 block px-4 py-4 truncate"
            >
              <div class="flex items-center space-x-2">
                <icon name="home" class="h-6 w-6" />
                <span>Ana Siteye Dön</span>
              </div>
            </nuxt-link>

            <nuxt-link
              v-for="(page, index) in pages"
              :key="`page-mobile-${index}`"
              :to="page.url"
              class="hover:bg-gray-800 block px-4 py-4 truncate"
              @click="mobileMenu = false"
            >
              <div class="flex items-center space-x-2">
                <icon :name="page.icon" class="h-6 w-6" />
                <span>{{ page.title }}</span>
              </div>
            </nuxt-link>

            <div class="hover:bg-gray-800 px-4 py-4 truncate" @click="goToDaily">
              <icon
                v-if="$fetchState.pending === true"
                name="sync"
                class="h-6 w-6 animate-spin"
              />

              <icon
                v-else-if="$fetchState.error === true"
                name="ban"
                class="h-6 w-6 cursor-not-allowed"
              />

              <div
                v-else
                class="flex items-center space-x-2 cursor-pointer select-none"
              >
                <icon name="music-note" class="h-6 w-6" />
                <span>Günlük Müzik</span>
              </div>
            </div>

            <a
              class="hover:bg-gray-800 flex-1 mt-auto block px-4 py-4 truncate"
              @click="closeMobileMenu"
            >
              <div class="flex items-center space-x-2">
                <icon name="arrow-left" class="h-6 w-6" />
                <span>Kapat</span>
              </div>
            </a>
          </ul>
        </div>
      </div>

      <div
        class="rounded-full hover:bg-gray-800 p-2"
        @click="mobileMenu = true"
      >
        <icon name="menu" class="h-6 w-6" />
      </div>

      <nuxt-link
        to="/blog"
        class="px-4 flex-grow py-2 font-semibold text-lg hover:bg-gray-800 text-center"
      >
        Blog
      </nuxt-link>

      <div class="rounded-full hover:bg-gray-800 p-2" @click="focusSearch">
        <icon name="search" class="h-6 w-6" />
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
  fetchOnServer: false,
  async fetch() {
    const url = await this.$getDaily()
    this.daily = url
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
