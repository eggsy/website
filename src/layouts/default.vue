<template>
  <v-app dark>
    <v-app-bar dense hide-on-scroll app>
      <v-container class="d-flex">
        <div class="logo">
          <nuxt-link to="/">eggsy.xyz</nuxt-link>
        </div>
        <v-spacer></v-spacer>
        <div>
          <small>always for the best</small>
        </div>
      </v-container>
    </v-app-bar>

    <v-container class="page">
      <nuxt />
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
.logo,
small {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.page {
  margin-top: 3em;
}

.logo a {
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  transition: color 0.2s;

  &:hover {
    color: rgba($color: #ffffff, $alpha: 0.75);
  }
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>