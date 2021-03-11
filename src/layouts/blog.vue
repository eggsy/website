<template>
  <v-app>
    <v-navigation-drawer
      v-if="$device.isMobile"
      v-model="drawer"
      temporary
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn disabled text>EGGSY's Blog</v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-text-field
        hide-details
        append-icon="mdi-magnify"
        placeholder="Gönderi ara..."
        clearable
        v-model="mobileSearch"
        :style="{ padding: '14px' }"
        @click:append="
          $router.push('/blog/gonderi/ara/' + encodeURIComponent(search))
        "
        @keydown.enter="
          $router.push('/blog/gonderi/ara/' + encodeURIComponent(mobileSearch))
        "
      ></v-text-field>
    </v-navigation-drawer>

    <v-app-bar dense app>
      <v-container
        :class="{ 'd-flex': true, 'mobile-container': $device.isMobile }"
      >
        <v-toolbar-items
          v-if="$device.isMobile"
          :style="{ width: '100%', height: '100%' }"
        >
          <v-spacer />
          <v-btn @click.stop="$router.push('/blog')" text>EGGSY's Blog</v-btn>
          <v-spacer />
        </v-toolbar-items>

        <v-toolbar-items v-else-if="!$device.isMobile">
          <v-btn
            @click="$router.push('/blog')"
            :style="{ backgroundColor: '#212121' }"
            >E</v-btn
          >
          <v-btn to="/blog" exact title="Blog Ana Sayfa" text>Ana Sayfa</v-btn>
          <v-btn to="/blog/gonderi/ara/linux" text>Linux</v-btn>
          <v-btn to="/blog/gonderi/ara/oyun" text>Oyun</v-btn>
          <v-btn to="/blog/gonderi/ara/video" text>Video</v-btn>
          <v-btn to="/blog/gonderi/ara/discord" text>Discord</v-btn>
        </v-toolbar-items>

        <v-spacer v-if="!$device.isMobile" />

        <v-text-field
          v-if="!$device.isMobile"
          @keydown.enter="
            $router.push('/blog/gonderi/ara/' + encodeURIComponent(search))
          "
          :style="{ maxWidth: '250px', alignItems: 'center' }"
          placeholder="Gönderi ara..."
          append-icon="mdi-magnify"
          v-model="search"
          hide-details
          clearable
        ></v-text-field>

        <v-btn
          href="https://eggsy.xyz/daily"
          v-if="!$device.isMobile"
          class="ml-2"
          icon
        >
          <v-icon>mdi-play</v-icon>
        </v-btn>

        <v-btn
          v-if="!$device.isMobile"
          to="/"
          v-tippy="{ content: 'Ana Siteye Dön' }"
          icon
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="mb-4">
      <v-container>
        <nuxt />
      </v-container>

      <v-btn
        @click.stop="drawer = !drawer"
        color="primary"
        v-if="$device.isMobile"
        bottom
        fixed
        right
        fab
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-main>

    <v-footer absolute app>
      <v-container class="d-flex">
        <span :style="{ alignSelf: 'center' }">
          EGGSY tarafından Vue
          <v-icon class="ml-1" left>mdi-heart</v-icon>Nuxt ile yapıldı. | &copy;
          2020 - Tüm hakları saklıdır.
        </span>

        <v-spacer />

        <v-btn
          small
          text
          class="goTop"
          v-tippy="{ content: 'Yukarı çık.' }"
          @click="scrollTop"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.music-player {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10vh 11vw 0 0;
}

.color-change {
  animation: colorChange 3s infinite;
}

.mobile-container {
  height: 100%;
  padding: 0;
}

@keyframes colorChange {
  50% {
    color: rgba(255, 255, 0, 1);
  }
}

@-webkit-keyframes colorChange {
  50% {
    color: rgba(255, 255, 0, 1);
  }
}
</style>

<script>
export default {
  data() {
    return {
      mobileSearch: "",
      search: "",
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          title: "Ana Sayfa",
          to: "/blog",
        },
        {
          icon: "mdi-discord",
          title: "Discord (Gönderileri)",
          to: "/blog/gonderi/ara/discord",
        },
        {
          icon: "mdi-play-circle",
          title: "Video",
          to: "/blog/gonderi/ara/video",
        },
        {
          icon: "mdi-gamepad-left",
          title: "Oyun",
          to: "/blog/gonderi/ara/oyun",
        },
        {
          icon: "mdi-linux",
          title: "Linux",
          to: "/blog/gonderi/ara/linux",
        },
        {
          icon: "mdi-exit-run",
          title: "Ana Siteye Dön",
          to: "/",
        },
      ],
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
