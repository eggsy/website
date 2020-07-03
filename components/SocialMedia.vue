<template>
  <div>
    <v-btn
      v-for="account in accounts"
      :key="account.icon"
      :href="account.url"
      @click="account.dialog ? (dialog = true) : false"
      v-tippy="{ content: account.name, placement: 'bottom' }"
      icon
      target="_blank"
    >
      <v-icon class="sclIcons" v-text="account.icon" />
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        {
          name: "Steam",
          url: "https://steamcommunity.com/id/eggsywashere",
          icon: "mdi-steam",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/eggsywashere",
          icon: "mdi-twitter",
        },
        {
          name: "Discord",
          url: "https://discordapp.com/users/162969778699501569",
          dialog: true,
          icon: "mdi-discord",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/eggsywashere",
          icon: "mdi-instagram",
        },
        {
          name: "GitHub",
          url: "https://github.com/eggsywashere",
          icon: "mdi-github",
        },
        { name: "Email", url: "mailto:apodes@live.com", icon: "mdi-email" },
      ],
    };
  },
};
</script>
