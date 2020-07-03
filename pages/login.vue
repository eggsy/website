<template></template>

<script>
export default {
  head() {
    return {
      title: "Authorization",
      titleTemplate: "",
       meta: [
        { name: "og:site_name", content: "eggsy.codes" },
        { name: "theme-color", content: "#212121" },
        { name: "og:title", content: "Authorization Required" },
        {
          name: "og:description",
          content:
            "The requested page requires authorization. We use Discord for all of our systems so you'll need to login with Discord to view this page!"
        },
        { name: "premid-details", content: "Viewing a page:" },
        { name: "premid-state", content: "Authorization" }
      ]
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push("/blog");
      return;
    }
    this.$auth.login("discord");
  }
};
</script>