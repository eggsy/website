<template>
  <div>
    <Breadcrumbs v-if="!$isMobile" />

    <v-row style="margin-top:30px;">
      <v-col class="col-12 col-md-8">
        <div class="panelheader">
          <h3 style="margin-top:4px;">Gönderi Kontrol Paneli</h3>

          <v-spacer />

          <v-btn to="/blog/gonderi/duzenle/yeni" text class="secondary">Yeni</v-btn>
        </div>

        <v-card style="margin-top:15px;cursor:pointer;">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Gönderi ara."
              dense
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="posts"
            :items-per-page="10"
            :search="search"
            @click:row="edit"
            class="elevation-1"
            no-results-text="Arama kriterine uygun gönderi bulunamadı."
          >
            <template v-slot:item.views="{ item }">
              <v-chip :color="getColor(item.views)" dark>
                {{
                item.views
                }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col class="col-6 col-md-4 otherFields">
        <v-card max-width="100%" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-img
                :lazy-src="
                  author.avatar
                    ? author.avatar
                    : '/images/blog/default-avatar.png'
                "
                :src="
                  author.avatar
                    ? author.avatar
                    : '/images/blog/default-avatar.png'
                "
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{
                author.name
                }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                author.discordId
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            :lazy-src="
              author.background
                ? author.background
                : '/images/blog/default-bg.jpg'
            "
            :src="
              author.background
                ? author.background
                : '/images/blog/default-bg.jpg'
            "
            height="194"
          ></v-img>

          <div v-if="editMode == false">
            <v-card-text>
              {{
              author.bio
              ? author.bio
              : "Biyografi ayarlanmamış. Ayarlamak için kalem işaretine tıklayabilirsiniz."
              }}
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-btn
                :to="'/blog/yazar/' + author.discordId"
                target="_blank"
                title="Yazar profilinizi görüntülemek için tıklayın."
                icon
              >
                <v-icon>mdi-link</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon
                  @click="
                    editMode = true;
                    edited = false;
                  "
                >mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </div>

          <div v-else-if="editMode">
            <v-form ref="form">
              <v-form ref="form" style="padding:14px">
                <v-text-field
                  ref="name"
                  outlined
                  dense
                  label="İsim"
                  @click:append="click('name')"
                  append-icon="mdi-discord"
                  clearable
                  @change="edited = false"
                />

                <v-textarea outlined label="Biyografi" ref="bio" />
                <v-text-field
                  ref="avatar"
                  outlined
                  dense
                  label="Avatar"
                  @click:append="click('avatar')"
                  @change="edited = false"
                  append-icon="mdi-discord"
                  clearable
                />

                <v-text-field
                  ref="background"
                  @click:append="click('background')"
                  @change="edited = false"
                  append-icon="mdi-undo-variant"
                  outlined
                  dense
                  label="Arka Plan"
                  clearable
                />

                <v-alert
                  dismissible
                  v-model="edited"
                  type="success"
                >Bilgileriniz başarıyla güncellendi.</v-alert>

                <v-row justify="space-between" class="mx-auto">
                  <v-btn style="margin-top:14px" @click="save" text class="secondary">Kaydet</v-btn>
                  <v-btn style="margin-top:14px" @click="editMode = false" text class="error">İptal</v-btn>
                </v-row>
              </v-form>
            </v-form>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>Hata</v-card-title>

        <v-card-text>{{ dialogMsg }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="$router.push('/blog')">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.panelheader {
  display: flex;
}

@media only screen and (max-width: 600px) {
  .panelheader {
    display: unset;
    text-align: center;
  }
  .otherFields {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>

<script>
import Breadcrumbs from "../../../components/blog/Breadcrumb";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    Breadcrumbs
  },
  layout: "blog",
  head: {
    title: "Yazar Kontrol Paneli",
    meta: [
      { name: "og:site_name", content: "eggsy.codes - blog" },
      { name: "og:title", content: "Yazar Kontrol Paneli" },
      {
        name: "og:description",
        content:
          "Yazarların EGGSY's Blog'da yazı yazabileceği, varolan yazılarını yönetebileceği ve diğer gerekli araçlara ulaşabileceği panel."
      },
      {
        name: "description",
        content:
          "Yazarların EGGSY's Blog'da yazı yazabileceği, varolan yazılarını yönetebileceği ve diğer gerekli araçlara ulaşabileceği panel."
      },
      { name: "premid-details", content: "Viewing a blog page:" },
      { name: "premid-state", content: "Author Dashboard" }
    ]
  },
  async asyncData({ $auth, redirect, error }) {
    if (!$auth.loggedIn) return redirect("/login");
    else if ($auth.loggedIn && $auth.user.id) {
      try {
        let { data } = await axios.get(
          `${process.env.apiBase}/blog/author/get/${$auth.user.id}`
        );

        if (data && data.success == true) {
          let timeString;

          let posts = [];
          for (let post in data.data.posts) {
            const date = moment(data.data.posts[post].date),
              now = moment(),
              diffMn = now.diff(date, "minutes"),
              diffHr = now.diff(date, "hours"),
              diffDy = now.diff(date, "days");

            if (diffHr <= 0 && diffMn == 0) timeString = `Fırından yeni çıktı!`;
            else if (diffMn < 60 && diffMn > 0)
              timeString = `${diffMn} dakika önce`;
            else if (diffHr < 24 && diffHr > 0)
              timeString = `${diffHr} saat önce`;
            else if (diffHr <= 48 && diffHr > 24) timeString = "Dün";
            else if (diffDy > 0 && diffDy < 15)
              timeString = `${diffDy} gün önce`;
            else timeString = `${date.format("DD/MM/YY HH:mm:SS")}`;

            const object = {
              title: data.data.posts[post].title
                ? data.data.posts[post].title
                : "Bilinmeyen",
              short_url: data.data.posts[post].short_url
                ? data.data.posts[post].short_url
                : data.data.posts[post]._id,
              author: $auth.user.username,
              date:
                data.data.posts[post].date && timeString
                  ? timeString
                  : "Geçersiz Tarih",
              published: data.data.posts[post].published ? "✅" : "⛔",
              views: data.data.posts[post].views || 0
            };

            posts.push(object);
          }

          return {
            headers: [
              { text: "👁", align: "left", value: "views" },
              {
                text: "Gönderi Adı",
                value: "title"
              },
              { text: "Yazar", value: "author" },
              { text: "Tarih", value: "date" },
              { text: "Durum", value: "published" }
            ],
            author: data.data.author,
            edited: false,
            dialog: false,
            search: "",
            dialogMsg: null,
            editMode: false,
            posts
          };
        } else {
          redirect("/blog");
        }
      } catch (err) {
        error({ statusCode: 500 });
      }
    } else {
      redirect("/blog");
    }
  },
  methods: {
    edit(that) {
      this.$router.push(`/blog/gonderi/duzenle/${that.short_url}`);
    },
    save() {
      let object = {};
      for (let ref in this.$refs) {
        this.$refs[ref] &&
        this.$refs[ref] !== "form" &&
        this.$refs[ref].lazyValue &&
        this.$refs[ref].lazyValue != ""
          ? (object[ref] = this.$refs[ref].lazyValue)
          : false;
      }

      if (Object.keys(object).length > 0) {
        axios
          .post("/api/blog/author/update", {
            auth: this.$auth.user,
            data: object
          })
          .then(res => {
            for (let thing in object) {
              this.author[thing] = object[thing];
            }
            this.edited = true;
          })
          .catch(() => {
            this.dialog = true;
            this.dialogMsg =
              "Bilgileriniz kaydedilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
          });
      }
    },
    click(type) {
      if (type == "avatar") {
        this.$refs.avatar.lazyValue = this.$auth.user.avatar
          ? `https://cdn.discordapp.com/avatars/${this.$auth.user.id}/${
              this.$auth.user.avatar
            }.${this.$auth.user.avatar.startsWith("a_") ? ".gif" : "png"}`
          : "";
      } else if (type == "name") {
        this.$refs.name.lazyValue = this.$auth.user.username
          ? this.$auth.user.username
          : "";
      } else if (type == "background") {
        this.$refs.background.lazyValue =
          "https://eggsy.codes/images/blog/default-bg.jpg";
      }
    },
    getColor(number) {
      if (number > 100) return "green";
      else if (number > 50 && number < 100) return "dark-green";
      else if (number > 20 && number < 50) return "secondary";
      else if (number < 20) return "error";
    }
  }
};
</script>
