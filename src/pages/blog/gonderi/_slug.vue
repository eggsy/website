<template>
  <div>
    <article>
      <v-card class="card">
        <v-card-title class="__title text-h5">{{ title }}</v-card-title>
        <v-card-subtitle
          :style="{ maxWidth: '500px' }"
          v-if="post.description"
          >{{ post.description }}</v-card-subtitle
        >

        <v-card-text :class="{ 'd-flex px-4': !$device.isMobile }">
          <div class="d-flex align-center mr-4">
            <v-icon left>mdi-calendar</v-icon>
            {{ $getFormattedDate(post.createdAt) }}
          </div>

          <div class="d-flex" v-if="post.tags && post.tags.split(', ').length">
            <v-icon left v-if="post.tags.split(', ').length > 1"
              >mdi-tag-multiple</v-icon
            >
            <v-icon left v-else>mdi-tag</v-icon>

            <v-chip
              :to="`/blog/gonderi/ara/${encodeURIComponent(slug)}`"
              v-for="(slug, index) in post.tags.split(', ')"
              :style="{ marginRight: '4px' }"
              color="primary"
              :key="index"
              small
              >{{ slug }}</v-chip
            >
          </div>
        </v-card-text>
      </v-card>

      <v-row no-gutters>
        <v-col
          class="d-flex pa-2 mb-1 justify-space-between"
          v-if="$device.isMobile"
          cols="12"
        >
          <div>
            <div class="d-flex">
              <v-icon left>mdi-clock</v-icon>
              <span>Okuma Süresi</span>
            </div>

            <span class="text-h6">
              {{ readingTime }}
              <span class="text-caption">dakika</span>
            </span>
          </div>

          <div>
            <div class="d-flex text-right">
              <span :style="{ width: '100%' }">Paylaş</span>
              <v-icon right>mdi-share-circle</v-icon>
            </div>

            <div class="d-flex">
              <v-btn
                icon
                @click="share('twitter')"
                color="#31a9f3"
                class="ml-n1"
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>

              <v-btn icon @click="share('telegram')">
                <v-icon>mdi-telegram</v-icon>
              </v-btn>

              <v-btn icon @click="share('link')">
                <v-icon>mdi-link</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col md="8" sm="12">
          <nuxt-content ref="content" class="content" :document="post" />
        </v-col>

        <v-col class="pl-6" md="4" sm="12" v-if="!$device.isMobile">
          <div class="sticky">
            <div v-if="post.toc.length">
              <div class="d-flex mb-2">
                <v-icon left>mdi-subtitles-outline</v-icon>
                <span>Başlıklar</span>
              </div>

              <div
                :class="{
                  'grid-titles-list mb-4': true,
                  'only-four-titles': post.toc.length <= 4,
                }"
              >
                <a
                  :class="{
                    'pl-4': link.depth === 4,
                    'active-toc': observer.currentlyActiveToc === link.id,
                  }"
                  @click="tableOfContentsHeadingClick(link)"
                  v-for="link of post.toc"
                  :href="`#${link.id}`"
                  :title="link.text"
                  :key="link.id"
                  v-ripple
                >
                  {{ link.text }}
                </a>
              </div>
            </div>

            <div class="d-flex mb-2" v-if="post.related">
              <v-icon left>mdi-puzzle</v-icon>
              <span>Benzer Gönderiler</span>
            </div>

            <div v-if="!related.loaded && post.related">
              <v-sheet
                v-for="key in post.related.split(', ')"
                class="mb-4"
                :key="key"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="list-item-two-line"
                ></v-skeleton-loader>
              </v-sheet>
            </div>

            <div v-else-if="related.loaded && post.related">
              <nuxt-link
                v-for="(related, index) in related.posts"
                :to="`/blog/gonderi/${related.slug}`"
                class="related-content pa-4 mb-2"
                :key="index"
                tag="div"
                >{{ related.title }}</nuxt-link
              >
            </div>

            <v-row no-gutters>
              <v-col
                cols="12"
                :class="{
                  'd-flex justify-space-between mb-2': true,
                  'mt-4': post.related,
                }"
              >
                <div>
                  <div class="d-flex mb-1">
                    <v-icon left>mdi-clock</v-icon>
                    <span>Okuma Süresi</span>
                  </div>

                  <span class="text-h6">
                    {{ readingTime }}
                    <span class="text-caption">dakika</span>
                  </span>
                </div>

                <div class="text-right">
                  <div class="d-flex mb-1">
                    <span>Son Düzenleme</span>
                    <v-icon right>mdi-pencil-circle</v-icon>
                  </div>

                  <span>{{ $getFormattedDate(post.updatedAt) }}</span>
                </div>
              </v-col>

              <v-col cols="12" class="mt-2">
                <div>
                  <div class="d-flex mb-1">
                    <v-icon left>mdi-share-circle</v-icon>
                    <span>Paylaş</span>
                  </div>

                  <div class="d-flex">
                    <v-btn
                      icon
                      @click="share('twitter')"
                      color="#31a9f3"
                      class="ml-n1"
                    >
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>

                    <v-btn icon class="mx-1" @click="share('telegram')">
                      <v-icon>mdi-telegram</v-icon>
                    </v-btn>

                    <v-btn icon @click="share('link')">
                      <v-icon>mdi-link</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </article>

    <v-snackbar
      color="success darken-2"
      class="pb-0"
      v-model="snack.enabled"
      bottom
    >
      {{ snack.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snack.enabled = false">Tamam</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
.grid-titles-list {
  display: grid;

  &:not(.only-four-titles) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 4px;
  }

  a {
    transition: background-color 0.2s;
    background-color: #1e1e1e;
    -webkit-user-select: none;
    text-overflow: ellipsis;
    -moz-user-select: none;
    text-decoration: none;
    white-space: nowrap;
    text-align: center;
    border-radius: 8px;
    user-select: none;
    overflow: hidden;
    padding: 4px 1em;
    cursor: pointer;
    color: #ffffff;

    &.active-toc {
      background-color: #c0392b;
    }
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  border-left: solid 4px blueviolet;
  margin: 1em 0 0.5em 0;
  padding-left: 8px;

  a {
    text-decoration: none;
    color: #ffffff;
  }
}

.card {
  margin-bottom: 1em;
  padding: 1em;

  .__title {
    word-break: break-word;
  }
}

.v-application p {
  margin-bottom: 0;
}

.content {
  background-color: #212121;
  border-radius: 4px;
  padding: 1em 2em;

  p:not(:last-child) {
    padding: 0.5em 0;
  }

  table {
    margin-bottom: 1.5em;
    width: 100%;

    td {
      span {
        -webkit-user-select: none;
        background-color: #c0392b;
        transition: opacity 0.2s;
        -moz-user-select: none;
        padding: 0.25em 0.5em;
        border-radius: 1em;
        user-select: none;
        width: 100px;

        &:hover {
          opacity: 0.75;
        }
      }

      span.new {
        background-color: #2772a2;
      }
    }

    tr:not(:last-child) td {
      padding-bottom: 4px;
    }

    tr {
      @media only screen and (max-width: 1024px) {
        display: grid;
      }
    }
  }

  ul,
  ol {
    padding-bottom: 1em;
  }

  blockquote {
    border-left: 4px solid gray;
    padding-left: 1em;
  }

  a {
    transition: opacity 0.2s;
    text-decoration: none;

    &:hover {
      opacity: 0.75;
    }
  }

  img {
    box-shadow: 0px 0px 5px #000000;
    transition: border-radius 0.2s;
    border-radius: 4px;
    max-width: 100%;

    &:hover {
      border-radius: 0;
    }
  }
}

.related-content {
  background-color: #212121;
  transition: opacity 0.2s;
  text-overflow: ellipsis;
  text-decoration: none;
  white-space: nowrap;
  color: currentColor;
  border-radius: 4px;
  user-select: none;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    opacity: 0.75;
  }
}
</style>

<script>
import moment from "moment";

export default {
  layout: "blog",
  head() {
    const title = this.title
        ? this.title
        : this.found
        ? "Başlık Yok"
        : "Gönderi Bulunamadı",
      description =
        this.post?.description || "Bu gönderinin bir açıklaması yok.";

    return {
      title: title,
      meta: [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "eggsy.xyz - blog",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.post.image || null,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: `https://eggsy.xyz/blog/gonderi/${this.$route?.params?.slug}`,
        },
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
          hid: "keywords",
          name: "keywords",
          content: this.post?.tags || null,
        },
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          name: "premid-details",
          content: title,
        },
        {
          name: "premid-state",
          content: `EGGSY - ${this.$getFormattedDate(this.post.createdAt)}`,
        },
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
          content: this.post.image || null,
        },
        {
          name: "article:published-time",
          content: this.post?.createdAt || null,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `https://eggsy.xyz/blog/gonderi/${this.$route?.params?.slug}`,
        },
      ],
    };
  },
  async asyncData({ $content, params, error, redirect }) {
    try {
      const { title, ...post } = await $content(params.slug).fetch(),
        object = { post, title: title || "Başlık Yok" };

      if (!post.related) object["related"] = { loaded: true, posts: [] };
      else object["related"] = { loaded: false, posts: [] };

      return object;
    } catch (err) {
      if (err.message === `/${params.slug} not found`) return redirect("/blog");
      else error({ status: err.statusCode, message: err.message });
    }
  },
  data() {
    return {
      readingTime: 0,
      snack: {
        enabled: false,
        text: "",
      },
      observer: {
        instance: null,
        currentlyActiveToc: "",
        options: {
          root: this.$refs.content,
          threshold: 0,
        },
      },
    };
  },
  async mounted() {
    this.readingTime = String(
      this.$refs?.content?.textContent?.split(" ").length / 200
    ).substring(0, 4);

    // Releated posts loader
    this.loadRelatedPosts();

    /* Observer setup */
    this.setupObserver();
  },
  beforeDestroy() {
    this.observer.instance.disconnect();
  },
  methods: {
    setupObserver() {
      this.observer.instance = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting) {
            this.observer.currentlyActiveToc = id;
          }
        });
      }, this.observer.options);

      document
        .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
        .forEach((section) => {
          this.observer.instance.observe(section);
        });
    },
    async loadRelatedPosts() {
      if (!this.post.related) return;
      const array = [];

      for (let key of this.post.related.split(", ") || []) {
        const content = await this.$content(key)
          .only(["title", "slug"])
          .fetch();
        array.push(content);
      }

      this.related.posts = array;
      this.related.loaded = true;
    },
    tableOfContentsHeadingClick(link) {
      this.currentlyActiveToc = link.id;
    },
    share(platform) {
      let uri,
        text = `${this.title || "Başlıksız Gönderi"} ▶ ${
          document.location.href
        }`;

      switch (platform) {
        case "twitter":
          uri = `https://twitter.com/intent/tweet?via=eggsydev&text=${text}`;
          window.open(uri, "Twitter", "width=350,height=500");
          break;
        case "telegram":
          uri = `https://telegram.me/share/url?url=${
            document.location.href
          }&text=${encodeURIComponent(this.title)}`;
          window.open(uri, "Telegram", "width=350,height=500");
          break;
        case "link":
          let el = document.createElement("textarea");

          el.value = document.location.href;
          document.body.appendChild(el);

          el.select();

          document.execCommand("copy");
          document.body.removeChild(el);

          this.snack.text = "Bağlantı panoya kopyalandı";
          this.snack.enabled = true;
          break;
      }
    },
  },
};
</script>