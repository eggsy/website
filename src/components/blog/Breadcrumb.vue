<template>
  <v-breadcrumbs
    class="breadcrumb"
    :items="
      items.slice(
        0,
        this.items.indexOf(
          this.items.find((i) => i.to == $router.currentRoute.path)
        ) != -1
          ? this.items.indexOf(
              this.items.find((i) => i.to == $router.currentRoute.path)
            ) + 1
          : items.length + 1
      )
    "
    divider=">"
  ></v-breadcrumbs>
</template>

<style scoped>
.breadcrumb {
  position: absolute;
  top: 0px;
  left: 70px;
}

@media only screen and (max-width: 600px) {
  .breadcrumb {
    position: absolute;
    top: 0px;
    left: auto;
  }
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Blog Ana Sayfa",
          exact: true,
          to: "/blog",
        },
        {
          text: "Yönetim Paneli",
          exact: true,
          to: "/blog/admin",
        },
        {
          text: "Yazar Paneli",
          exact: true,
          to: "/blog/yazar",
        },
        {
          text: "Gönderi Düzenle",
          to: this.$router.currentRoute.path,
        },
      ],
    };
  },
};
</script>
