<template>
  <v-row no-gutters justify="center">
    <v-col cols="10">
      <center>
        <v-icon x-large class="mb-2">mdi-party-popper</v-icon>

        <div>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <span>
            {{
              `${replacedWho} thinks that ${replacedToWho} is ${
                replacedNotCute ? replacedNotCute : "super cute!"
              }`
            }}
          </span>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>

        <v-btn to="/" text rounded>Go to homepage</v-btn>
      </center>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "centered",
  head() {
    const title = `${this.replacedWho} thinks ${this.replacedToWho} is ${
        this.replacedNotCute ? this.replacedNotCute : "super cute!"
      }`,
      metaTitle = `Hey ${this.replacedToWho}, ${
        this.replacedWho
      } thinks that you're ${this.replacedNotCute || "super cute!"}`,
      metaDescription = `${this.replacedToWho} deserves all the ${
        this.replacedNotCute ? this.replacedNotCute + "ness" : "happiness"
      } on the entire planet ❤-❤`;

    const meta = [
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: null,
        },
        {
          hid: "theme-color",
          name: "theme-color",
          content: "#ff0000",
        },
        {
          hid: "description",
          name: "description",
          content: metaDescription,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: metaTitle,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: metaDescription,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: metaDescription,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: metaTitle,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "/images/projects/heart.png",
        },
        { name: "premid-details", content: "Viewing a compliment:" },
        {
          hid: "premid-state",
          name: "premid-state",
          content: title,
        },
      ],
      link = [
        {
          rel: "canonical",
          href: `https://eggsy.xyz/urecute/${this.$route.params.whoId}/${this.$route.params.toWho}`,
        },
      ];

    return {
      title,
      meta,
      link,
    };
  },
  data() {
    return {
      replacedWho: this.$route.params.whoId?.replace(/\+/g, " ") || "someone",
      replacedToWho: this.$route.params.toWho?.replace(/\+/g, " ") || "someone",
      replacedNotCute: this.$route.query.notCute?.replace(/\+/g, " "),
    };
  },
};
</script>
