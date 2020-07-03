export default {
  methods: {
    favorite(post) {
      if (!post) return false;

      const items = localStorage.getItem("favorite_posts");
      this.$store.commit("posts/favorite", post);

      if (!items) localStorage.setItem("favorite_posts", post);
      else if (items) {
        const array = items.split(",");

        if (array.includes(post)) {
          localStorage.setItem(
            "favorite_posts",
            array.filter((item) => item !== post).join(",")
          );
        } else if (!array.includes(post)) {
          array.push(post);
          localStorage.setItem("favorite_posts", array.join(","));
        }
      }
    },
  },
};
