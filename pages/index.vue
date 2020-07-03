<template>
  <v-container>
    <div class="container text-center">
      <h1>Getting ready....</h1>
      <span>We're working on our new look, please check back later.</span>
    </div>
  </v-container>
</template>

<script>
import Global from "../components/mixins/global";
import SocialMedia from "../components/SocialMedia";

export default {
  auth: false,
  layout: "centered",
  mixins: [Global],
  components: {
    SocialMedia
  },
  head: {
    title: "Homepage",
    meta: [
      { name: "og:site_name", content: "eggsy.codes" },
      { name: "theme-color", content: "#212121" },
      { name: "og:title", content: "EGGSY's Website" },
      {
        name: "og:description",
        content:
          "This is the heart of my projects; the place where I keep and host most of them! Make sure to check this out if you want to know more about me!"
      },
      { name: "premid-details", content: "Viewing a page:" },
      { name: "premid-state", content: "Homepage" }
    ]
  },
  data() {
    return {
      projects: [
        {
          title: "My Blog",
          image: "/images/projects/blog.png",
          to: "/blog",
          desc: "Read my stories! They're Turkish :v"
        },
        {
          title: "PreMiD Stuff",
          image: "/images/projects/premid-stuff.png",
          to: "/projects/premid",
          desc: "Find 'amazing' stuff about PreMiD!"
        },
        {
          title: "Overlay Creator",
          image: "/images/projects/overlay-creator.png",
          to: "/projects/overlay",
          desc: "Easy overlays for your Discord profile picture!"
        },
        {
          title: "is-inside.me",
          image: "/images/projects/is-inside-me.png",
          to: "/redirect/is-inside-me",
          desc: "Custom subdomain supported file hosting service!"
        },
        {
          title: "Imgur Please",
          image: "/images/projects/imgur-please.png",
          to: "/redirect/imgur-please",
          desc: "Unblock Imgur and its images!"
        }
      ]
    };
  }
};
</script>
