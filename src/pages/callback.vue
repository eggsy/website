<template></template>

<script>
export default {
  head() {
    return {
      title: "Authorization Required...",
      titleTemplate: "",
      meta: [
        { name: "og:title", content: "Authorization Required" },
        {
          hid: "og:description",
          name: "og:description",
          content:
            "The requested page requires authorization. We use Discord for all of our systems so you'll need to login with Discord to view this page!",
        },
        {
          hid: "description",
          name: "description",
          content:
            "The requested page requires authorization. We use Discord for all of our systems so you'll need to login with Discord to view this page!",
        },
        { name: "premid-details", content: "Viewing a page:" },
        { name: "premid-state", content: "Authorization" },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/callback",
        },
      ],
    };
  },
};
</script>