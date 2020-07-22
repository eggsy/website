<template>
  <v-container class="text-center" fluid>
    <div v-if="errors[error.statusCode]">
      <v-icon style="font-size:125px;">mdi-skull-crossbones</v-icon>
      <h1>
        {{ $props.error.customMessage || errors[error.statusCode].shortname }}
      </h1>
      <span v-if="!$props.error.customMessage">{{
        errors[error.statusCode].description
      }}</span>
    </div>

    <div v-else>
      <h1>{{ errors[404].shortname }}</h1>
      <span>{{ errors[404].description }}</span>
    </div>

    <div style="margin-top:20px">
      <v-btn style="margin-right:4px" outlined @click="$router.back()"
        >Go Back</v-btn
      >
      <v-btn style="margin-right:4px" outlined to="/">Home page</v-btn>
      <v-btn outlined @click="reload">Reload</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: "centered",
  head() {
    const title = this.errors[this.error.statusCode]
        ? this.errors[this.error.statusCode].shortname
        : "Error",
      meta = [
        {
          name: "og:title",
          content: this.errors[this.error.statusCode]
            ? this.errors[this.error.statusCode].shortname
            : "Error",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.errors[this.error.statusCode]
            ? this.errors[this.error.statusCode].description
            : "Oh well, seems like there was an error processing your request. You better find a different way!",
        },
        { name: "og:image", content: "https://eggsy.xyz/favicon.ico" },
        { name: "premid-details", content: "Uh oh, it's an error:" },
        {
          name: "premid-state",
          content: this.errors[this.error.statusCode]
            ? this.errors[this.error.statusCode].shortname
            : "Error",
        },
      ];

    return {
      title,
      meta,
    };
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errors: {
        400: {
          shortname: "Bad request",
          description: "Are you sure that thing you're looking for is here?",
        },
        401: {
          shortname: "Unauthorized",
          description: "Wowowow, where do you think your going?",
        },
        403: {
          shortname: "Forbidden",
          description: "Stop right there, calling the cops now!",
        },
        404: {
          shortname: "Page not found",
          description:
            "Wha... what!? I swear it was here before, please don't leave me :(",
        },
        500: {
          shortname: "Internal server error",
          description:
            "Oh uh... It's something because of me. I'll try to fix this ASAP master. Please don't punish me.",
        },
      },
    };
  },
  methods: {
    reload() {
      location.reload();
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
  text-transform: uppercase;
}
</style>
