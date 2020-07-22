<template>
  <v-row>
    <v-col class="col-md-8 main">
      <header class="mx-auto" style="display:flex">
        <v-icon>mdi-magnify</v-icon>

        <h3 style="margin-left:4px;margin-top:2px;" v-if="posts.length == 0">
          <font color="primary">{{params.title}}</font> içeren başlığı bulunan herhangi bir gönderi bulunamadı.
        </h3>

        <h3 v-else style="margin-left:4px;margin-top:2px;">
          <font color="primary">{{params.title}}</font>
          arama sonucu gösteriliyor {{'(' + posts.length + ')'}}
        </h3>
      </header>

      <PostCard v-for="post in posts" :key="post._id" :post="post"></PostCard>
    </v-col>

    <v-col class="col-6 col-md-4 mobileFriendlySidebar">
      <Sidebar :songs="songs" :mostViewed="mostViewed" />
    </v-col>
  </v-row>
</template>

<style scoped>
.main {
  margin-top: 14px;
  max-width: 70%;
  margin-left: 10px;
}

.mobileFriendlySidebar {
  margin-left: -10px;
  margin-top: 16px;
}

@media only screen and (max-width: 600px) {
  .main {
    max-width: 100%;
    margin-left: 0px;
  }

  .share,
  .postDescription {
    display: none;
  }

  .mobileFriendlySidebar {
    margin-left: 0px;
    margin-top: 0px;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .headline {
    word-break: break-word;
    height: 100%;
  }
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import Sidebar from "../../../../components/blog/Sidebar";
import PostCard from "../../../../components/blog/PostCard";

export default {
  layout: "blog",
  components: {
    Sidebar,
    PostCard
  },
  auth: false,
  head() {
    const title = `Arama: ${this.params.title}`,
      meta = [
        { hid: "og:site_name", name: "og:site_name", content: "eggsy.xyz - blog" },
        {
          name: "og:title",
          content: `Arama: ${this.params.title}`
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `EGGSY's Blog'da "${this.params.title}" arama sayfası. Bu sayfadan aramanızın sonucunu görebilir ve varsa çıkan gönderileri okuyabilirsiniz.`
        },
        {
          hid: "description",
          name: "description",
          content: `EGGSY's Blog'da "${this.params.title}" arama sayfası. Bu sayfadan aramanızın sonucunu görebilir ve varsa çıkan gönderileri okuyabilirsiniz.`
        },
        { name: "premid-details", content: "Searching something in blog:" },
        { name: "premid-state", content: this.params.title }
      ];

    return {
      title,
      meta
    };
  },
  async asyncData({ params, redirect, error }) {
    if (params.title) {
      try {
        let { data } = await axios.get(
          `${process.env.apiBase}/blog/posts?type=search&title=${params.title}`
        );

        const mostViewed = await axios.get(
          `${process.env.apiBase}/blog/posts?type=views`
        );
        const songs = await axios.get(
          `${process.env.apiBase}/dailySong?full=true`
        );

        return {
          songs: songs?.data || [],
          mostViewed: mostViewed && mostViewed.data ? mostViewed.data : [],
          posts: data ? data : [],
          params
        };
      } catch (err) {
        error({ statusCode: 500 });
      }
    } else {
      redirect("/blog");
    }
  }
};
</script>
