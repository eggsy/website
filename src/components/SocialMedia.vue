<template>
  <div>
    <v-btn
      v-for="account in accounts.slice(0, $props.slice || accounts.length)"
      :key="account.icon"
      :href="account.url"
      v-tippy="{ content: account.name, placement: 'bottom' }"
      target="_blank"
      icon
    >
      <v-icon v-text="account.icon" />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["slice"],
  data() {
    return {
      accounts: [
        {
          name: "Steam",
          url: "https://steamcommunity.com/id/eggsydev",
          icon: "mdi-steam",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/eggsydev",
          icon: "mdi-twitter",
        },
        {
          name: "Discord",
          url: "https://eggsy.xyz/discord",
          icon: "mdi-discord",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/eggsy_dev",
          icon: "mdi-instagram",
        },
        {
          name: "GitHub",
          url: "https://github.com/eggsy",
          icon: "mdi-github",
        },
        {
          name: "Email",
          url: "mailto:eggsydev@gmail.com",
          icon: "mdi-email",
        },
      ],
    };
  },
};
</script>
