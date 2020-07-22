<template>
  <v-row>
    <v-col class="col-md-8 main">
      <header class="mx-auto" style="display:flex">
        <v-icon>mdi-tag</v-icon>

        <h3 style="margin-left:4px;margin-top:2px;" v-if="currentCount == 0">
          <font color="primary">{{ $route.params.name }}</font> etiketine sahip
          hiçbir gönderi bulunamadı.
        </h3>

        <h3 v-else style="margin-left:4px;margin-top:2px;">
          <font color="primary">{{ $route.params.name }}</font>
          etiketine sahip gönderiler {{ "(" + currentCount + ")" }}
        </h3>
      </header>

      <PostCard v-for="post in posts" :key="post._id" :post="post"></PostCard>

      <center>
        <v-btn
          v-if="currentCount >= 15"
          :loading="btnLoading"
          @click="more"
          style="margin-top:14px;margin-bottom:14px;"
          rounded
        >
          <v-icon>mdi-reload</v-icon>Daha Fazlasını Yükle
        </v-btn>
      </center>
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
import Sidebar from "../../../components/blog/Sidebar";
import PostCard from "../../../components/blog/PostCard";

export default {
  layout: "blog",
  auth: false,
  components: {
    Sidebar,
    PostCard,
  },
  head() {
    const title = "Etiket: " + this.params.name,
      meta = [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "eggsy.xyz - blog",
        },
        {
          name: "og:title",
          content: `EGGSY's Blog - "${this.params.name}" Etiketi`,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `EGGSY's Blog'da "${this.params.name}" etiketine sahip tüm gönderileri görebileceğiniz etiket profili sayfası.`,
        },
        {
          hid: "description",
          name: "description",
          content: `EGGSY's Blog'da "${this.params.name}" etiketine sahip tüm gönderileri görebileceğiniz etiket profili sayfası.`,
        },
        { name: "premid-details", content: "Viewing a blog page:" },
        { name: "premid-state", content: "Tag: " + this.params.name },
      ],
      link = [
        {
          rel: "canonical",
          href: `https://eggsy.xyz/blog/etiket/${this.params.name}`,
        },
      ];

    return {
      title,
      meta,
      link,
    };
  },
  async asyncData({ params }) {
    try {
      let { data } = await axios.get(
        `${process.env.apiBase}/blog/posts?type=tag&max=10&name=${
          params.name ? params.name.toLowerCase() : null
        }`
      );

      const mostViewed = await axios.get(
        `${process.env.apiBase}/blog/posts?type=views`
      );

      const songs = await axios.get(
        `${process.env.apiBase}/dailySong?full=true`
      );

      return {
        songs: songs?.data || [],
        mostViewed: mostViewed?.data || [],
        posts: data || [],
        currentCount: data?.length || 0,
        btnLoading: false,
        params,
      };
    } catch (err) {
      return {
        mostViewed: [],
        posts: [],
        currentCount: 0,
        btnLoading: false,
        params,
      };
    }
  },
  methods: {
    async more() {
      this.btnLoading = true;

      let { data } = await axios.get(
        `${process.env.apiBase}/blog/posts?type=tag&max=${
          this.currentCount + 5
        }&name=${params.name}`
      );

      this.posts = data ? data : [];
      this.currentCount += 5;
      this.btnLoading = false;
    },
  },
};
</script>
