<template>
  <div
    v-if="$fetchState.pending"
    class="flex items-center justify-center h-screen space-x-2 overflow-hidden text-2xl font-semibold text-gray-900 select-none"
  >
    <icon name="sync" class="w-8 h-8 animate-spin" />

    <h3>Gönderi yükleniyor...</h3>
  </div>

  <div
    v-else-if="$fetchState.error"
    class="flex items-center justify-center h-screen overflow-hidden select-none"
  >
    <div class="space-y-2">
      <div
        class="flex items-center justify-center space-x-2 text-2xl font-semibold text-gray-900"
      >
        <icon name="times" class="w-8 h-8" />

        <h3>Gönderi yüklenemedi.</h3>
      </div>

      <small class="text-sm">Büyük ihtimalle gönderi henüz blogumda yok</small>

      <div class="flex justify-center">
        <nuxt-link
          to="/blog"
          class="px-4 py-2 text-gray-200 bg-gray-700 rounded-md hover:bg-gray-800"
          title="bloga dön"
        >
          Bloga Dön
        </nuxt-link>
      </div>
    </div>
  </div>

  <div
    v-else
    class="px-4 pt-20 pb-8 mx-auto sm:pt-16 sm:px-0 sm:w-11/12 sm:flex sm:space-x-4"
  >
    <div
      class="sticky left-0 hidden h-full space-y-2 rounded-md share sm:table-row top-14"
    >
      <div @click="share('twitter')">
        <icon name="twitter" class="w-full h-full text-social-twitter" />
      </div>

      <div @click="share('telegram')">
        <icon name="telegram" class="w-full h-full text-social-telegram" />
      </div>

      <div @click="share('whatsapp')">
        <icon name="whatsapp" class="w-full h-full text-social-whatsapp" />
      </div>

      <div @click="share('url')">
        <icon
          v-if="copied === true"
          key="check"
          name="check"
          class="w-full h-full text-green-600"
        />

        <icon
          v-else
          key="link"
          name="link"
          class="w-full h-full text-gray-700 dark:text-gray-300"
        />
      </div>
    </div>

    <div class="w-full sm:w-8/12">
      <article>
        <div
          class="p-4 bg-gray-100 rounded-lg leading-thight dark:bg-gray-800 ring-1 ring-opacity-75 ring-gray-200 dark:ring-gray-900"
        >
          <h1
            class="text-lg font-semibold text-gray-800 dark:text-gray-200 sm:text-xl"
          >
            {{ post.title }}
          </h1>
          <p class="text-gray-600 dark:text-gray-300">{{ post.description }}</p>
        </div>

        <div
          :class="{
            'mt-2': true,
            'sm:flex sm:space-x-2 space-y-2 sm:space-y-0': getTags.length > 0,
          }"
        >
          <div
            class="w-full px-4 py-2 text-center bg-gray-100 rounded-md dark:bg-gray-800 ring-1 ring-opacity-75 ring-gray-200 dark:ring-gray-900 dark:text-gray-300 sm:w-auto whitespace-nowrap"
          >
            Okuma Süresi: {{ getReadingTime }} dk
          </div>

          <div
            v-if="getTags.length > 0"
            class="flex items-center w-full col-span-2 px-4 py-2 space-x-2 bg-gray-100 rounded-md dark:bg-gray-800 ring-1 ring-opacity-75 ring-gray-200 dark:ring-gray-900"
          >
            <span class="dark:text-gray-300">Etiketler:</span>

            <div class="space-x-2 overflow-x-auto overflow-y-hidden">
              <nuxt-link
                v-for="(tag, index) of getTags"
                :key="`tag-${index}`"
                :to="`/blog/etiket/${tag}`"
                class="px-2 py-1 font-medium text-gray-700 bg-gray-200 rounded-md select-none hover:bg-opacity-75 dark:bg-gray-700 dark:text-gray-300"
              >
                <span>{{ tag }}</span>
              </nuxt-link>
            </div>
          </div>

          <div
            class="flex pr-1 space-x-4 overflow-x-auto overflow-y-hidden rounded-md sm:hidden share-small dark:text-gray-300"
          >
            <div class="flex items-center space-x-2" @click="share('twitter')">
              <icon name="twitter" class="w-6 h-6 text-social-twitter" />
              <span>Tweet</span>
            </div>

            <div class="flex items-center space-x-2" @click="share('telegram')">
              <icon name="telegram" class="w-6 h-6 text-social-telegram" />
              <span>Telegram</span>
            </div>

            <div class="flex items-center space-x-2" @click="share('whatsapp')">
              <icon name="whatsapp" class="w-6 h-6 text-social-whatsapp" />
              <span>WhatsApp</span>
            </div>

            <div class="flex items-center space-x-2" @click="share('url')">
              <icon
                v-if="copied === true"
                key="check"
                name="check"
                class="w-6 h-6 text-green-600"
              />

              <icon
                v-else
                key="link"
                name="link"
                class="w-6 h-6 text-gray-700 dark:text-gray-300"
              />

              <span>Kopyala</span>
            </div>
          </div>
        </div>

        <div class="mt-4 text-justify">
          <nuxt-content :document="post"></nuxt-content>
        </div>

        <div
          v-if="getRelatedPosts.length > 0"
          class="p-4 mt-4 bg-gray-100 rounded-md dark:bg-gray-800 ring-1 ring-opacity-75 ring-gray-200 dark:ring-gray-900"
        >
          <CoolTitle
            :left="getRelatedPosts.length"
            right-up="Bunlar da"
            right-down="Hoşunuza gidebilir"
            class="mb-4"
          />

          <div class="grid gap-2 sm:grid-cols-2">
            <nuxt-link
              v-for="(related, index) in getRelatedPosts"
              :key="`related-${index}`"
              :to="`/blog/gonderi/${related.slug}`"
              :class="{
                'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-opacity-75 ring-1 ring-opacity-50 ring-gray-300 dark:ring-gray-800 dark:text-gray-300 text-center sm:text-left truncate p-4 rounded-md': true,
                'sm:col-span-2':
                  index % 2 === 0 && index + 1 >= getRelatedPosts.length,
              }"
            >
              {{ related.title }}
            </nuxt-link>
          </div>
        </div>
      </article>
    </div>

    <div
      v-if="getToc.length > 0"
      class="sticky hidden h-full space-y-2 sm:block top-14"
    >
      <div id="titles" class="space-y-2 overflow-x-hidden overflow-y-hidden">
        <a
          v-for="link of getToc"
          :key="link.id"
          :href="`#${link.id}`"
          :title="link.text"
          :class="{
            'rounded-md transition block transform': true,
            'translate-x-2 font-semibold':
              observer.currentlyActiveToc === link.id,
          }"
          @click="observer.currentlyActiveToc = link.id"
        >
          {{ link.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blog",
  data() {
    return {
      post: {},
      copied: false,
      observer: {
        instance: null,
        currentlyActiveToc: "",
      },
    }
  },
  async fetch() {
    const post = await this.$content(this.$route.params.slug).fetch()

    if (!post) return this.$router.push("/blog")
    else if (!post.related?.length) return (this.post = post)

    const array = []
    for (const key of post.related) {
      const { title } = await this.$content(key).only(["title"]).fetch()
      array.push({
        title,
        slug: key,
      })
    }

    this.post = post
    this.post.related = array
  },
  head() {
    const title = this.post?.title || "Gönderi Yükleniyor"
    const description =
      this.post?.description ||
      "EGGSY'nin blogunda bu yazıyı okumaya davet edildin."
    const image = this.getPostImage || false

    const object = {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.getTags || null,
        },
        // Open-Graph
        {
          hid: "og:title",
          name: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: `https://new.eggsy.xyz/blog/gonderi/${this.$route?.params?.slug}`,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: image,
        },
        // Twitter
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
        {
          name: "article:published-time",
          content: this.post?.createdAt || null,
        },
        // PreMiD
        {
          name: "premid-details",
          content: title,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `https://new.eggsy.xyz/blog/gonderi/${this.$route?.params?.slug}`,
        },
      ],
    }

    return object
  },
  computed: {
    getTags() {
      return this.post.tags?.map((tag) => tag.replace(/\s/g, "")) || []
    },
    getReadingTime() {
      const body = JSON.stringify(this.post.body)
      const words = body?.split(" ").length || 0
      return Math.ceil(words / 200).toFixed()
    },
    getRelatedPosts() {
      return this.post.related || []
    },
    getToc() {
      return this.post.toc
    },
    getPostImage() {
      if (this.post?.image) return this.post.image
      else return `/assets/images/posts/${this.post?.slug}`
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
    this.observer.instance?.disconnect()
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.$fetchState.pending === false && !this.$fetchState.error) {
        this.setupObserver()
        clearInterval(this.interval)
      } else if (this.$fetchState.error) clearInterval(this.interval)
    }, 100)
  },
  methods: {
    share(option) {
      if (option === "url") {
        const el = document.createElement("textarea")
        el.value = document.location.href

        document.body.appendChild(el)

        el.select()

        document.execCommand("copy")
        document.body.removeChild(el)

        this.copied = true
        setTimeout(() => (this.copied = false), 3000)
      } else {
        let url = ""

        switch (option) {
          case "twitter":
            url = `https://twitter.com/intent/tweet?via=eggsydev&text=${encodeURIComponent(
              this.post.title + "\n" + location.href
            )}`
            break
          case "telegram":
            url = `https://telegram.me/share/url?url=${encodeURIComponent(
              location.href
            )}`
            break
          case "whatsapp":
            url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
              this.post.title + "\n" + location.href
            )}`
            break
        }

        window.open(
          url,
          `${option[0].toUpperCase() + option.toLowerCase().slice(1)}`,
          "width=400,height=550"
        )
      }
    },
    setupObserver() {
      this.observer.instance = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("id")

            if (entry.isIntersecting) {
              // Auto scroll when half of screen height is passed
              const scrollHeight = document.querySelector(
                `#titles a[href='#${id}']`
              )?.offsetTop

              document
                .querySelector("#titles")
                .scrollTo(
                  0,
                  scrollHeight > window.innerHeight / 2 ? scrollHeight : 0
                )

              this.observer.currentlyActiveToc = id
            }
          })
        },
        { threshold: 0 }
      )

      document
        .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
        .forEach((section) => {
          this.observer.instance.observe(section)
        })
    },
  },
}
</script>

<style lang="scss">
.share {
  > div {
    @apply bg-gray-100 cursor-pointer hover:bg-gray-200 p-3 ring-1 ring-gray-200 dark:ring-gray-800 rounded-full w-14 h-14 ml-auto dark:bg-gray-800 dark:hover:bg-opacity-75;
  }

  &-small {
    @apply mx-auto bg-gray-100 dark:bg-gray-800 cursor-pointer;

    > div {
      @apply hover:bg-opacity-80 p-3;
    }
  }
}

.nuxt-content {
  /* Headings */
  h1,
  h2,
  h3 {
    @apply font-semibold hover:underline text-gray-900 dark:text-gray-100;
  }

  h1 {
    @apply text-xl;
  }

  h2,
  h3 {
    @apply text-lg;
  }

  /* Paragraphs */
  p {
    @apply text-gray-800 dark:text-gray-300;

    &.text-center {
      @apply flex justify-center;
    }

    strong {
      @apply font-medium text-gray-900 dark:text-gray-200;
    }

    a {
      @apply text-blue-700 hover:text-blue-800 hover:underline;
    }

    code {
      @apply bg-gray-800 dark:bg-gray-700 rounded-md text-gray-200 px-1 py-px font-sans;
    }

    img {
      @apply rounded-md;
    }

    &:not(:last-child) {
      @apply mb-4;
    }
  }

  /* Ratings */
  .ratings {
    @apply space-y-px mb-4 dark:text-gray-200;

    .ratings-container {
      @apply flex items-center space-x-2;

      .rating {
        @apply bg-red-600 hover:bg-red-700 select-none w-16 px-2 py-px rounded-md text-gray-100 font-semibold text-center;
      }
    }
  }

  /* Pre */
  pre {
    @apply rounded-md;
  }

  /* Ordered and Unordered Lists */
  ol,
  ul {
    @apply text-gray-800 dark:text-gray-300;

    li:not(:last-child) {
      @apply mb-1;
    }
  }

  ol {
    @apply list-decimal pl-4;

    &:not(:last-child) {
      @apply mb-4;
    }
  }

  ul {
    @apply list-disc pl-4;

    &:not(:last-child) {
      @apply mb-4;
    }
  }
}

#titles {
  scroll-behavior: smooth;
  max-height: 90vh;

  @apply text-gray-800 dark:text-gray-200;
}
</style>
