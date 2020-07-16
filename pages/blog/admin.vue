<template>
  <div>
    <Breadcrumbs v-if="!$isMobile" />

    <v-row style="margin-top:30px;">
      <v-col class="col-12 col-md-8">
        <div class="panelheader">
          <h3 style="margin-top:4px;">Gönderi Kontrol Paneli</h3>

          <v-spacer />

          <div class="mx-auto">
            <v-btn to="/blog/gonderi/duzenle/yeni" text class="secondary">Yeni</v-btn>
            <v-btn
              @click="commentSwitch = !commentSwitch"
              text
              class="primary"
            >{{ commentSwitch ? "Gönderiler" : "Yorumlar" }}</v-btn>
          </div>
        </div>

        <v-card style="margin-top:15px;cursor:pointer;" v-if="!commentSwitch">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Gönderi ara."
              dense
              single-line
              hide-details
              clearable
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

        <v-card style="margin-top:15px;cursor:pointer;" v-else-if="commentSwitch">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Yorum ara."
              dense
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="commentHeaders"
            :items="comments"
            :items-per-page="10"
            :search="search"
            @click:row="commentHandler"
            sort-by="comment.approved"
            class="elevation-1"
            no-results-text="Arama kriterine uygun yorum bulunamadı."
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
        <MusicEditor :songs="songs" />

        <v-tabs class="elevation-2" dark grow centered>
          <v-tabs-slider></v-tabs-slider>

          <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`">
            {{
            i == 1 ? "Yazarlar" : `${i == 2 ? "Yazar Ekle" : "Yazar Sil"}`
            }}
          </v-tab>

          <v-tab-item value="tab-1">
            <v-card flat tile>
              <v-treeview :items="items" activatable item-key="discordId" open-on-click>
                <template v-slot:prepend="{ item }">
                  <nuxt-link
                    style="text-decoration:none"
                    title="Gönderiyi görüntülemek için tıklayın."
                    :to="`/blog/gonderi/${item.short_url}`"
                  >{{ item.title }}</nuxt-link>
                </template>
              </v-treeview>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-2">
            <v-card flat tile>
              <v-form ref="form" style="padding:14px">
                <v-text-field
                  v-model="fields.name"
                  outlined
                  dense
                  label="İsim"
                  clearable
                  @change="done = false"
                  :rules="[(v) => !!v || 'Bu alan gereklidir!']"
                  required
                />

                <v-text-field
                  v-model="fields.id"
                  outlined
                  dense
                  label="Discord ID"
                  clearable
                  @change="done = false"
                  :rules="[(v) => !!v || 'Bu alan gereklidir!']"
                  required
                />

                <v-textarea
                  v-if="extraInformation"
                  outlined
                  label="Biyografi"
                  v-model="fields.bio"
                />
                <v-text-field
                  v-if="extraInformation"
                  v-model="fields.avatar"
                  outlined
                  dense
                  label="Avatar"
                  clearable
                />

                <v-alert dismissible v-model="done" type="success">Yazar başarıyla kaydedildi.</v-alert>

                <v-row justify="space-between" class="mx-auto">
                  <v-switch
                    v-model="extraInformation"
                    @change="done = false"
                    color="primary"
                    label="Diğer Bilgiler"
                  />
                  <v-btn style="margin-top:14px" @click="save" text class="secondary">Kaydet</v-btn>
                </v-row>
              </v-form>
            </v-card>
          </v-tab-item>

          <v-tab-item value="tab-3">
            <v-card flat tile style="padding:14px;">
              <v-autocomplete
                v-model="values"
                :items="authors.map((a) => a.name)"
                dense
                chips
                small-chips
                clearable
                label="Silinecek Yazarlar"
                multiple
                outlined
              />

              <v-row justify="space-between" class="mx-auto">
                <v-switch v-model="areYouSure" color="primary" label="Emin misiniz?" />
                <v-btn style="margin-top:14px" @click="del" text class="secondary">Sil</v-btn>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>Hata</v-card-title>

        <v-card-text>{{ dialogMsg }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="commentEdit" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>Yorum Kontrolleri</v-card-title>

        <v-card-text>
          <v-row class="mx-auto" justify="space-between">
            <div>
              <v-icon title="Yorum yapılan gönderi.">mdi-newspaper</v-icon>
              <nuxt-link
                style="text-decoration:none"
                target="_blank"
                :to="
                  Object.keys(selectedComment).length > 0
                    ? '/blog/gonderi/' + selectedComment.postShortName
                    : ''
                "
                v-html="
                  Object.keys(selectedComment).length > 0
                    ? selectedComment.postTitle
                    : 'Yanlış bir şeylere mi bulaştın yoksa?'
                "
              />
            </div>
            <div>
              <v-icon title="Yorum tarihi.">mdi-calendar</v-icon>
              {{
              Object.keys(selectedComment).length > 0
              ? selectedComment.comment.date
              : "Yanlış bir şeylere mi bulaştın yoksa?"
              }}
            </div>
          </v-row>
          <br />
          <p>
            {{
            Object.keys(selectedComment).length > 0
            ? selectedComment.comment.content
            : "Yanlış bir şeylere mi bulaştın yoksa?"
            }}
          </p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="secondary" text @click="handleComment('delete')">Sil</v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            text
            v-if="
              Object.keys(selectedComment).length > 0 &&
                selectedComment.comment &&
                selectedComment.comment.approvedBool !== true
            "
            @click="handleComment('approve')"
          >Onayla</v-btn>
          <v-btn color="cyan" text v-else @click="handleComment('unapprove')">Onayı Kaldır</v-btn>
          <v-btn color="error" text @click="commentEdit = false">İptal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.nosong {
  right: 0;
  position: absolute;
  font-size: small;
  padding: 0 1.75em;
}

.panelheader {
  display: flex;
}

.song {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
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
import Breadcrumbs from "../../components/blog/Breadcrumb";
import MusicEditor from "../../components/blog/MusicEditor";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    Breadcrumbs,
    MusicEditor
  },
  layout: "blog",
  head: {
    title: "Blog Yönetimi",
    meta: [
      { name: "og:site_name", content: "eggsy.codes - blog" },
      { name: "og:title", content: "Blog Yönetimi" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Buradan EGGSY's Blog'undaki yazıları yönetebilir, yeni yazılar ekleyebilir ve blog için gerekli diğer ayarlamaları yapabilirsiniz."
      },
      {
        hid: "description",
        name: "description",
        content:
          "Buradan EGGSY's Blog'undaki yazıları yönetebilir, yeni yazılar ekleyebilir ve blog için gerekli diğer ayarlamaları yapabilirsiniz."
      },
      { name: "premid-details", content: "Viewing a blog page:" },
      { name: "premid-state", content: "Dashboard" }
    ]
  },
  async asyncData({ $auth, redirect, error }) {
    if (!$auth.loggedIn) return $auth.login("discord");
    else if ($auth.loggedIn && $auth.user.id != "162969778699501569")
      return error({ statusCode: 403 });
    else if ($auth.loggedIn && $auth.user.id == "162969778699501569") {
      function getDate(pureDate) {
        const date = moment(pureDate),
          now = moment(),
          diffMn = now.diff(date, "minutes"),
          diffHr = now.diff(date, "hours"),
          diffDy = now.diff(date, "days");

        let timeString;

        if (diffHr <= 0 && diffMn == 0) timeString = `Yeni`;
        else if (diffMn < 60 && diffMn > 0) timeString = `${diffMn} dakika`;
        else if (diffHr < 24 && diffHr > 0) timeString = `${diffHr} saat`;
        else if (diffHr <= 48 && diffHr > 24) timeString = "Dün";
        else if (diffDy > 0 && diffDy < 15) timeString = `${diffDy} gün`;
        else timeString = `${date.format("DD/MM/YY HH:mm:SS")}`;

        return timeString;
      }

      const headers = [
          { text: "👁", align: "left", value: "views" },
          {
            text: "Gönderi Adı",
            width: "55%",
            value: "title"
          },
          { text: "Yazar", value: "author" },
          { text: "Tarih", value: "date" },
          { text: "Durum", value: "published", align: "center" }
        ],
        commentHeaders = [
          { text: "Yorum İçeriği", width: "75%", value: "comment.content" },
          { text: "Tarih", value: "comment.date" },
          {
            text: "Durum",
            value: "comment.approved",
            align: "center"
          }
        ];

      try {
        let { data } = await axios.post(
          `${process.env.apiBase}/blog/admin/all`,
          {
            auth: $auth.user
          }
        );

        const songs = await axios.get(
          `${process.env.apiBase}/dailySong?full=true&verySecretToken=how-did-you-even-find-this-bro`
        );

        let timeString;

        let posts = [];
        for (let post in data.posts) {
          const object = {
            title: data.posts[post].title
              ? data.posts[post].title
              : "Geçersiz Başlık",
            short_url: data.posts[post].short_url
              ? data.posts[post].short_url
              : data.posts[post]._id,
            author:
              data.posts[post].author && data.posts[post].author.name
                ? data.posts[post].author.name
                : "Bilinmeyen Yazar",
            date: data.posts[post].date
              ? getDate(data.posts[post].date)
              : "Geçersiz Tarih",
            published: data.posts[post].published ? "✅" : "❌",
            views: data.posts[post].views || 0
          };

          posts.push(object);
        }

        /* Authors part */
        let items = [];
        data.authors.forEach(author => {
          const object = {
            name: author.name,
            children: posts.filter(post => post.author == author.name)
          };

          items.push(object);
        });
        /* !! Authors part !! */

        /* Comments part */
        let comments = [];
        data.posts.forEach(post => {
          post.comments.forEach(comment => {
            if (comment) {
              const object = {
                postTitle: post.title,
                postId: post._id,
                postShortName: post.short_url ? post.short_url : post._id,
                comment: {
                  content: comment.content,
                  approved:
                    comment.approved == false
                      ? "⛔"
                      : `${comment.approved == true ? "✅" : "❓"}`,
                  approvedBool:
                    comment.approved == false
                      ? false
                      : Boolean(comment.approved == true ? true : false),
                  pureDate: comment.date,
                  date:
                    getDate(comment.date) == "Fırından yeni çıktı!"
                      ? "Yeni"
                      : getDate(comment.date)
                }
              };

              comments.push(object);
            }
          });
        });

        comments.sort(function(a, b) {
          return new Date(b.comment.pureDate) - new Date(a.comment.pureDate);
        });

        /* !! Comments part !! */

        return {
          songs: songs.data,
          headers,
          commentHeaders,
          authors: data.authors,
          commentSwitch: false,
          comments,
          commentEdit: false,
          selectedComment: {},
          fields: {
            avatar: "",
            bio: "",
            name: "",
            id: ""
          },
          done: false,
          search: "",
          extraInformation: false,
          dialog: false,
          dialogMsg: null,
          areYouSure: false,
          values: [],
          items,
          posts
        };
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
      if (this.$refs.form.validate()) {
        try {
          const object = {
            name: this.fields.name,
            discordId: this.fields.id
          };

          if (this.extraInformation) {
            this.fields.bio ? (object["bio"] = this.fileds.bio) : false;
            this.fields.avatar
              ? (object["avatar"] = this.fields.avatar)
              : false;
          }

          if (Object.keys(object).length < 1) {
            this.dialogMsg =
              "Lütfen gerekli alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
            this.dialog = true;
          } else
            axios
              .post("/api/blog/author/new", {
                auth: this.$auth.user,
                data: object
              })
              .then(res => {
                if (
                  res &&
                  res.data &&
                  res.data.success &&
                  res.data.success == true
                ) {
                  this.items.push({ name: object.name, children: [] });
                  this.authors.push(object);
                  this.done = true;
                }
              })
              .catch(() => {
                this.dialogMsg =
                  "Form gönderilirken bir hata oluştu. Lütfen tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
                this.dialog = true;
              });
        } catch (err) {
          this.dialogMsg =
            "Form gönderilirken bir hata oluştu. Lütfen tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
          this.dialog = true;
        }
      } else {
        this.dialogMsg =
          "Form gönderilirken bir hata oluştu. Lütfen tüm alanları doldurduğunuzdan emin olun ve tekrar deneyin.";
        this.dialog = true;
      }
    },
    del() {
      if (!this.areYouSure) {
        this.dialogMsg =
          "Bu yazarları silmek istediğinize emin olduğunuzu belirtmek için 'Emin misiniz?' seçeneğini aktif edin ve tekrar deneyin. Unutmayın, bu işlemin geri dönüşü yoktur.";
        this.dialog = true;
      } else if (this.values.length < 1) {
        this.dialogMsg =
          "Silmek istediğiniz yazarları kutunun üstüne tıklayarak çıkan seçeneklerden seçmelisiniz.";
        this.dialog = true;
      } else {
        try {
          axios
            .post("/api/blog/authors/delete", {
              auth: this.$auth.user,
              authors: this.values
            })
            .then(res => {
              if (
                res &&
                res.data &&
                res.data.success &&
                res.data.success == true
              )
                window.location.reload();
              else {
                this.dialogMsg =
                  "Silme isteği gönderilirken hata oluştu. Lütfen daha sonra tekrar deneyin.";
                this.dialog = true;
              }
            })
            .catch(() => {
              this.dialogMsg =
                "Silme isteği gönderilirken hata oluştu. Lütfen daha sonra tekrar deneyin.";
              this.dialog = true;
            });
        } catch (err) {
          this.dialogMsg =
            "Silme isteği gönderilirken hata oluştu. Lütfen daha sonra tekrar deneyin.";
          this.dialog = true;
        }
      }
    },
    getColor(number) {
      if (number > 100) return "green";
      else if (number > 50 && number < 100) return "dark-green";
      else if (number > 20 && number < 50) return "secondary";
      else if (number < 20) return "error";
    },
    commentHandler(object) {
      this.selectedComment = object;
      this.commentEdit = true;
    },
    handleComment(type) {
      if (!type || Object.keys(this.selectedComment) < 1) return;
      else if (type == "delete") {
        axios
          .post("/api/blog/comment?type=delete", {
            auth: this.$auth.user,
            data: this.selectedComment
          })
          .then(res => {
            this.comments = this.comments.filter(
              c => c != this.selectedComment
            );
            this.commentEdit = false;
            this.selectedComment = {};
          })
          .catch(() => {
            this.selectedComment = {};
            this.commentEdit = false;

            this.dialogMsg =
              "Yorum silinirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
            this.dialog = true;
          });
      } else if (type == "approve") {
        axios
          .post("/api/blog/comment?type=approve", {
            auth: this.$auth.user,
            data: this.selectedComment
          })
          .then(res => {
            if (
              res &&
              res.data &&
              res.data.success &&
              res.data.success == true
            ) {
              this.comments.some(comment => {
                if (
                  comment.comment.content ==
                    this.selectedComment.comment.content &&
                  comment.comment.date == this.selectedComment.comment.date &&
                  comment.comment.approved ==
                    this.selectedComment.comment.approved &&
                  comment.postTitle == this.selectedComment.postTitle &&
                  comment.postShortName == this.selectedComment.postShortName
                ) {
                  comment.comment.approvedBool = true;
                  comment.comment.approved = "✅";

                  return true;
                }
              });

              this.selectedComment = {};
              this.commentEdit = false;
            } else {
              this.selectedComment = {};
              this.commentEdit = false;

              this.dialogMsg =
                "Yorum onaylanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
              this.dialog = true;
            }
          })
          .catch(() => {
            this.selectedComment = {};
            this.commentEdit = false;

            this.dialogMsg =
              "Yorum onaylanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
            this.dialog = true;
          });
      } else if (type == "unapprove") {
        axios
          .post("/api/blog/comment?type=unapprove", {
            auth: this.$auth.user,
            data: this.selectedComment
          })
          .then(res => {
            if (
              res &&
              res.data &&
              res.data.success &&
              res.data.success == true
            ) {
              this.comments.some(comment => {
                if (
                  comment.comment.content ==
                    this.selectedComment.comment.content &&
                  comment.comment.date == this.selectedComment.comment.date &&
                  comment.comment.approved ==
                    this.selectedComment.comment.approved &&
                  comment.postTitle == this.selectedComment.postTitle &&
                  comment.postShortName == this.selectedComment.postShortName
                ) {
                  comment.comment.approvedBool = false;
                  comment.comment.approved = "⛔";

                  return true;
                }
              });

              this.selectedComment = {};
              this.commentEdit = false;
            } else {
              this.selectedComment = {};
              this.commentEdit = false;

              this.dialogMsg =
                "Yorum onaylaması kaldırılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
              this.dialog = true;
            }
          })
          .catch(() => {
            this.selectedComment = {};
            this.commentEdit = false;

            this.dialogMsg =
              "Yorum onaylaması kaldırılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
            this.dialog = true;
          });
      }
    }
  }
};
</script>
