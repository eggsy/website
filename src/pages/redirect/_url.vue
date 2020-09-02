<template>
  <v-main>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card loading="secondary" class="elevation-12">
          <v-toolbar color="primary" flat>
            <v-toolbar-title>
              <v-btn small icon @click="$router.back()">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <span class="bottom">Redirecting</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span v-if="!params || !params.url || !settings[params.url]">
              We couldn't find the service you requested. You'll be redirected
              to the homepage instead. Please wait or click
              <a
                href="/"
              >here</a>.
            </span>

            <span v-else>
              You'll be redirected to the service you requested shortly. Please
              wait or click
              <a
                :href="settings[params.url] ? settings[params.url].url : '/'"
              >here</a>.
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<style lang="scss" scoped>
.bottom {
  vertical-align: bottom;
}
</style>

<script>
import moment from "moment";

export default {
  layout: "centered",
  auth: false,
  head() {
    const title = `${
        this.params.url && this.settings[this.params.url]
          ? this.settings[this.params.url].name
          : "Redirecting to homepage"
      }`,
      meta = [
        {
          hid: "og:title",
          name: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].description
              : "There is no description for this redirection yet, but it might be added at any time!"
          }`,
        },
        {
          name: "og:image",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].image
              : ""
          }`,
        },
        {
          hid: "description",
          name: "description",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].description
              : "There is no description for this redirection yet, but it might be added at any time!"
          }`,
        },
        { name: "premid-details", content: "Redirecting to:" },
        {
          name: "premid-state",
          content: title,
        },
      ],
      link = [
        {
          rel: "canonical",
          href: `https://eggsy.xyz/redirect/${this.params.url}`,
        },
      ];

    return {
      title,
      meta,
      link,
    };
  },
  async asyncData({ redirect, params, app }) {
    if (
      params.url.toLowerCase() === "dailysong" ||
      params.url.toLowerCase() === "daily-song"
    ) {
      const ref = app.$fireStore
        .collection("dailySongs")
        .doc(moment().format("DD.MM.YYYY"));

      const data = (await ref.get()).data();
      const url = data?.url || "dQw4w9WgXcQ";

      return redirect(`https://youtube.com/watch?v=${url}`);
    }
  },
  data() {
    return {
      params: this.$route.params,
      settings: {
        "imgur-please": {
          name: "Imgur Please",
          description:
            "You can use this page to get redirected to my Chrome extension Unblock Please. The extension which you can bypass Imgur and Pastebin blockages!",
          url: "https://github.com/eggsydev/unblock-please",
          image: "https://eggsy.xyz/images/projects/unblock-please.png",
        },
        "unblock-please": {
          name: "Unblock Please",
          description:
            "You can use this page to get redirected to my Chrome extension Unblock Please. The extension which you can bypass Imgur and Pastebin blockages!",
          url: "https://github.com/eggsydev/unblock-please",
          image: "https://eggsy.xyz/images/projects/unblock-please.png",
        },
        "is-inside-me": {
          name: "is-inside.me",
          description:
            "This page will get you redirected to the our free file hosting service, is-inside.me!",
          url: "https://is-inside.me/?utm_source=eggsy.xyz",
          image: "https://eggsy.xyz/images/projects/is-inside-me.png",
        },
        "discord-steam-verification": {
          name: "Discord Steam Verification",
          description:
            "Check your Discord server member's Steam library for a specific game and give them roles if they have it or punish them if they don't!",
          url: "https://github.com/eggsydev/discord-steam-verification",
          image: "",
        },
        "epey-bot": {
          name: "Epey Bot",
          description:
            "Access epey.com data directly from your Discord server!",
          url: "https://github.com/eggsydev/epey-bot",
          image: "",
        },
      },
    };
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  mounted() {
    this.timeout = setTimeout(() => {
      window.location.href = `${
        this.params && this.settings[this.params.url]
          ? this.settings[this.params.url].url
          : "/"
      }`;
    }, 5000);
  },
};
</script>
