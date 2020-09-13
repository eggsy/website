<template>
  <v-card
    @click="$router.push(`/blog/gonderi/${post.slug}`)"
    @click.middle="open(`/blog/gonderi/${post.slug}`)"
    class="my-2 post-card"
    ripple
  >
    <v-row no-gutters>
      <v-col cols="auto">
        <v-img
          class="card-image  hidden-sm-and-down"
          :lazy-src="post.image"
          :src="post.image"
        ></v-img>
      </v-col>

      <v-col :style="{ alignSelf: 'center' }">
        <v-card-title class="card-title">{{ post.title }}</v-card-title>
        <v-card-subtitle>{{ post.description }}</v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.post-card {
  flex: none;
  padding: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.2s;

  .card-title {
    padding: 0;
    margin: 16px;
    font-size: unset;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-image {
    width: 126px;
    height: 126px;
    border-radius: 4px;
  }

  &:hover {
    opacity: 0.75;
  }
}
</style>

<script>
export default {
  props: ["post"],
  methods: {
    open(url) {
      window.open(url, "_blank");
    },
  },
};
</script>
