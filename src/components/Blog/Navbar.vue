<template>
  <div class="w-full fixed top-0 z-40 left-0 bg-gray-900">
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
            placeholder="Gönderi ara..."
            class="px-4 py-2 bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none rounded-none"
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

        <li class="hover:bg-gray-800 px-4 py-2 flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
          >
            <path
              d="M17.8863 9.87401L9.88958 4.42942C9.51253 4.17258 9.0742 4.02517 8.62145 4.00295C8.16869 3.98072 7.71854 4.08452 7.31909 4.30325C6.91964 4.52198 6.58591 4.84741 6.35358 5.24477C6.12124 5.64213 5.99903 6.09647 6.00001 6.55924V17.4459C5.99994 17.9082 6.12281 18.3619 6.35551 18.7585C6.58821 19.1551 6.92201 19.4798 7.3213 19.698C7.72058 19.9161 8.17038 20.0194 8.6227 19.997C9.07501 19.9746 9.51288 19.8272 9.88958 19.5706L17.8863 14.126C18.2289 13.8928 18.5098 13.5768 18.7041 13.2062C18.8984 12.8355 19 12.4217 19 12.0013C19 11.5809 18.8984 11.167 18.7041 10.7964C18.5098 10.4257 18.2289 10.1098 17.8863 9.87656V9.87401Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>

        <nuxt-link
          to="/"
          title="Ana siteye dön"
          class="hover:bg-gray-800 px-4 py-2 flex items-center"
        >
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </li>
        </nuxt-link>
      </ul>
    </div>

    <div
      class="flex sm:hidden shadow:lg container mx-auto bg-gray-900 font-medium text-gray-200 text-center py-2 items-center px-4"
    >
      <div class="rounded-full hover:bg-gray-800 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>

      <div class="flex-grow">
        <nuxt-link
          to="/blog"
          class="px-4 py-2 font-semibold text-lg hover:bg-gray-800"
        >
          Blog
        </nuxt-link>
      </div>

      <nuxt-link v-ripple to="/" class="rounded-full hover:bg-gray-800 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        {
          title: "Linux",
          url: "/blog/ara?q=Linux",
        },
        {
          title: "Oyun",
          url: "/blog/ara?q=Oyun",
        },
        {
          title: "Discord",
          url: "/blog/ara?q=Discord",
        },
      ],
    }
  },
  head: {
    title: "Blog",
  },
}
</script>
