<template>
  <div>
    <article>
      <v-card class="card">
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <v-card-subtitle
          :style="{ maxWidth: '500px' }"
          v-if="post.description"
        >{{ post.description }}</v-card-subtitle>

        <v-card-text :class="{ 'd-flex px-4' : !$device.isMobile }">
          <div class="d-flex align-center mr-4">
            <v-icon left>mdi-calendar</v-icon>
            {{ getFormattedDate(post.createdAt) }}
          </div>

          <div class="d-flex align-center mr-4">
            <v-icon left>mdi-account</v-icon>EGGSY
          </div>

          <div class="d-flex" v-if="post.tags && post.tags.split(', ').length">
            <v-icon left v-if="post.tags.split(', ').length > 1">mdi-tag-multiple</v-icon>
            <v-icon left v-else>mdi-tag</v-icon>

            <v-chip
              :to="`/blog/gonderi/ara/${encodeURIComponent(slug)}`"
              v-for="(slug, index) in post.tags.split(', ')"
              :style="{ marginRight: '4px' }"
              color="primary"
              :key="index"
              small
            >{{ slug }}</v-chip>
          </div>
        </v-card-text>
      </v-card>

      <v-row no-gutters>
        <v-col class="d-flex pa-2 mb-1 justify-space-between" v-if="$device.isMobile" cols="12">
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
              <v-btn icon @click="share('twitter')" color="#31a9f3" class="ml-n1">
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

        <v-col class="pl-4" md="4" sm="12" v-if="!$device.isMobile">
          <div class="sticky">
            <div class="mb-4">
              <div class="d-flex mb-1">
                <v-icon left>mdi-clock</v-icon>
                <span>Okuma Süresi</span>
              </div>

              <span class="text-h6">
                {{ readingTime }}
                <span class="text-caption">dakika</span>
              </span>
            </div>

            <div class="my-4">
              <div class="d-flex mb-1">
                <v-icon left>mdi-pencil-circle</v-icon>
                <span>Son Düzenleme</span>
              </div>

              <span>{{ getFormattedDate(post.updatedAt) }}</span>
            </div>

            <div class="my-4">
              <div class="d-flex mb-1">
                <v-icon left>mdi-share-circle</v-icon>
                <span>Paylaş</span>
              </div>

              <div class="d-flex">
                <v-btn icon @click="share('twitter')" color="#31a9f3" class="ml-n1">
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
          </div>
        </v-col>
      </v-row>
    </article>

    <v-snackbar color="success darken-2" class="pb-0" v-model="snack.enabled" bottom>
      {{ snack.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snack.enabled = false">Tamam</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  border-left: solid 4px blueviolet;
  padding-left: 8px;
  margin-bottom: 4px;
}

.card {
  padding: 1em;
  margin-bottom: 1em;
}

.content {
  background-color: #212121;
  border-radius: 4px;
  padding: 1em 2em;

  p {
    padding: 0.5em 0;
  }

  table {
    margin-bottom: 1.5em;
    width: 100%;

    td {
      a {
        width: 100px;
        background-color: #ff0000;
        color: #ffffff;
        text-decoration: none;
        border-radius: 1em;
        padding: 0.25em 0.5em;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.75;
        }
      }

      &.new a {
        background-color: #2772a2;
      }
    }

    tr:not(:last-child) td {
      padding-bottom: 4px;
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
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.75;
    }
  }

  img {
    box-shadow: 0px 0px 5px #000000;
    max-width: 100%;
    border-radius: 4px;
    transition: border-radius 0.2s;

    &:hover {
      border-radius: 0;
    }
  }
}
</style>

<script>
import moment from "moment";

export default {
  auth: false,
  layout: "blog",
  head() {
    const title = this.title
      ? this.title
      : this.found
      ? "Başlık Yok"
      : "Gönderi Bulunamadı";

    return {
      title: title,
      meta: [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "eggsy.xyz - blog",
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
          content:
            this.post?.description || "Bu gönderinin bir açıklaması yok.",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.post?.description,
        },
        {
          hid: "description",
          name: "description",
          content:
            this.post?.description || "Bu gönderinin bir açıklaması yok.",
        },
        {
          name: "premid-details",
          content: title,
        },
        {
          name: "premid-state",
          content: title,
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
  async asyncData({ $content, params, error }) {
    try {
      const { title, ...post } = await $content(params.slug).fetch();
      return { found: true, title: title || "Başlık Yok", post };
    } catch (err) {
      if (err.message === `/${params.slug} not found`) return { found: false };
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
    };
  },
  mounted() {
    this.readingTime = String(
      this.$refs?.content?.textContent?.split(" ").length / 200
    ).substring(0, 4);
  },
  methods: {
    getFormattedDate(pureDate) {
      const date = moment(pureDate),
        now = moment(),
        diffMn = now.diff(date, "minutes"),
        diffHr = now.diff(date, "hours"),
        diffDy = now.diff(date, "days");

      let timeString;

      if (diffHr <= 0 && diffMn == 0) timeString = `Fırından yeni çıktı!`;
      else if (diffMn < 60 && diffMn > 0) timeString = `${diffMn} dakika önce`;
      else if (diffHr < 24 && diffHr > 0) timeString = `${diffHr} saat önce`;
      else if (diffHr <= 48 && diffHr > 24) timeString = "Dün";
      else if (diffDy > 0 && diffDy < 30) timeString = `${diffDy} gün önce`;
      else timeString = `${date.format("DD/MM/YY HH:mm:SS")}`;

      return timeString;
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