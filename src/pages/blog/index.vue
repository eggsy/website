<template>
  <div>
    <v-row no-gutters :class="{ 'justify-space-between': true, 'row-mobile': $device.isMobile }">
      <v-card
        :width="$device.isMobile ? '100%' : index === 0 ? 'calc(30%)' : 'calc(22.5% - 4px)'"
        @click="$router.push(`/blog/gonderi/${post.slug}`)"
        @click.middle="open(`/blog/gonderi/${post.slug}`)"
        v-for="(post, index) in galleryPosts"
        :title="post.title"
        :class="{ 'post d-sm-block': true, 'mb-4': $device.isMobile && index !== galleryPosts.length }"
        :key="index"
        ripple
      >
        <v-img
          class="white--text align-end"
          :lazy-src="post.cardImage"
          :src="post.cardImage"
          height="250px"
        >
          <v-card-title>
            <span
              :class="{ 'first-card-title': index === 0 || $device.isMobile, 'card-title': index !== 0 && !$device.isMobile }"
            >{{ post.title }}</span>
          </v-card-title>
        </v-img>
      </v-card>
    </v-row>

    <div class="d-flex mt-6 mb-2">
      <v-icon left>mdi-newspaper</v-icon>
      <h3>Gönderiler</h3>
    </div>

    <div class="cards mb-4">
      <v-row no-gutters>
        <v-col md="8" sm="12" :cols="{ '12': $device.isMobile }">
          <PostCard v-for="(post, index) in posts" :key="index" :post="post" />

          <div :class="{ 'show-more-container mt-4': true, 'mb-2': $device.isMobile }">
            <v-btn
              @click="showMore"
              :loading="loading"
              :disabled="full"
            >{{ full ? 'Başka Gönderi Yok' :'Daha Fazla Göster' }}</v-btn>
          </div>
        </v-col>

        <v-col md="4" sm="12" class="pl-md-4" :cols="{ '12': $device.isMobile }">
          <Sidebar />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  transition: opacity 0.2s;

  .first-card-title {
    width: 100%;
    text-align: center;
    word-break: break-word;
  }

  .card-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    opacity: 0.75;
  }
}

.show-more-container {
  width: 100%;
  text-align: center;
}

.row-mobile {
  max-height: 250px;
  overflow-y: scroll;
}
</style>

<script>
export default {
  auth: false,
  layout: "blog",
  head: {
    title: "Blog",
    meta: [
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "eggsy.xyz - blog",
      },
      { hid: "og:title", name: "og:title", content: "EGGSY's Blog" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası. ",
      },
      {
        hid: "description",
        name: "description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası. ",
      },
      { name: "premid-details", content: "Viewing a blog page:" },
      { name: "premid-state", content: "Homepage" },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://eggsy.xyz/blog",
      },
    ],
  },
  async asyncData({ $content }) {
    const galleryPosts = await $content()
      .limit(4)
      .sortBy("createdAt", "desc")
      .fetch();

    const posts = await $content()
      .skip(4)
      .limit(5)
      .sortBy("createdAt", "desc")
      .fetch();

    return {
      galleryPosts,
      posts,
    };
  },
  data() {
    return {
      search: this.$route.query.q || this.$route.query.search || "",
      postCount: 5,
      full: false,
      loading: false,
    };
  },
  methods: {
    open(url) {
      window.open(url, "_blank");
    },
    async showMore() {
      this.loading = true;
      this.postCount += 5;

      const newPosts = await this.$content()
        .skip(4)
        .limit(this.postCount)
        .sortBy("createdAt", "desc")
        .fetch();

      if (this.posts.length === newPosts.length) this.full = true;
      this.posts = newPosts;

      this.loading = false;
    },
  },
};
</script>