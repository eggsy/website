<template>
  <v-row no-gutters>
    <v-col cols="1"></v-col>

    <v-col cols="10">
      <center>
        <v-icon x-large style="margin-bottom:4px;">mdi-party-popper</v-icon>
        <div>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <span>
            {{ `${this.params.who_id ? this.params.who_id.replace(/\+/g, " ") : "someone"} thinks that ${
            this.params.toWho ? this.params.toWho.replace(/\+/g, " ") : "someone"
            } is ${this.query.notCute ? this.query.notCute.replace(/\+/g, " ") : "super cute!"}` }}
          </span>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>

        <v-btn to="/" text rounded>Go to homepage</v-btn>
      </center>
    </v-col>

    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
export default {
  layout: "centered",
  auth: false,
  head() {
    const title = `${
        this.params.who_id ? this.params.who_id.replace(/\+/g, " ") : "someone"
      } thinks ${this.params.toWho ? this.params.toWho : "someone"} is ${
        this.query.notCute ? this.query.notCute.replace(/\+/g, " ") : "cute"
      }`,
      meta = [
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
          hid: "og:title",
          name: "og:title",
          content: `Hey ${
            this.params.toWho
              ? this.params.toWho.replace(/\+/g, " ")
              : "someone"
          }, ${
            this.params.who_id
              ? this.params.who_id.replace(/\+/g, " ")
              : "someone"
          } thinks that you're ${
            this.query.notCute
              ? this.query.notCute.replace(/\+/g, " ")
              : "super cute!"
          }`,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: `${
            this.params.toWho
              ? this.params.toWho.replace(/\+/g, " ")
              : "someone"
          } deserves all the ${
            this.query.notCute
              ? this.query.notCute.replace(/\+/g, " ") + "ness"
              : "happiness"
          } on the entire planet ❤-❤`,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "/images/projects/heart.png",
        },
        {
          hid: "description",
          name: "description",
          content: `${
            this.params.toWho
              ? this.params.toWho.replace(/\+/g, " ")
              : "someone"
          } deserves all the ${
            this.query.notCute
              ? this.query.notCute.replace(/\+/g, " ") + "ness"
              : "happiness"
          } on the entire planet ❤-❤`,
        },
        { name: "premid-details", content: "Viewing a compliment:" },
        {
          hid: "premid-state",
          name: "premid-state",
          content: `${
            this.params.who_id
              ? this.params.who_id.replace(/\+/g, " ")
              : "someone"
          } thinks ${
            this.params.toWho
              ? this.params.toWho.replace(/\+/g, " ")
              : "someone"
          } is ${
            this.query.notCute ? this.query.notCute.replace(/\+/g, " ") : "cute"
          }`,
        },
      ],
      link = [
        {
          rel: "canonical",
          href: `https://eggsy.xyz/urecute/${this.params.who_id}/${this.params.toWho}`,
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
      query: this.$route.query,
      params: this.$route.params,
    };
  },
};
</script>
