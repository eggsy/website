<template>
  <v-content>
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
  </v-content>
</template>

<style lang="scss" scoped>
.bottom {
  vertical-align: bottom;
}
</style>

<script>
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
        { name: "og:site_name", content: "eggsy.codes" },
        { name: "theme-color", content: "#212121" },
        {
          name: "og:title",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].name
              : "Redirecting to homepage"
          }`
        },
        {
          name: "og:description",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].description
              : "There is no description for this redirection yet, but it might be added at any time!"
          }`
        },
        {
          name: "og:image",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].image
              : ""
          }`
        },
        { name: "premid-details", content: "Redirecting to:" },
        {
          name: "premid-state",
          content: `${
            this.params.url && this.settings[this.params.url]
              ? this.settings[this.params.url].name
              : "Unknown redirect option"
          }`
        }
      ];

    return {
      title,
      meta
    };
  },
  data() {
    return {
      params: this.$route.params,
      settings: {
        "imgur-please": {
          name: "Imgur Please",
          description:
            "You can use this page to get redirected to my Chrome extension Imgur Please. An extension that replaces Imgur images from the document.",
          url: "https://github.com/eggsywashere/imgur-please",
          image: "https://eggsy.codes/images/projects/imgur-please.png"
        },
        "is-inside-me": {
          name: "is-inside.me",
          description:
            "This page will get you redirected to the our free file hosting service, is-inside.me!",
          url: "https://is-inside.me/?utm_source=eggsy.codes",
          image: "https://eggsy.codes/images/projects/is-inside-me.png"
        }
      }
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
  }
};
</script>
