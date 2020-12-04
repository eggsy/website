<template>
  <nav class="w-full fixed top-0 z-40 left-0 bg-gray-900">
    <!-- Desktop Navbar -->
    <div
      class="hidden sm:block container shadow-lg mx-auto bg-gray-900 font-medium text-gray-200"
    >
      <ul class="flex">
        <nuxt-link to="/blog" class="hover:bg-gray-800 px-4 py-2">
          <li>Blog</li>
        </nuxt-link>

        <span class="flex-grow"></span>

        <li class="flex items-center mx-auto">
          <input
            v-model="input"
            placeholder="Gönderi ara..."
            class="px-4 py-2 bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none rounded-none"
            @keydown.enter="search"
          />
        </li>

        <nuxt-link
          v-for="(page, index) in pages"
          :key="`page-${index}`"
          :to="page.url"
          class="hover:bg-gray-800 px-4 py-2"
        >
          <li>
            {{ page.title }}
          </li>
        </nuxt-link>

        <li
          class="hover:bg-gray-800 px-4 py-2 flex items-center cursor-pointer"
          @click="goToDaily"
        >
          <icon
            v-if="$fetchState.pending === true"
            name="sync"
            class="h-6 w-6 animate-spin"
          />
          <span v-else>Günlük Müzik</span>
        </li>

        <nuxt-link
          to="/"
          title="Ana siteye dön"
          class="hover:bg-gray-800 px-4 py-2 flex items-center"
        >
          <li>
            <icon name="chevron-double-right" class="h-4 w-4" />
          </li>
        </nuxt-link>
      </ul>
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

          <ul>
            <nuxt-link
              to="/"
              class="hover:bg-gray-800 block px-4 py-4 truncate"
            >
              <li class="flex items-center space-x-2">
                <icon name="home" class="h-6 w-6" />
                <span>Ana Siteye Dön</span>
              </li>
            </nuxt-link>

            <nuxt-link
              v-for="(page, index) in pages"
              :key="`page-mobile-${index}`"
              :to="page.url"
              class="hover:bg-gray-800 block px-4 py-4 truncate"
              @click="mobileMenu = false"
            >
              <li class="flex items-center space-x-2">
                <icon :name="page.icon" class="h-6 w-6" />
                <span>{{ page.title }}</span>
              </li>
            </nuxt-link>

            <li class="hover:bg-gray-800 px-4 py-4 truncate" @click="goToDaily">
              <icon
                v-if="$fetchState.pending === true"
                name="sync"
                class="h-6 w-6 animate-spin"
              />

              <div v-else class="flex items-center space-x-2">
                <icon name="music-note" class="h-6 w-6" />
                <span>Günlük Müzik</span>
              </div>
            </li>

            <a
              class="hover:bg-gray-800 flex-1 mt-auto block px-4 py-4 truncate"
              @click="closeMobileMenu"
            >
              <li class="flex items-center space-x-2">
                <icon name="arrow-left" class="h-6 w-6" />
                <span>Kapat</span>
              </li>
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

      <div
        v-ripple
        class="rounded-full hover:bg-gray-800 p-2"
        @click="focusSearch"
      >
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
      if (this.$fetchState.pending === true) return
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
