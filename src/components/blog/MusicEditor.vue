<template>
  <div>
    <v-card class="mx-auto" style="margin-bottom:1em;" tile>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title style="display:flex;" class="subtitle-1"
            >GÜNLÜK MÜZİK
            <small style="margin-left:.5em;"
              ><strong>/</strong> AA/GG/YYYYY</small
            >

            <div
              v-if="noSongToday"
              class="nosong"
              v-tippy="{ content: 'Bugün için seçilmiş müzik yok!' }"
            >
              <v-icon class="warn">mdi-information</v-icon>
            </div></v-list-item-title
          >

          <v-row>
            <v-col cols="12">
              <div
                class="song"
                v-for="item in $props.songs.slice(0, sliceAmount)"
                :key="item.url"
              >
                <v-chip tile color="primary" class="ma-2">
                  {{ formatDate(item.date) }}
                </v-chip>

                <v-chip class="ma-2">
                  >
                </v-chip>

                <v-chip
                  @click="redirect(`https://youtube.com/watch?v=${item.url}`)"
                  @click:close="
                    redirect(`https://youtube.com/watch?v=${item.url}`)
                  "
                  close
                  close-icon="mdi-open-in-new"
                  color="secondary"
                  class="ma-2"
                >
                  YouTube
                </v-chip>
              </div>

              <div style="text-align:center;padding-top:.5em;">
                <v-btn color="primary" small rounded @click="dialog = true"
                  >Ekle</v-btn
                >
                <v-btn small rounded @click="sliceAmount += 5"
                  >Daha Fazla Göster</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Yeni müzik ekle</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="fields.date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fields.date"
                      label="Müzik tarihi"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="tr"
                    v-model="fields.date"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >İptal</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(fields.date)"
                      >Tamam</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  @click:append-outer="addNewMusic"
                  v-model="fields.music"
                  append-outer-icon="mdi-check"
                  label="Müzik bağlantısı"
                  ref="link"
                  hint="Linkler otomatik olarak işlenecektir."
                ></v-text-field>
              </v-col>

              <div style="padding:0 .5em;">
                <v-chip
                  v-for="item in willAddSongs"
                  :key="item.url"
                  @click="redirect(`https://youtube.com/watch?v=${item.url}`)"
                  @click:close="remove(item.date)"
                  close
                  close-icon="mdi-close"
                  color="primary"
                  class="ma-2"
                >
                  {{ item.date }} - YouTube
                </v-chip>
              </div>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="dialog = false"
            >Kapat</v-btn
          >
          <v-btn color="blue darken-1" text @click="save">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar">
      {{ message }}
      <v-btn color="pink" text @click="snackbar = false">Kapat</v-btn>
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
.nosong {
  right: 0;
  position: absolute;
  font-size: small;
  padding: 0 1.75em;
}

.song {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}
</style>

<script>
import axios from "axios";

export default {
  props: ["songs"],
  data() {
    return {
      snackbar: false,
      message: "",
      dialog: false,
      willAddSongs: [],
      menu: false,
      fields: {
        date: null,
        music: "",
      },
      noSongToday: !this.$props.songs.find(
        (i) =>
          i.date ==
          `${new Date().getMonth() +
            1}/${new Date().getDate()}/${new Date().getFullYear()}`
      ),
      sliceAmount: 5,
    };
  },
  mounted() {
    this.$props.songs.reverse();
  },
  methods: {
    formatDate(pureDate) {
      return pureDate
        .split("/")
        .map((i) => (i.length < 2 && i.length != 4 ? "0" + i : i))
        .join("/");
    },
    addNewMusic() {
      if (!this.fields.date || !this.fields.music) {
        this.message =
          "Lütfen alanların her ikisini de doldurduğunuza emin olun.";
        this.snackbar = true;
      } else {
        try {
          const url = new URL(this.fields.music);
          const song = url.searchParams.get("v");
          const split = this.fields.date.split("-");
          const date = `${
            split[1].startsWith("0") ? split[1].slice(1, 2) : split[1]
          }/${split[2].startsWith("0") ? split[2].slice(1, 2) : split[2]}/${
            split[0]
          }`;

          if (this.$props.songs.find((i) => i.url == song)) {
            this.$refs.link.reset();
            this.message =
              "Bu müzik daha önceki bir tarihte listeye eklenmiş. Tekrar ekleyemezsiniz.";
            this.snackbar = true;
          } else if (this.$props.songs.find((i) => i.date == date)) {
            this.fields.date = null;
            this.message =
              "Belirttiğiniz tarih için zaten seçilmiş bir müzik var, lütfen başka bir tarih seçin.";
            this.snackbar = true;
          } else if (this.willAddSongs.find((i) => i.url == song)) {
            this.$refs.link.reset();
            this.message =
              "Bu müziği zaten eklemişsiniz. Lütfen değişiklikleri kaydetmeyi unutmayın.";
            this.snackbar = true;
          } else if (this.willAddSongs.find((i) => i.date == date)) {
            this.fields.date = null;
            this.message =
              "Belirttiğiniz tarih için zaten bir müzik seçmişsiniz. Düzeltmek için silin ve tekrar ekleyin.";
            this.snackbar = true;
          } else {
            this.willAddSongs.push({ date: date, url: song });
            this.$refs.link.reset();
            this.fields.date = null;
          }
        } catch (err) {
          this.message = "Geçerli bir müzik bağlantısı girdiğinize emin olun.";
          this.snackbar = true;
        }
      }
    },
    remove(date) {
      this.willAddSongs = this.willAddSongs.filter((i) => i.date != date);
    },
    save() {
      if (this.willAddSongs.length < 1) {
        this.message = "Müziklerde herhangi bir değişik yapmamışsınız.";
        this.snackbar = true;
      } else {
        axios
          .post(`${process.env.apiBase}/dailySong/edit`, {
            data: this.willAddSongs,
            auth: this.$auth.user,
          })
          .then((res) => {
            if (!res.data.success) {
              this.message =
                "İstek gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
              this.snackbar = true;
            } else {
              alert("Değişiklikler başarıyla kaydedildi.");

              this.willAddSongs.forEach((item) => {
                this.$props.songs.push(item);
              });

              this.dialog = false;
              this.willAddSongs = {};
            }
          })
          .catch(() => {
            this.message =
              "İstek gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
            this.snackbar = true;
          });
      }
    },
    redirect(url) {
      window.open(url, "_blank").focus();
    },
  },
};
</script>
