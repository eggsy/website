<template>
  <div>
    <div class="d-flex mt-6 mb-2">
      <v-icon left>mdi-magnify</v-icon>
      <h3>Sonuçlar</h3>
      <small class="ml-2 align-self-center" v-if="posts.length">({{ posts.length }} sonuç bulundu)</small>
    </div>

    <v-row no-gutters>
      <v-col md="8" sm="12">
        <p v-if="posts.length === 0">Aramanıza uygun sonuç bulunamadı.</p>
        
        <PostCard v-for="(post, index) in posts" :key="index" :post="post" />
      </v-col>

      <v-col md="4" sm="12" :cols="$device.isMobile ? '12' : null" class="pl-md-4">
        <Sidebar />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "blog",
  head() {
    const title = this.$route.params.title;
    const description = `${this.$route.params.title} arama sonuçları için bu sayfayı kullanın.`;

    return {
      title,
      meta: [
        {
          hid: "og:description",
          name: "og:description",
          content: description,
        },
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: title,
        },
      ],
    };
  },
  async asyncData({ $content, params }) {
    const foundByTitle = await $content()
      .search("title", params.title)
      .sortBy("createdAt", "desc")
      .fetch();

    const foundByTags = await $content()
      .where({ tags: { $contains: params.title } })
      .sortBy("createdAt", "desc")
      .fetch();

    const foundByDescription = await $content()
      .search("description", params.title)
      .sortBy("createdAt", "desc")
      .fetch();

    let posts = [...foundByTitle, ...foundByTags, ...foundByDescription];

    posts = posts.filter(
      (post, index, self) =>
        index === self.findIndex((p) => p.title === post.title)
    );

    return {
      posts,
    };
  },
};
</script>
