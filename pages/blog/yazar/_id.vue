<template>
  <div>
    <div v-if="data.author.discordId">
      <v-img height="250px" :lazy-src="data.author.background" :src="data.author.background">
        <v-row align="center" justify="center" style="height:100%">
          <v-col class="text-center" cols="12">
            <v-avatar size="112">
              <v-img
                v-if="data.author.avatar"
                :lazy-src="data.author.avatar"
                :src="data.author.avatar"
                :alt="data.author.name"
              />
              <v-icon size="128px" v-else dark>mdi-account-circle</v-icon>
            </v-avatar>

            <div style="margin-top:8px">
              <h1 class="headline font-weight-thin">{{data.author.name}}</h1>
              <h4
                class="subheading"
              >{{data.author.bio ? data.author.bio : "Yazar henüz bir biyografi ayarlamamış."}}</h4>
            </div>

            <div v-if="data.author.badges.length > 0">
              <v-icon
                size="24px"
                style="margin-bottom:4px;"
                color="secondary"
                v-for="badge in data.author.badges"
                :key="badge"
                v-tippy="{
                  content: titler(badge),
                  placement: 'bottom'
                }"
              >mdi-{{badge}}</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-img>

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-timeline class="timeline" v-if="data.posts.length > 0">
          <v-timeline-item v-for="post in data.posts" :key="post._id">
            <template v-slot:icon>
              <v-avatar>
                <v-img :src="post.images.small || null" />
              </v-avatar>
            </template>
            <span
              slot="opposite"
            >{{ post.lastEdit ? getDate(post.lastEdit) + " (düzenlenme)" : getDate(post.date) }}</span>
            <v-card class="elevation-2">
              <v-card-title class="headline">
                <a
                  class="cardTitle"
                  title="Gönderiyi okumak için tıklayın."
                  @click="$router.push(`/blog/gonderi/${post.short_url ? post.short_url : post._id}`)"
                >{{ post.title }}</a>
              </v-card-title>
              <v-card-text class="cardText" v-html="post.shortdesc" />
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <div
          class="text-center"
          style="margin-top:14px;"
          v-else
        >Yazara ait herhangi bir yazı bulunamadı.</div>
      </v-lazy>
    </div>

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

<style scoped>
.timeline {
  margin-bottom: -20px;
}
.container {
  padding-bottom: 0px !important;
}

@media only screen and (max-width: 600px) {
  .timeline {
    margin-bottom: 0px;
  }

  .cardTitle {
    word-break: break-word;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .cardText {
    display: none;
  }
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  layout: "blog",
  auth: false,
  head() {
    const title = this.data.author.name
        ? `Yazar: ${this.data.author.name}`
        : "Bilinmeyen Yazar",
      meta = [
        { name: "og:site_name", content: "eggsy.codes - blog" },
        {
          name: "og:title",
          content: this.data.author.name
            ? `Yazar: ${this.data.author.name}`
            : "Bilinmeyen Yazar"
        },
        {
          name: "og:image",
          content:
            this.data.author.name && this.data.author.avatar
              ? this.data.author.avatar
              : "https://eggsy.codes/images/blog/default-avatar.png"
        },
        {
          name: "og:description",
          content: this.data.author.name
            ? `EGGSY's Blog'da ${this.data.author.name} adlı yazarın yazdığı yazılara ulaşmak için bu bağlantıya tıklayabilirsiniz.`
            : "Belirtilen bilgilerle blogda yeri olan herhangi bir yazar bulunamadı. Belki de kovulmuştur?"
        },
        {
          name: "description",
          content: this.data.author.name
            ? `EGGSY's Blog'da ${this.data.author.name} adlı yazarın yazdığı yazılara ulaşmak için bu bağlantıya tıklayabilirsiniz.`
            : "Belirtilen bilgilerle blogda yeri olan herhangi bir yazar bulunamadı. Belki de kovulmuştur?"
        },
        { name: "premid-details", content: "Viewing a blog author:" },
        {
          name: "premid-state",
          content: this.data.author.name ? this.data.author.name : "Unknown"
        }
      ],
      link = [
        {
          rel: "canonical",
          href: `https://eggsy.codes/blog/yazar/${
            this.data.author.name && this.data.author.discordId
              ? this.data.author.discordId
              : "162969778699501569"
          }`
        }
      ];

    return {
      title,
      meta,
      link
    };
  },
  async asyncData({ params, redirect }) {
    if (params.id) {
      try {
        let { data } = await axios.get(
          `${process.env.apiBase}/blog/author/get/${params.id}`
        );

        data.data.posts = data.data.posts.filter(
          post => post.published === true
        );

        return {
          data: data.data,
          dialog: false,
          dialogMsg: null,
          isActive: false
        };
      } catch (err) {
        return {
          data: { author: { name: null } },
          isActive: false,
          dialog: true,
          dialogMsg:
            "Aradığınız yazara ait herhangi bir bilgi bulunamadı. Ana sayfaya yönlendirilmek için 'Tamam' butonuna tıklayabilirsiniz."
        };
      }
    } else {
      return {
        data: { author: { name: null } },
        isActive: false,
        dialog: true,
        dialogMsg:
          "Aradığınız yazara ait herhangi bir bilgi bulunamadı. Ana sayfaya yönlendirilmek için 'Tamam' butonuna tıklayabilirsiniz."
      };
    }
  },
  methods: {
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
    },
    titler(badge) {
      switch (badge) {
        case "crown":
          return "Kurucu";
          break;
        case "star":
          return "Özel Kişi";
          break;
        case "pencil": // This is not really needed but OK to have.
          return "Yazar";
          break;
        case "code-braces":
          return "Yazılımcı";
          break;
        default:
          return "Yazar";
          break;
      }
    }
  }
};
</script>