<template>
  <v-row style="margin-top:20px;" no-gutters>
    <v-col cols="2"></v-col>

    <v-col id="middle" cols="8">
      <div>
        <h1 class="font-weight-thin">PreMiD Stuff</h1>
        <span>Custom PreMiD works by EGGSY#3388</span>
      </div>

      <p style="margin-top:15px;">
        This is the homepage, most useless part of this whole thing. You may
        want to click on those buttons you see up there to navigate through
        "real" stuff!
      </p>

      <v-img
        src="/images/premid-logo.svg"
        lazy-src="/images/premid-logo.svg"
        aspect-ratio
        width="400px"
        style="margin-bottom:15px;"
      ></v-img>

      <div style="display:flex;">
        <SocialMedia />
        <v-btn
          target="_blank"
          href="https://premid.app"
          v-tippy="{ content: 'Visit PreMiD\'s website.', placement: 'bottom' }"
          icon
        >
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>

      <div style="margin-top:15px;">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn text to="/" exact outlined v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Go back to homepage</span>
        </v-tooltip>
      </div>
    </v-col>
    <v-col cols="2"></v-col>
  </v-row>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  #middle {
    max-width: 100%;
    width: 100%;
    padding: 8px;
  }
}
</style>

<script>
import SocialMedia from "../../../components/SocialMedia";

export default {
  layout: "premid",
  auth: false,
  components: {
    SocialMedia
  },
  head: {
    title: "PreMiD",
    meta: [
      { name: "og:site_name", content: "eggsy.codes" },
      { name: "theme-color", content: "#212121" },
      { name: "og:title", content: "PreMiD Stuff by EGGSY" },
      {
        name: "og:description",
        content:
          "Welcome to custom PreMiD 'stuff' made by EGGSY! You can find presence stats, sort them by usage/date or create your own metadata file using metadata creator easily!"
      },
      {
        name: "og:image",
        content: "https://premid.app/assets/images/logo.png"
      },
      { name: "premid-details", content: "Viewing a PreMiD page:" },
      { name: "premid-state", content: "Homepage" }
    ]
  },
  data() {
    return {
      dialog: false
    };
  },
  mounted() {
    const col = document.getElementById("middle");

    const interval = setInterval(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) &&
        col &&
        col.classList
      ) {
        col.classList.remove("col");
        col.classList.remove("col-8");
      } else if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) &&
        col &&
        col.classList &&
        !col.classList["col"] &&
        !col.classList["col-8"]
      ) {
        col.classList.add("col");
        col.classList.add("col-8");
      }

      if (interval && document.location.pathname !== "/projects/premid") {
        clearInterval(interval);
      }
    }, 100);
  }
};
</script>
