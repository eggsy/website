<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="$route.push('/blog')" disabled text
              >EGGSY's Blog</v-btn
            >
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

        <v-list-item
          v-if="$auth.user && $auth.user.id == '162969778699501569'"
          to="/blog/admin"
        >
          <v-list-item-action>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Kontrol Paneli</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-text-field
        hide-details
        append-icon="mdi-magnify"
        placeholder="Gönderi ara..."
        clearable
        v-model="mobileSearch"
        style="padding:14px;"
        @click:append="
          $router.push('/blog/gonderi/ara/' + encodeURIComponent(search))
        "
        @keydown.enter="
          $router.push('/blog/gonderi/ara/' + encodeURIComponent(mobileSearch))
        "
      ></v-text-field>
    </v-navigation-drawer>

    <v-app-bar hide-on-scroll app>
      <v-app-bar-nav-icon class="drawer" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="title">
        <v-btn @click="$router.push('/blog')" outlined :disabled="btnDisabled"
          >EGGSY's Blog</v-btn
        >
      </v-toolbar-title>

      <v-toolbar-items class="appBar">
        <v-btn to="/blog" exact title="Blog Ana Sayfa" text>Ana Sayfa</v-btn>
        <v-btn to="/blog/etiket/linux" text>Linux</v-btn>
        <v-btn to="/blog/etiket/oyun" text>Oyun</v-btn>
        <v-btn to="/blog/etiket/video" text>Video</v-btn>
        <v-btn to="/blog/etiket/discord" text>Discord</v-btn>
        <v-btn to="/blog/favorilerim" text>Favorilerim</v-btn>
        <v-btn
          v-if="$auth.user && $auth.user.id == '162969778699501569'"
          to="/blog/admin"
          text
          >Kontrol Paneli</v-btn
        >
      </v-toolbar-items>

      <v-spacer />

      <v-text-field
        hide-details
        append-icon="mdi-magnify"
        class="search"
        placeholder="Gönderi ara..."
        clearable
        v-model="search"
        @keydown.enter="
          $router.push('/blog/gonderi/ara/' + encodeURIComponent(search))
        "
      ></v-text-field>
      <v-btn to="/" v-tippy="{ content: 'Ana Siteye Dön' }" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer absolute app>
      <span>
        EGGSY tarafından Vue
        <v-icon>mdi-heart</v-icon>
        Nuxt ile yapıldı. | &copy; 2020 - Tüm hakları saklıdır.
      </span>

      <v-fab-transition>
        <v-btn
          class="goTop"
          v-tippy="{ content: 'Yukarı çık.' }"
          @click="scrollTop"
          fab
          dark
          absolute
          right
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.v-overlay--active {
  z-index: 4 !important;
}

.goTop {
  position: absolute;
  bottom: 1em;
}

.drawer {
  display: none;
}

.search {
  max-width: 200px;
  margin-right: 4px;
}

.appBar {
  margin-left: 14px;
}

.title {
  padding-left: 0;
  margin-right: 10px;
}

.mobileNavBar {
  display: none;
}

@media only screen and (max-width: 600px) {
  .drawer {
    display: block;
  }

  .search,
  .appBar,
  .goTop {
    display: none;
  }

  .appBar {
    display: none;
  }

  .title {
    width: 100%;
    text-align: center;
    padding-left: 0;
  }

  .mobileNavBar {
    display: flex;
  }
}
</style>

<script>
export default {
  data() {
    return {
      mobileSearch: "",
      search: "",
      btnDisabled: true,
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          title: "Ana Sayfa",
          to: "/blog",
        },
        {
          icon: "mdi-star",
          title: "Favorilerim",
          to: "/blog/favorilerim",
        },
        {
          icon: "mdi-discord",
          title: "Discord (Gönderileri)",
          to: "/blog/etiket/discord",
        },
        {
          icon: "mdi-play-circle",
          title: "Video",
          to: "/blog/etiket/video",
        },
        {
          icon: "mdi-gamepad-left",
          title: "Oyun",
          to: "/blog/etiket/oyun",
        },
        {
          icon: "mdi-linux",
          title: "Linux",
          to: "/blog/etiket/linux",
        },
      ],
      title: "EGGSY's Blog",
    };
  },
  mounted() {
    if (window.innerWidth < 800) this.btnDisabled = false;
    else this.btnDisabled = true;

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        if (window.innerWidth < 800) this.btnDisabled = false;
        else this.btnDisabled = true;
      });
    });
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
