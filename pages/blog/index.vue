<template>
  <main>
    <v-responsive class="overflow-y-auto" max-height="260px" v-if="posts">
      <v-row no-gutters>
        <v-hover
          v-for="(post, index) in posts.slice(0, galleryCount)"
          :key="post._id"
          :title="post.title"
        >
          <template v-slot:default="{ hover }">
            <v-card
              class="mx-auto post"
              :width="index == 0 ? '350px' : '250px'"
              :max-width="index == 0 ? '350px' : '250px'"
            >
              <v-img
                class="white--text align-end"
                height="250px"
                :lazy-src="
                  post.images && post.images.large
                    ? post.images.large
                    : '/no_image.png'
                "
                :src="
                  post.images && post.images.large
                    ? post.images.large
                    : '/no_image.png'
                "
              >
                <v-card-title>
                  <span
                    :style="
                      index != 0
                        ? 'text-overflow:ellipsis;white-space:nowrap;overflow:hidden;'
                        : 'text-align:center;word-break:break-word;'
                    "
                  >{{ post.title }}</span>
                </v-card-title>
              </v-img>

              <v-fade-transition>
                <v-overlay v-if="hover" style="z-index:unset;" absolute color="#000000">
                  <v-btn
                    icon
                    x-large
                    v-tippy="{ content: 'Devamını oku' }"
                    :to="
                      `/blog/gonderi/${
                        post.short_url ? post.short_url : post._id
                      }`
                    "
                  >
                    <v-icon>mdi-page-next</v-icon>
                  </v-btn>
                  <v-btn
                    @click="
                      favorite(post.short_url ? post.short_url : post._id)
                    "
                    icon
                    x-large
                    v-tippy="{ content: 'Favorilerime ekle' }"
                  >
                    <v-icon
                      v-if="
                        $store.state.posts.favorites.includes &&
                          $store.state.posts.favorites.includes(
                            `${post.short_url ? post.short_url : post._id}`
                          )
                      "
                      style="color:red;"
                    >mdi-heart</v-icon>
                    <v-icon v-else>mdi-heart-outline</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-row>
    </v-responsive>

    <v-lazy
      v-model="isActive"
      :options="{
        threshold: 0.5,
      }"
      min-height="200"
      transition="fade-transition"
    >
      <v-row>
        <v-col class="col-md-8 main">
          <header style="display:flex">
            <v-icon>mdi-newspaper</v-icon>
            <h3 style="margin-left:4px;margin-top:2px;">Gönderiler</h3>
          </header>

          <PostCard
            v-for="post in posts.slice(galleryCount, visiblePostCount)"
            :key="post._id"
            :post="post"
          ></PostCard>

          <center>
            <v-btn
              :disabled="loadMoreDisabled"
              :loading="btnLoading"
              @click="
                update();
                morePostsClicked = true;
              "
              style="margin-top:14px;margin-bottom:14px;"
              rounded
            >
              <span>
                <v-icon>mdi-reload</v-icon>
                {{ loadMore }}
              </span>
            </v-btn>
          </center>
        </v-col>

        <v-col class="col-md-4 mobileFriendlySidebar indexSidebar">
          <Sidebar :songs="songs" :mostViewed="mostViewed" />
        </v-col>
      </v-row>
    </v-lazy>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>Hata</v-card-title>

        <v-card-text>{{ dialogMsg }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$router.push('/')">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<style lang="scss" scoped>
.v-overlay-active {
  z-index: unset;
}

.post-title {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
}

.main {
  margin-top: 14px;
  max-width: 70%;
  margin-left: 10px;
}

.indexSidebar {
  margin-left: -10px;
  margin-top: 16px;
}

.post {
  margin-bottom: 10px;
}

@media only screen and (max-width: 600px) {
  .post {
    max-width: 100% !important;
    width: 100% !important;
  }

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
import BlogMixin from "../../components/mixins/blog";

export default {
  mixins: [BlogMixin],
  components: {
    Sidebar,
    PostCard
  },
  layout: "blog",
  auth: false,
  head: {
    title: "Blog",
    meta: [
      { name: "og:site_name", content: "eggsy.xyz - blog" },
      { name: "og:title", content: "EGGSY's Blog" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası. "
      },
      {
        hid: "description",
        name: "description",
        content:
          "EGGSY'nin günlük hayattan, tecrübelerinden bahsettiği, göstermek veya anlatmak istediği şeyleri daha düzenli ve profesyonel bir şekilde tuttuğu blog sayfası. "
      },
      { name: "premid-details", content: "Viewing a blog page:" },
      { name: "premid-state", content: "Homepage" }
    ]
  },
  async asyncData({ redirect, error }) {
    try {
      let { data } = await axios.get(
        `${process.env.apiBase}/blog/posts?type=content&skip=0&limit=10`
      );

      const mostViewed = await axios.get(
        `${process.env.apiBase}/blog/posts?type=views`
      );

      const songs = await axios.get(
        `${process.env.apiBase}/dailySong?full=true&verySecretToken=how-did-you-even-find-this-bro`
      );

      return {
        songs: songs.data || [],
        posts: data || [],
        visiblePostCount: 0,
        btnLoading: false,
        mostViewed: mostViewed.data || [],
        isActive: false,
        loadMore: "Daha Fazlasını Yükle",
        loadMoreDisabled: false,
        dialog: false,
        galleryCount: 4,
        dialogMsg: null,
        morePostsClicked: false
      };
    } catch (err) {
      error({
        statusCode: 500,
        customMessage: "Sunucu taraflı bir hata oluştu"
      });
    }
  },
  mounted() {
    if (window.innerWidth > 2000) {
      this.galleryCount = 5;
      this.visiblePostCount = 10;
    } else if (window.innerWidth < 1200 && window.innerWidth > 700) {
      this.galleryCount = 3;
      this.visiblePostCount = 8;
    } else if (window.innerWidth < 700) {
      this.galleryCount = 1;
      this.visiblePostCount = 6;
    } else {
      this.galleryCount = 4;
      this.visiblePostCount = 9;
    }

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        if (this.morePostsClicked) return;
        else if (window.innerWidth > 2000) {
          this.galleryCount = 5;
          this.visiblePostCount = 10;
        } else if (window.innerWidth < 1200 && window.innerWidth > 700) {
          this.galleryCount = 3;
          this.visiblePostCount = 8;
        } else if (window.innerWidth < 700) {
          this.galleryCount = 1;
          this.visiblePostCount = 6;
        } else if (this.innerWidth !== window.innerWidth) {
          this.galleryCount = 4;
          this.visiblePostCount = 9;
        }
      });
    });
  },
  methods: {
    update() {
      try {
        this.btnLoading = true;

        axios
          .get(
            `${process.env.apiBase}/blog/posts?type=content&skip=0&limit=${this
              .visiblePostCount + 5}`
          )
          .then(json => {
            if (json && json.data && this.posts.length != json.data.length) {
              this.posts = json && json.data ? json.data : [];
              this.visiblePostCount += 5;
              this.btnLoading = false;
            } else {
              this.loadMoreDisabled = true;
              this.btnLoading = false;
              this.loadMore = "Başka Gönderi Yok";
            }
          })
          .catch(() => {
            this.dialog = true;
            this.dialogMsg =
              "Gönderiler güncellenemiyor. Lütfen daha sonra tekrar deneyin.";
          });
      } catch (err) {
        this.dialog = true;
        this.dialogMsg =
          "Gönderiler güncellenemiyor. Lütfen daha sonra tekrar deneyin.";
      }
    },
    getDate(pureDate) {
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
    }
  }
};
</script>
