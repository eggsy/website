<template>
  <v-row>
    <v-col class="col-md-8 main">
      <header class="mx-auto" style="display:flex">
        <v-icon>mdi-magnify</v-icon>

        <h3
          style="margin-left:4px;margin-top:2px;"
          v-if="
            posts.filter(post =>
              $store.state.posts.favorites.includes(
                `${post.short_url || post._id}`
              )
            ).length == 0
          "
        >Herhangi bir gönderi favorilerinize eklenmemiş.</h3>

        <h3 v-else style="margin-left:4px;margin-top:2px;">Favorileriniz</h3>
      </header>

      <PostCard
        v-for="post in posts.filter(post =>
          $store.state.posts.favorites.includes(`${post.short_url || post._id}`)
        )"
        :key="post._id"
        :post="post"
      ></PostCard>
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
import Sidebar from "../../components/blog/Sidebar";
import PostCard from "../../components/blog/PostCard";

export default {
  layout: "blog",
  components: {
    Sidebar,
    PostCard,
  },
  auth: false,
  head() {
    const title = "Favorilerim",
      meta = [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "eggsy.xyz - blog",
        },
        {
          name: "og:title",
          content: "Favorilerim",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `EGGSY's Blog'da beğendiğiniz veya daha sonra okumak için sakladığınız favori gönderilerinize ulaşabileceğiniz sayfa.`,
        },
        {
          hid: "description",
          name: "description",
          content: `EGGSY's Blog'da beğendiğiniz veya daha sonra okumak için sakladığınız favori gönderilerinize ulaşabileceğiniz sayfa.`,
        },
        { name: "premid-details", content: "Viewing a blog page:" },
        { name: "premid-state", content: "Favourites" },
      ],
      link = [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/blog/favorilerim",
        },
      ];

    return {
      title,
      meta,
      link,
    };
  },
  async asyncData({ redirect, error }) {
    try {
      const mostViewed = await axios.get(
          `${process.env.apiBase}/blog/posts?type=views`
        ),
        posts = await axios.get(
          `${process.env.apiBase}/blog/posts?type=content&skip=0&limit=100`
        );

      const songs = await axios.get(
        `${process.env.apiBase}/dailySong?full=true`
      );

      return {
        songs: songs?.data || [],
        mostViewed: mostViewed?.data || [],
        posts: posts?.data || [],
      };
    } catch (err) {
      error({ statusCode: 500 });
    }
  },
};
</script>
