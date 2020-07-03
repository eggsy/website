<template>
  <v-form ref="form" v-model="valid" style="margin-top:30px;">
    <v-alert dismissible v-model="redirected" type="success">
      Gönderiniz başarıyla yayımlandı. Eğer isterseniz buradan düzenlemeler
      yapabilir veya gönderinizi görmek için
      <a
        target="_blank"
        :href="
          `/blog/gonderi/${
            this.$refs.shortUrl &&
            this.$refs.shortUrl.lazyValue &&
            this.params.id != this.$refs.shortUrl.lazyValue
              ? this.$refs.shortUrl.lazyValue
              : this.params.id
          }`
        "
        >buraya</a
      >
      tıklayabilirsiniz.
    </v-alert>
    <v-alert dismissible v-model="edited" type="success">
      Gönderiniz başarıyla düzenlendi.
      <span v-if="$props.post.publishSwitch">
        Gönderinize ulaşmak için
        <a
          target="_blank"
          :href="
            `/blog/gonderi/${
              this.$refs.shortUrl &&
              this.$refs.shortUrl.lazyValue &&
              this.params.id != this.$refs.shortUrl.lazyValue
                ? this.$refs.shortUrl.lazyValue
                : this.params.id
            }`
          "
          >buraya</a
        >
        tıklayabilirsiniz.
      </span>
    </v-alert>

    <v-row style="margin-top:15px;">
      <v-col class="col-12 col-md-8">
        <h3>
          {{
            $props.type == "edit" ? "Gönderi Düzenle" : "Yeni Gönderi Oluştur"
          }}
        </h3>
        <v-text-field
          style="margin-top:15px;"
          v-model="$props.post.title"
          solo
          label="Başlık"
          clearable
          :rules="[(v) => !!v || 'Bu alan gereklidir!']"
          required
        ></v-text-field>

        <div class="darkText">
          <jodit-vue v-model="$props.post.content" />
        </div>

        <v-row class="mx-auto" justify="space-between" style="margin-top:15px;">
          <v-text-field
            v-model="$props.post.images['small']"
            solo
            label="Küçük Resim (126x126)"
            :rules="[
              (v) => !!v || 'URL biçiminde yazılmalıdır.',
              (v) =>
                /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpg|gif|png|jpeg|webm))(?:\?([^#]*))?(?:#(.*))?/.test(
                  v
                ) || 'URL biçiminde yazılmalıdır.',
            ]"
            required
          ></v-text-field>

          <v-text-field
            class="margin6px"
            v-model="$props.post.images['large']"
            solo
            label="Büyük Resim (350x250)"
            :rules="[
              (v) => !!v || 'URL biçiminde yazılmalıdır.',
              (v) =>
                /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpg|gif|png|jpeg|webm))(?:\?([^#]*))?(?:#(.*))?/.test(
                  v
                ) || 'URL biçiminde yazılmalıdır.',
            ]"
            required
          ></v-text-field>

          <v-text-field
            class="margin6px"
            v-model="$props.post.images['postImage']"
            solo
            label="Gönderi İçi Resim (1280x250)"
          ></v-text-field>
        </v-row>
      </v-col>

      <v-col class="col-md-4 postSettings">
        <h3>Gönderi Seçenekleri</h3>

        <v-textarea
          style="margin-top:15px;"
          auto-grow
          solo
          row-height="30px"
          required
          :rules="[(v) => !!v || 'Bu alan gereklidir!']"
          v-model="$props.post.shortdesc"
          label="Kısa Açıklama"
        ></v-textarea>

        <div style="margin-bottom:24px;">
          <v-chip
            style="margin-right:4px;margin-bottom:4px;"
            v-for="tag in $props.post.tags"
            :key="tag"
            close-icon="mdi-close"
            @click:close="tagDelete(tag)"
            close
            pill
            color="primary"
          >
            <v-avatar left>
              <span class="white--text">{{
                tag.slice(0, 1).toUpperCase()
              }}</span>
            </v-avatar>
            {{ tag }}
          </v-chip>
        </div>

        <v-text-field
          @keydown.enter="addTag"
          v-model="fields.tag"
          ref="tag"
          solo
          label="Etiketler"
        />
        <v-text-field
          v-model="$props.post.short_url"
          solo
          clearable
          label="Kısa bağlantı."
        ></v-text-field>

        <v-row class="mx-auto" justify="space-between">
          <v-switch
            v-model="$props.post.published"
            color="primary"
            label="Yayımla"
          ></v-switch>
          <v-switch
            v-model="$props.post.sidebar"
            color="primary"
            label="Sidebar"
          ></v-switch>

          <div style="margin-top:16px">
            <v-btn raised @click="save" color="primary" :disabled="!valid"
              >Kaydet</v-btn
            >
            <v-btn
              v-if="$props.type == 'edit'"
              raised
              @click="del"
              color="secondary"
              >Sil</v-btn
            >
          </div>

          <a
            v-if="$props.type == 'edit' && $props.post.published"
            :href="'/blog/gonderi/' + params.id"
            >Gönderiyi görüntüle</a
          >
        </v-row>
      </v-col>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline" primary-title>Hata</v-card-title>

          <v-card-text>{{ message }}</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Tamam</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-form>
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
import axios from "axios";

export default {
  props: {
    post: {
      type: Object,
      default: function() {
        return {
          title: "",
          content: "",
          shortdesc: "",
          short_url: "",
          published: true,
          sidebar: true,
          author: {
            name: null,
            discordId: null,
          },
          tags: [],
          images: { small: null, large: null, postImage: null },
        };
      },
    },
    author: {
      type: Object,
      default: function() {
        return {
          name: null,
          discordId: null,
        };
      },
    },
    type: {
      type: String,
      default: "new",
    },
  },
  data() {
    return {
      valid: false,
      dialog: false,
      message: null,
      edited: false,
      params: this.$route.params,
      fields: {
        tag: "",
      },
      redirected:
        this.$route.query &&
        this.$route.query &&
        this.$route.query.success == "true",
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        this.message =
          "Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
        this.dialog = true;
      } else if (this.$props.type == "new") {
        const object = {
          title: this.$props.post.title,
          short_url: this.$props.post.short_url,
          shortdesc: this.$props.post.shortdesc,
          content: this.$props.post.content,
          published: this.$props.post.published,
          sidebar: this.$props.post.sidebar,
          author: {
            name: this.$auth.user.username,
            discordId: this.$auth.user.id,
          },
          date: new Date().getTime(),
          tags: this.$props.post.tags,
          images: {
            small: this.$props.post.images.small,
            large: this.$props.post.images.large,
            postImage: this.$props.post.images.postImage,
          },
        };

        axios
          .post(`${process.env.apiBase}/blog/posts/new`, {
            auth: this.$auth.user,
            data: object,
          })
          .then((res) => {
            if (res.data && res.data.success == true && res.data.itemId) {
              this.$router.push(`${res.data.itemId}?success=true`);
            } else {
              this.message =
                "Bilgileriniz gönderilirken bir hata oluştu. Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
              this.dialog = true;
            }
          })
          .catch((err) => {
            console.log(err);
            this.message =
              "Bilgileriniz gönderilirken bir hata oluştu. Lütfen kaydetmeden önce gerekli tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
            this.dialog = true;
          });
      } else if (this.$props.type == "edit") {
        this.edited = false;
        
        const object = {
          title: this.$props.post.title,
          short_url: this.$props.post.short_url,
          shortdesc: this.$props.post.shortdesc,
          content: this.$props.post.content,
          published: this.$props.post.published,
          sidebar: this.$props.post.sidebar,
          author: {
            name: this.$auth.user.username,
            discordId: this.$auth.user.id,
          },
          lastEdit: new Date().getTime(),
          tags: this.$props.post.tags,
          images: {
            small: this.$props.post.images.small,
            large: this.$props.post.images.large,
            postImage: this.$props.post.images.postImage,
          },
        };

        axios
          .post(`${process.env.apiBase}/blog/post/${this.post._id}/update`, {
            postId: this.$props.post._id,
            auth: this.$auth.user,
            data: object,
          })
          .then((res) => {
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
      }
    },
    del() {
      if (this.$props.type != "edit") return;

      const yesNo = confirm(
        "Bu gönderiyi silmek istediğinize emin misiniz? Bu işlemin geri dönüşü yoktur."
      );
      if (yesNo) {
        axios
          .post(`${process.env.apiBase}/blog/posts/delete`, {
            auth: this.$auth.user,
            postId: this.post._id,
          })
          .then((res) => {
            if (res && res.data && res.data.success)
              return this.$router.push("/blog/yazar");
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
      if (this.$props.post.tags.includes(this.fields.tag)) {
        this.message =
          "Bu etiket daha önce eklenmiş. Aynı etiketten iki tane ekleyemezsiniz.";
        this.dialog = true;
        this.$refs.tag.reset();
      } else if (this.fields.tag != "") {
        this.$props.post.tags.push(this.fields.tag);
        this.$refs.tag.reset();
      } else {
        this.message =
          "Etiket eklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.";
        this.dialog = true;
      }
    },
    tagDelete(tag) {
      this.$props.post.tags = this.$props.post.tags.filter(
        (origTag) => origTag !== tag
      );
    },
  },
};
</script>
