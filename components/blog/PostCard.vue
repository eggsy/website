<template>
  <v-card style="margin-top:12px;">
    <div class="d-flex flex-no-wrap">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-avatar class="ma-3" size="125" tile>
            <v-img
              :lazy-src="
                post.images && post.images.small ? post.images.small : 'XXX'
              "
              :src="
                post.images && post.images.small ? post.images.small : 'XXX'
              "
            ></v-img>
            <v-fade-transition>
              <v-overlay
                v-if="hover"
                style="z-index:unset;"
                absolute
                color="#000000"
              >
                <nuxt-link
                  :to="
                    `/blog/gonderi/${
                      post.short_url ? post.short_url : post._id
                    }`
                  "
                >
                  <v-btn title="Gönderiyi okumak için tıklayın" icon>
                    <v-icon>mdi-page-next</v-icon>
                  </v-btn>
                </nuxt-link>
              </v-overlay>
            </v-fade-transition>
          </v-avatar>
        </template>
      </v-hover>

      <div style="width:100%">
        <nuxt-link
          :to="`/blog/gonderi/${post.short_url ? post.short_url : post._id}`"
          style="text-decoration:none;"
        >
          <v-card-title class="headline post-title">{{
            post.title
          }}</v-card-title>
        </nuxt-link>
        <v-card-text class="post-description" v-html="post.shortdesc" />
      </div>

      <v-card-actions class="actions">
        <v-btn
          @click="favorite(`${post.short_url || post._id}`)"
          v-tippy="{
            content: $store.state.posts.favorites.includes(
              `${post.short_url || post._id}`
            )
              ? 'Gönderiyi favorilerimden çıkar.'
              : 'Gönderiyi favorilerime ekle.',
          }"
          icon
        >
          <v-icon
            v-if="
              $store.state.posts.favorites.includes(
                `${post.short_url || post._id}`
              )
            "
            style="color:red;"
            >mdi-heart</v-icon
          >
          <v-icon v-else>mdi-heart-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.post-title {
  cursor: pointer;
  word-break: break-word;
  padding-bottom: 0px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
}

.post-description {
  padding-top: 8px;
}

@media only screen and (max-width: 600px) {
  .post-title {
    padding-top: 0px;
    height: 100%;
    vertical-align: middle;
  }

  .post-description,
  .actions {
    display: none;
  }
}
</style>

<script>
import BlogMixin from "../mixins/blog";
import moment from "moment";

export default {
  mixins: [BlogMixin],
  props: ["post"],
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
  },
};
</script>
