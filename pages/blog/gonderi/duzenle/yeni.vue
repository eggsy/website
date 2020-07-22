<template>
  <div>
    <Breadcrumb />

    <Editor :author="author" type="new" />
  </div>
</template>

<script>
import Breadcrumb from "../../../../components/blog/Breadcrumb";
import Editor from "../../../../components/blog/Editor";
import axios from "axios";

export default {
  layout: "blog",
  components: {
    Breadcrumb,
    Editor
  },
  head() {
    const title = "Yeni Gönderi Oluştur",
      meta = [
        { hid: "og:site_name", name: "og:site_name", content: "eggsy.xyz - blog" },
        { name: "og:title", content: "Yeni Gönderi Oluştur" },
        {
          hid: "og:description",
          name: "og:description",
          content: `EGGSY's Blog'da yeni bir gönderi oluşturma sayfası.`
        },
        {
          hid: "description",
          name: "description",
          content: `EGGSY's Blog'da yeni bir gönderi oluşturma sayfası.`
        },
        { name: "premid-details", content: "Viewing a blog page:" },
        { name: "premid-state", content: "Create a New Post" }
      ];

    return {
      title,
      meta
    };
  },
  async asyncData({ $auth, redirect, error }) {
    if (!$auth.loggedIn) return error({ statusCode: 401 });
    else if ($auth.loggedIn && $auth.user.id) {
      try {
        let { data } = await axios.get(
          `${process.env.apiBase}/blog/author/get/${$auth.user.id}`
        );

        if (data && data.success == true) return { author: data };
        else {
          error({ statusCode: 403 });
        }
      } catch (err) {
        error({ statusCode: 500 });
      }
    }
  }
};
</script>
