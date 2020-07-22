<template>
  <div>
    <Breadcrumb />

    <Editor :post="post" type="edit" />
  </div>
</template>

<style scoped>
.darkText >>> .jodit_workplace {
  color: black !important;
}

.margin6px {
  margin-left: 6px;
}

@media only screen and (max-width: 600px) {
  .margin6px {
    margin-left: 0px;
  }

  .postSettings {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}
</style>

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
    const title =
        "Düzenle: " + this.post.title ? this.post.title : "Bilinmeyen",
      meta = [
        { hid: "og:site_name", name: "og:site_name", content: "eggsy.xyz - blog" },
        { name: "og:title", content: "Gönderi Düzenleme" },
        {
          hid: "og:description",
          name: "og:description",
          content: `EGGSY's Blog'daki "${
            this.post.title ? this.post.title : "Bilinmeyen"
          }" adlı gönderiyi düzenleme sayfası. Bu sayfa ile yazıyı güncelleyebilir, silebilir veya taslağa kaldırabilirsiniz.`
        },
        {
          hid: "description",
          name: "description",
          content: `EGGSY's Blog'daki "${
            this.post.title ? this.post.title : "Bilinmeyen"
          }" adlı gönderiyi düzenleme sayfası. Bu sayfa ile yazıyı güncelleyebilir, silebilir veya taslağa kaldırabilirsiniz.`
        },
        { name: "premid-details", content: "Editing a blog post:" },
        {
          name: "premid-state",
          content: this.post.title ? this.post.title : "Bilinmeyen"
        }
      ];

    return {
      title,
      meta
    };
  },
  async asyncData({ params, redirect, query, $auth }) {
    if (!$auth.loggedIn) return $auth.login("discord");
    else if ($auth.loggedIn && $auth.user.id) {
      try {
        let {
          data
        } = await axios.post(
          `${process.env.apiBase}/blog/post/${params.id}/edit`,
          { auth: $auth.user }
        );

        return {
          post: data
        };
      } catch (err) {
        error({ statusCode: 500 });
      }
    } else {
      redirect("/blog");
    }
  },
  methods: {
    save() {
      this.edited = false;

      if (
        this.$refs.form.validate() &&
        this.content &&
        this.content.length > 15
      ) {
        try {
          const object = {
            title: this.$refs.title.lazyValue,
            shortdesc: this.$refs.shortdesc.lazyValue,
            short_url: this.$refs.shortUrl.lazyValue,
            content: this.content,
            published: this.publishSwitch,
            author: {
              name: this.$auth.user.username,
              discordId: this.$auth.user.id
            },
            sidebar: this.sidebarSwitch,
            lastEdit: new Date().getTime(),
            tags: this.post.tags || null,
            images: {
              small: this.$refs.smallImage.lazyValue,
              large: this.$refs.largeImage.lazyValue,
              postImage:
                this.$refs.postImage && this.$refs.postImage.lazyValue
                  ? this.$refs.postImage.lazyValue
                  : null
            }
          };

          axios
            .post(`${process.env.apiBase}/blog/post/${this.post._id}/update`, {
              postId: this.post._id,
              auth: this.$auth.user,
              data: object
            })
            .then(res => {
              if (res.data && res.data && res.data.success == true) {
                this.edited = true;
              } else {
                this.message =
                  "Bilgileriniz gönderilirken bir hata oluştu. Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
                this.dialog = true;
              }
            })
            .catch(() => {
              this.message =
                "Bilgileriniz gönderilirken bir hata oluştu. Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
              this.dialog = true;
            });
        } catch (err) {
          this.message =
            "Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
          this.dialog = true;
        }
      } else {
        this.message =
          "Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
        this.dialog = true;
      }
    },
    del() {
      const yesNo = confirm(
        "Bu gönderiyi silmek istediğinize emin misiniz? Bu işlemin geri dönüşü yoktur."
      );
      if (yesNo) {
        axios
          .post(`${process.env.apiBase}/blog/posts/delete`, {
            auth: this.$auth.user,
            postId: this.post._id
          })
          .then(res => {
            if (res && res.data && res.data.success)
              return window.location.replace("/blog/yazar");
            else {
              this.message =
                "Gönderi silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
              this.dialog = true;
            }
          })
          .catch(() => {
            this.message =
              "Gönderi silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
            this.dialog = true;
          });
      }
    },
    addTag() {
      if (this.$refs.tag && this.$refs.tag.lazyValue != "") {
        this.post.tags.push(this.$refs.tag.lazyValue);
        this.$refs.tag.reset();
      } else {
        this.message =
          "Etiket eklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
        this.dialog = true;
      }
    },
    tagDelete(tag) {
      if (this.post.tags[tag]) {
        this.message =
          "Bu etiket daha önce eklenmiş. Aynı etiketten iki tane ekleyemezsiniz.";
        this.dialog = true;
      } else {
        this.post.tags = this.post.tags.filter(origTag => origTag !== tag);
      }
    }
  }
};
</script>