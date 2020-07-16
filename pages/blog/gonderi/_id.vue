<template>
  <div>
    <main v-if="!dialog">
      <v-card>
        <v-img
          alt="image"
          id="image"
          ref="image"
          height="250px"
          :lazy-src="
            postInfo.images && postInfo.images.postImage
              ? postInfo.images.postImage
              : postInfo.images.large
          "
          :src="
            postInfo.images && postInfo.images.postImage
              ? postInfo.images.postImage
              : postInfo.images.large
          "
        >
          <div style="position:absolute;right:0;margin:4px;display:grid;">
            <v-tooltip transition="scroll-x-reverse-transition" left>
              <template v-slot:activator="{ on }">
                <v-btn class="noMobile" icon>
                  <v-icon v-on="on">mdi-format-title</v-icon>
                </v-btn>
              </template>

              <span>{{ postInfo.title }}</span>
            </v-tooltip>

            <v-tooltip transition="scroll-x-reverse-transition" left>
              <template v-slot:activator="{ on }">
                <v-btn icon>
                  <v-icon v-on="on">mdi-eye</v-icon>
                </v-btn>
              </template>

              <span v-if="postInfo.views > 0">{{ postInfo.views }} görüntülenme</span>
            </v-tooltip>

            <v-menu
              :close-on-content-click="true"
              transition="scroll-x-reverse-transition"
              open-on-hover
              offset-x
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                  <v-icon v-if="copied == true">mdi-check</v-icon>
                  <v-icon v-else>mdi-share-variant</v-icon>
                </v-btn>
              </template>

              <div style="margin-right:8px;">
                <v-btn @click="share('twitter')" icon>
                  <v-icon style="color:#1ca0f1">mdi-twitter</v-icon>
                </v-btn>
                <v-btn @click="share('link')" icon>
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </div>
            </v-menu>

            <v-menu
              :close-on-content-click="false"
              transition="scroll-x-reverse-transition"
              open-on-hover
              offset-x
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon>
                  <v-icon>mdi-information</v-icon>
                </v-btn>
              </template>

              <v-card style="margin-right:12px;" max-width="50vh">
                <p style="padding:10px;">{{ postInfo.shortdesc }}</p>
              </v-card>
            </v-menu>
          </div>

          <v-card-title class="headline">
            <h3 class="font-weight-thin">{{ postInfo.title }}</h3>
          </v-card-title>

          <div class="smallInformation">
            <v-card-text>
              <div style="display:flex;width:100%;justify-content:center;max-width:100%">
                <div>
                  <v-btn
                    icon
                    title="Yazarın profiline gitmek için tıklayın."
                    :to="
                      postInfo.author.discordId
                        ? '/blog/yazar/' +
                          encodeURIComponent(postInfo.author.discordId)
                        : '/blog'
                    "
                    exact
                  >
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                  <span style="margin-top:2px;margin-left:4px;">
                    {{
                    postInfo.author.name
                    ? postInfo.author.name
                    : "Bilinmeyen Yazar"
                    }}
                  </span>
                </div>

                <div style="margin-left:20px">
                  <v-btn icon>
                    <v-tooltip bottom v-if="postInfo.lastEdit">
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-pencil</v-icon>
                      </template>
                      <v-icon>mdi-calendar</v-icon>
                      <span style="margin-top:2px;margin-left:4px;">
                        {{
                        getDate(postInfo.date)
                        }}
                      </span>
                    </v-tooltip>
                    <v-icon v-else>mdi-calendar</v-icon>
                  </v-btn>
                  <span
                    v-if="postInfo.lastEdit"
                    style="margin-top:2px;margin-left:4px;"
                  >{{ getDate(postInfo.lastEdit) }}</span>
                  <span v-else style="margin-top:2px;margin-left:4px;">
                    {{
                    getDate(postInfo.date)
                    }}
                  </span>
                </div>

                <div v-if="postInfo.tags.length > 0" style="margin-left:20px;">
                  <v-menu open-on-hover offset-y bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon v-if="postInfo.tags.length == 1">mdi-tag</v-icon>
                        <v-icon v-else-if="postInfo.tags.length > 1">mdi-tag-multiple</v-icon>
                      </v-btn>

                      <v-btn
                        color="transparent"
                        style="margin-left:4px;"
                        :title="
                          postInfo.tags[0] +
                            ' etiketli tüm gönderileri görmek için tıklayın.'
                        "
                        small
                        tile
                        :to="'/blog/etiket/' + postInfo.tags[0]"
                      >{{ postInfo.tags[0] }}</v-btn>
                    </template>

                    <div>
                      <v-btn
                        v-for="tag in postInfo.tags.slice(1)"
                        :key="tag"
                        style="margin-top:12px;margin-left:4px;"
                        :title="
                          tag +
                            ' etiketli tüm gönderileri görmek için tıklayın.'
                        "
                        small
                        tile
                        :to="'/blog/etiket/' + tag"
                      >{{ tag }}</v-btn>
                    </div>
                  </v-menu>
                </div>
                <div style="margin-left:20px;">
                  <v-btn
                    @click="favorite(`${postInfo.short_url || postInfo._id}`)"
                    v-tippy="{
                      content: $store.state.posts.favorites.includes(
                        `${postInfo.short_url || postInfo._id}`
                      )
                        ? 'Gönderiyi favorilerimden çıkar.'
                        : 'Gönderiyi favorilerime ekle.',
                    }"
                    icon
                  >
                    <v-icon
                      v-if="
                        $store.state.posts.favorites.includes(
                          `${postInfo.short_url || postInfo._id}`
                        )
                      "
                      style="color:red;"
                    >mdi-heart</v-icon>
                    <v-icon v-else>mdi-heart-outline</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </div>
        </v-img>
      </v-card>

      <v-row justify="space-around" class="authorInformation" v-if="$isMobile()">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn :to="'/blog/yazar/' + postInfo.author.discordId" icon>
              <v-icon v-on="on">mdi-account</v-icon>
            </v-btn>
          </template>
          <span>{{ postInfo.author.name }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-if="postInfo.lastEdit" v-on="on">mdi-pencil</v-icon>
            <v-icon v-else v-on="on">mdi-calendar</v-icon>
          </template>
          <span v-if="postInfo.lastEdit">{{ getDate(postInfo.lastEdit) }}</span>
          <span v-else>{{ getDate(postInfo.date) }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="postInfo.tags.length == 1">mdi-tag</v-icon>
            <v-icon
              v-on="on"
              v-else-if="postInfo.tags.length > 1"
              style="margin-left:20px;"
            >mdi-tag-multiple</v-icon>
          </template>
          <span v-for="(tag, index) in postInfo.tags" :key="tag" text>
            {{
            `${tag}${index + 1 == postInfo.tags.length ? "" : ", "}`
            }}
          </span>
          <span v-if="postInfo.tags.length == 0">Etiket Yok</span>
        </v-tooltip>

        <v-btn
          @click="favorite(`${postInfo.short_url || postInfo._id}`)"
          v-tippy="{
            content: $store.state.posts.favorites.includes(
              `${postInfo.short_url || postInfo._id}`
            )
              ? 'Gönderiyi favorilerimden çıkar.'
              : 'Gönderiyi favorilerime ekle.',
          }"
          icon
        >
          <v-icon
            v-if="
              $store.state.posts.favorites.includes(
                `${postInfo.short_url || postInfo._id}`
              )
            "
            style="color:red;"
          >mdi-heart</v-icon>
          <v-icon v-else>mdi-heart-outline</v-icon>
        </v-btn>
      </v-row>

      <v-row class="content">
        <v-col v-if="!sidebarEnabled" class="noSidebar">
          <div style="padding:16px;" v-html="postInfo.content" />
        </v-col>

        <v-col
          v-else
          class="col-md-8"
          style="height:100%;margin-top:15px;background-color:#212121;border-radius:10px"
        >
          <div class="contentDiv" v-html="postInfo.content" />
        </v-col>

        <v-col v-if="sidebarEnabled" class="mobileFriendlySidebar postSidebar col-md-4">
          <Sidebar :songs="songs" :mostViewed="mostViewed" />
        </v-col>
      </v-row>

      <CommentSection
        :postId="postInfo._id"
        :reactions="postInfo.reactions"
        :comments="postInfo.comments"
        style="margin-top:15px;"
      />
    </main>

    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>Hata</v-card-title>

        <v-card-text>{{ dialogMsg }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$router.push('/blog')">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.v-menu__content {
  box-shadow: none;
}

.smallInformation {
  width: 100%;
  max-width: 100%;
  position: absolute;
  bottom: 0;
  border: 1px black;
  border-top-right-radius: 10px;
}

#image {
  .headline {
    display: none;
  }
}

.content {
  margin-left: 0px;
}

.authorInformation {
  margin-top: 12px;
}

.noSidebar {
  max-width: 99%;
  width: 99%;
  margin-top: 15px;
  background-color: #212121;
  border-radius: 10px;
  height: 100%;
}

.postSidebar {
  margin-left: unset;
  margin-top: unset;
}

@media only screen and (max-width: 600px) {
  .noMobile {
    display: none;
  }

  #image {
    .headline {
      background-color: rgb(10, 10, 10, 0.5);
      word-break: break-word;
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: unset;
      text-align: center;
    }
  }

  .smallInformation {
    display: none;
  }

  .authorInformation {
    display: flex;
  }

  .content {
    max-width: 100%;
  }

  .noSidebar {
    max-width: 100%;
    width: 100%;
    margin-bottom: 24px;
  }

  .mobileFriendlySidebar {
    margin-left: 0px;
    margin-top: 0px;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .mobileFriendly {
    text-align: center;
    word-break: break-word;
  }
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import Sidebar from "../../../components/blog/Sidebar";
import CommentSection from "../../../components/blog/CommentSection";
import BlogMixin from "../../../components/mixins/blog";

export default {
  mixins: [BlogMixin],
  components: {
    Sidebar,
    CommentSection
  },
  layout: "blog",
  auth: false,
  head() {
    const title = this.postInfo.title,
      meta = [
        { name: "og:site_name", content: "eggsy.codes - blog" },
        {
          name: "og:url",
          content: `https://eggsy.codes/blog/gonderi/${this.postInfo
            .short_url || this.postInfo._id}`
        },
        {
          name: "og:title",
          content: this.postInfo.title || "Bilinmeyen Gönderi"
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
            this.postInfo.shortdesc ||
            "Böyle bir gönderi bulunamadı; lütfen gönderi bağlantısını kontrol edin ve hata devam ederse iletişime geçin."
        },
        {
          name: "og:image",
          content: this.postInfo.images.small || ""
        },
        {
          hid: "description",
          name: "description",
          content:
            this.postInfo.shortdesc ||
            "Böyle bir gönderi bulunamadı; lütfen gönderi bağlantısını kontrol edin ve hata devam ederse iletişime geçin."
        },
        {
          name: "premid-details",
          content: this.postInfo.title || "Bilinmeyen Gönderi"
        },
        {
          name: "premid-state",
          content:
            this.postInfo.title && this.postInfo.title != "Gönderi Bulunamadı"
              ? `${this.postInfo.author.name} - ${this.getDate(
                  this.postInfo.date
                )}`
              : "Unknown Post"
        },
        {
          name: "article:published-time",
          content: this.postInfo.date
        }
      ],
      link = [
        {
          rel: "canonical",
          href: `https://eggsy.codes/blog/gonderi/${this.postInfo.short_url ||
            this.postInfo._id}`
        }
      ];

    return {
      title,
      meta,
      link
    };
  },
  async asyncData({ params, redirect, store, error }) {
    try {
      let boolean = false;
      if (store.state.posts.read.includes(params.id)) boolean = true;

      let { data } = await axios.get(
        `${process.env.apiBase}/blog/posts?type=find&id=${params.id}&read=${boolean}`
      );

      const mostViewed = await axios.get(
        `${process.env.apiBase}/blog/posts?type=views`
      );

      const songs = await axios.get(
        `${process.env.apiBase}/dailySong?full=true&verySecretToken=how-did-you-even-find-this-bro`
      );

      return {
        mostViewed: mostViewed.data,
        postInfo: data,
        songs: songs.data || [],
        sidebarEnabled: data.sidebar,
        backupData: data,
        dialog: false,
        dialogMsg: null,
        copied: false,
        params
      };
    } catch (err) {
      error({ statusCode: 404, customMessage: "Gönderi Bulunamadı" });
    }
  },
  mounted() {
    if (!this.$store.state.posts.read.includes(this.params.id))
      this.$store.commit(
        "posts/add",
        this.postInfo.short_url ? this.postInfo.short_url : this.postInfo._id
      );

    if (
      window.innerWidth <= 600 &&
      this.postInfo.images.large &&
      this.postInfo.images.postImage
    ) {
      this.postInfo.images.postImage = this.postInfo.images.large;
    }

    setTimeout(() => {
      const element = document.querySelector(window.location.hash);

      if (window.location.hash && element) {
        const { x, y } = element.getBoundingClientRect();

        window.scrollTo(x, y);
      }
    }, 500);
  },
  methods: {
    share(platform) {
      let uri,
        text = `${this.postInfo.title} ▶ ${document.location.href}`;

      switch (platform) {
        case "twitter":
          uri =
            "https://twitter.com/intent/tweet?via=eggsywashere&text=" + text;
          window.open(uri, "Twitter", "width=350,height=500");
          break;
        case "link":
          let el = document.createElement("textarea");

          el.value = document.location.href;
          document.body.appendChild(el);

          el.select();

          document.execCommand("copy");
          document.body.removeChild(el);
          this.copied = true;

          setTimeout(() => {
            this.copied = false;
          }, 1500);
          break;
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
