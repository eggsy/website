<template>
  <v-container>
    <v-row no-gutters>
      <v-col md="3" cols="12">
        <v-card class="mx-auto">
          <v-list flat>
            <v-list-item-group
              v-model="menu.selected"
              @change="updateRoute"
              color="primary"
              mandatory
            >
              <v-list-item v-for="(item, i) in menu.items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-if="item.name === 'Garsonlar'"
                  >Garsonlar ({{ garsons.length }})</v-list-item-title>

                  <v-list-item-title v-else>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <v-alert
          class="mt-4 mb-0"
          color="success darken-3"
          v-if="menu.selected === 1 && garsons.length"
        >Son eklenen: {{ lastGarsonAdded.name }}</v-alert>
      </v-col>

      <v-col class="ml-md-4 my-md-0 mt-4">
        <v-card class="mx-auto" v-if="menu.selected === 0">
          <div class="pt-6 px-6 pb-2" v-if="!loaded">Yükleniyor...</div>
          <div
            class="pt-6 pl-6 pb-2"
            v-else-if="!garsons.length"
          >Henüz garson eklememişsiniz. Yandaki menüden yeni garson ekleyebilirsiniz.</div>

          <v-text-field
            dense
            outlined
            class="mt-0 pt-4 ml-4 mr-4"
            v-if="garsons.length"
            v-model="search"
            @input="updatePage"
            append-icon="mdi-search"
            label="Garson ara"
            hide-details
          ></v-text-field>

          <div
            class="pl-4 pt-4 pr-4"
            v-if="loaded && garsons.length && !getGarsons.length"
          >Aradığınız garson bulunamadı.</div>

          <v-list>
            <v-list-item
              v-for="garson in getGarsons"
              :key="garson.name"
              @click="openGarsonModal(garson.name, $event)"
            >
              <v-list-item-icon class="star-icon" @click="star(garson.name)">
                <v-icon color="pink">{{ garson.starred ? "mdi-star" : "mdi-star-outline" }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ garson.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-pagination
              v-model="page"
              @input="updateRoute('pagination', $event)"
              v-if="getGarsonsLength > 10"
              :length="Math.ceil(getGarsonsLength / 10)"
            ></v-pagination>
          </v-list>
        </v-card>

        <v-card class="mx-auto" v-if="menu.selected === 1">
          <v-subheader class="pt-4">Garson Ekle</v-subheader>

          <v-row no-gutters class="pl-4 pr-4 pt-2 pb-6">
            <v-col md="6" cols="12" class="pr-md-2 pr-0">
              <v-text-field
                aria-autocomplete="false"
                outlined
                v-model="newGarson.name"
                label="İsim*"
                append-icon="mdi-account"
                required
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" class="pl-md-2 pl-0">
              <v-text-field
                aria-autocomplete="false"
                outlined
                v-model="newGarson.number"
                label="Telefon numarası"
                append-icon="mdi-phone"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="newGarson.about"
                outlined
                label="Garson notu"
                hint="Bu alana garson hakkındaki yorumlarınızı yazabilirsiniz. İsterseniz boş bırakabilirsiniz."
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-row no-gutters>
                <v-col md="2" cols="12" class="px-0">
                  <v-btn :block="$vuetify.breakpoint.name !== 'md'" @click="save()">
                    <v-icon left>mdi-content-save</v-icon>Kaydet
                  </v-btn>
                </v-col>

                <v-col md="2" cols="12" class="px-0">
                  <v-btn
                    :block="$vuetify.breakpoint.name !== 'md'"
                    class="ml-md-2 my-md-0 ml-0 my-2"
                    @click="newGarson = { name: '', about: '', number: '' }"
                  >
                    <v-icon left>mdi-delete</v-icon>Sıfırla
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mx-auto pb-4" v-if="menu.selected === 2">
          <v-subheader class="pt-4">Günlük Liste Çıkartıcı</v-subheader>

          <v-row justify="center" class="ml-1 mr-1 d-md-flex d-block">
            <v-col class="pb-0" md="3" cols="12">
              <v-dialog
                ref="dialog"
                v-model="newList.modal"
                :return-value.sync="newList.date"
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn block color="primary darken-2" v-bind="attrs" v-on="on">
                    <v-icon left>mdi-calendar</v-icon>
                    {{ newList.date ? `${new Date(newList.date).toLocaleString("tr-TR", { day: "numeric", weekday: "short", month: "numeric" })} ${newList.period.slice(0, 3)}` : "Tarih seçin" }}
                  </v-btn>
                </template>

                <v-date-picker
                  :first-day-of-week="1"
                  locale="tr-TR"
                  :events="getListedDates.array"
                  :event-color="getListedDates.colors"
                  show-current
                  v-model="newList.date"
                  scrollable
                >
                  <v-select
                    v-model="newList.period"
                    :items="['Sabah', 'Akşam']"
                    label="Dönem?"
                    class="ml-4 mr-2"
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="newList.date = ''; newList.modal = false; newList.period = 'Sabah'"
                  >İptal</v-btn>
                  <v-btn text color="primary" @click="saveDate()">Tamam</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col class="pb-0" md="4" cols="12">
              <v-btn
                :disabled="!newList.date || !garsons.length"
                @click="addRandomGarson()"
                block
                color="success darken-2"
              >
                <v-icon left>mdi-sync</v-icon>Rastgele Garson Ekle
              </v-btn>
            </v-col>

            <v-col class="pb-0" md="4" cols="12">
              <v-btn
                :disabled="!newList.date || !garsons.length"
                @click="addRandomGarson('starred')"
                block
                color="secondary darken-2"
              >
                <v-icon left>mdi-star</v-icon>Favorilerden R. Ekle
              </v-btn>
            </v-col>

            <v-col class="pb-md-2 pb-0" md="3" cols="12">
              <v-btn
                :disabled="!newList.date || !garsons.length || !newList.list.length"
                @click="saveNewGarsonList()"
                block
                color="success darken-2"
              >
                <v-icon left>mdi-content-save</v-icon>Listeyi Kaydet
              </v-btn>
            </v-col>

            <v-col class="pb-md-2 pb-0" md="3" cols="12">
              <v-btn
                :disabled="!newList.date || !garsons.length || !newList.list.length"
                @click="clearList()"
                block
                color="success darken-2"
              >
                <v-icon left>mdi-delete</v-icon>Listeyi Sıfırla
              </v-btn>
            </v-col>

            <v-col class="pb-md-2 pb-0" md="5" cols="12">
              <v-btn
                v-if="!newList.manualGarsonAdd"
                :disabled="!newList.date || !garsons.length"
                @click="newList.manualGarsonAdd = true"
                block
                color="success darken-2"
              >
                <v-icon left>mdi-account-plus</v-icon>El ile Garson Ekle
              </v-btn>

              <v-autocomplete
                v-else-if="newList.manualGarsonAdd"
                class="pt-0"
                autofocus
                multiple
                chips
                clearable
                small-chips
                no-data-text="Garson bulunamadı"
                @input="addManualGarson"
                v-model="newList.array"
                :items="filteredGarsons"
                color="white"
                item-text="name"
                placeholder="Garsonları seçin"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row no-gutters class="mt-md-2 mt-4">
            <v-col md="4" cols="12" v-for="(garson, i) in newList.list" :key="i">
              <v-card color="gray darken-3" class="ml-4 mr-4 mb-4" raised>
                <v-card-title>
                  <v-row justify="space-between" no-gutters>
                    <v-col class="garson-name" :title="garson.name">{{ garson.name }}</v-col>
                    <v-col cols="2">
                      <v-btn icon dense @click="removeGarson(i)">
                        <v-icon>mdi-window-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-subtitle>
                  <a v-if="garson.number" :href="`tel:${garson.number}`">{{ garson.number}}</a>
                  <span v-else>Telefon numarası yok</span>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mx-auto" v-if="menu.selected === 3">
          <v-subheader class="pt-4">
            Listeler
            <v-spacer />
            <v-btn icon dense @click="showButtons = !showButtons">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </v-subheader>

          <div v-if="!dailyLists.length" class="pb-4 ml-4 mr-4">Herhangi bir listeniz yok.</div>

          <v-card class="mx-auto" v-for="(list, i) in getOrderedLists" :key="i">
            <v-card-title class="d-md-flex d-block">
              <v-badge
                class="mx-sm-0 my-sm-2"
                color="primary"
                :content="String(list.garsons.length) + ' garson'"
                inline
                :style="{ wordBreak: 'break-word' }"
              >{{ `${new Date(list.date).toLocaleString("tr-TR", { year: "numeric", day: "numeric", month: "long", weekday: "short"})}. ${list.period}` }}</v-badge>
              <v-spacer />
              <div class="mt-md-0 mt-2" v-if="showButtons">
                <v-btn @click="editList(i)" class="mr-2" small dense color="primary darken-3">
                  <v-icon left>mdi-circle-edit-outline</v-icon>Listeyi Düzenle
                </v-btn>
                <v-btn @click="shareList(i)" small class="mr-2" dense color="secondary darken-3">
                  <v-icon left>mdi-share</v-icon>Listeyi Paylaş
                </v-btn>
                <v-btn @click="deleteList(i)" small dense color="error darken-2">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-title>

            <v-card-text>
              <v-chip
                class="mb-2 mr-1"
                color="primary darken-2"
                v-for="(garson, i) in list.garsons"
                :key="i"
                @click="openGarsonModal(garson.name)"
              >{{ garson.name }}</v-chip>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>

      <v-col class="ml-md-4 ml-0 mt-md-0 mt-4" v-if="menu.selected === 0">
        <v-alert dense text color="blue" class="mb-0">
          <ul>
            <li>Burada, eklediğiniz tüm garsonların bilgilerine ulaşabilirsiniz.</li>
            <li>Telefon numarası girdiğiniz garsonların telefon numarasına ve diğer bilgilerine ulaşmak için üzerlerine tıklayabilirsiniz.</li>
            <li>Favori garsonlarınızı yıldızlayarak her zaman listenin üstünde gözükmelerini sağlayabilirsiniz.</li>
            <li>Aşağıdaki butonları kullanarak geçerli listenin yedeğini kaydedebilir veya önceki kaydınızı yükleyebilirsiniz. Bunu her yeni garson alımından sonra yapmanız önerilir.</li>
          </ul>
        </v-alert>

        <v-row>
          <v-col>
            <v-btn block color="secondary darken-2" @click="importGarsons">
              <v-icon left>mdi-application-import</v-icon>
              <span>İçe Aktar</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block color="secondary darken-2" @click="exportGarsons">
              <v-icon left>mdi-application-export</v-icon>
              <span>Dışa Aktar</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar v-model="snack.enabled" :color="snack.color">
      {{ snack.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snack.enabled = false">Kapat</v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="dialog.enabled" persistent max-width="450">
      <v-card>
        <v-card-title class="headline">
          <span v-if="!editGarson.enabled">{{ dialog.garson.object.name }}</span>

          <v-text-field
            v-else-if="editGarson.enabled"
            v-model="editGarson.object.name"
            :placeholder="dialog.garson.object.name"
            class="mt-0 pt-0"
            dense
            label="İsmi girin"
            append-icon="mdi-dots-horizontal"
            @click:append="editGarson.object.name = dialog.garson.object.name"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer />
          <v-btn
            icon
            @click="star(dialog.garson.object.name); dialog.garson.object.starred = !dialog.garson.object.starred"
          >
            <v-icon
              :color="dialog.garson.object.starred ? 'pink' : 'default'"
            >{{ dialog.garson.object.starred ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
          </v-btn>

          <v-btn
            icon
            :disabled="!dialog.garson.object.number"
            @click="whatsLink(dialog.garson.object.number)"
          >
            <v-icon color="green">mdi-whatsapp</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row no-gutters class="mb-2">
            <v-col cols="1">
              <v-icon>mdi-calendar</v-icon>
            </v-col>

            <v-col class="ml-md-0 ml-2">
              <span v-if="dialog.garson.object.addedOn">
                Bu kişi
                <strong>{{ new Date(dialog.garson.object.addedOn).toLocaleString("tr-TR") }}</strong> tarihinde eklenmiş.
              </span>
              <span v-else>Eklenme tarihi mevcut değil.</span>
            </v-col>
          </v-row>

          <v-row no-gutters class="mb-6">
            <v-col cols="1">
              <v-icon>mdi-phone</v-icon>
            </v-col>

            <v-col class="ml-md-0 ml-2">
              <a
                v-if="dialog.garson.object.number && !editGarson.enabled"
                :href="`tel:${dialog.garson.object.number}`"
              >{{ dialog.garson.object.number }}</a>

              <v-text-field
                v-else-if="editGarson.enabled"
                v-model="editGarson.object.number"
                :placeholder="dialog.garson.object.number"
                class="mt-0 pt-0"
                dense
                label="Telefon numarası girin"
                append-icon="mdi-dots-horizontal"
                @click:append="editGarson.object.number = dialog.garson.object.number"
                single-line
                hide-details
              ></v-text-field>

              <span v-else>Telefon numarası girilmemiş.</span>
            </v-col>
          </v-row>

          <v-row no-gutters class="mb-4">
            <v-col cols="1">
              <v-icon>mdi-message-text</v-icon>
            </v-col>
            <v-col class="ml-md-0 ml-2">
              <h4>Hakkında</h4>
            </v-col>
          </v-row>

          <p
            v-if="!editGarson.enabled"
          >{{ dialog.garson.object.about || "Hakkında bilgisi girilmemiş." }}</p>

          <v-textarea
            v-else-if="editGarson.enabled"
            v-model="editGarson.object.about"
            rows="1"
            auto-grow
            dense
            class="mt-0"
            append-icon="mdi-dots-horizontal"
            @click:append="editGarson.object.about = dialog.garson.object.about"
            :placeholder="dialog.garson.object.about || 'Bir şeyler yazın.'"
          ></v-textarea>
        </v-card-text>

        <v-card-actions class="pl-4 pr-4">
          <v-btn
            color="secondary darken-3"
            text
            @click="fireGarson(dialog.garson.object)"
          >Çıkart/Kov</v-btn>

          <v-btn
            color="secondary darken-2"
            text
            @click="editGarson.enabled ? edit() : editGarson.enabled = true"
          >{{ editGarson.enabled ? "Kaydet" : "Düzenle" }}</v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="editGarson.enabled ? closeEdit() : dialog.enabled = false"
          >Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.star-icon {
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.garson-name {
  text-overflow: ellipsis;
  word-break: break-all;
  max-height: 2rem;
  overflow: hidden;
}
</style>

<script>
export default {
  auth: false,
  layout: "salon",
  head: {
    title: "Garson Listesi Çıkarıcı",
    meta: [
      { hid: "og:title", name: "og:title", content: "Garson Listesi Çıkarıcı" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Düğün salonları veya garson çalıştıran herhangi bir işyeri için hazırlanan, günlük sabah/akşam şeklinde gelişmiş garson listesi çıkarma sitesi.",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Düğün salonları veya garson çalıştıran herhangi bir işyeri için hazırlanan, günlük sabah/akşam şeklinde gelişmiş garson listesi çıkarma sitesi.",
      },
      { name: "premid-details", content: "Garson Listesi Çıkarıcı" },
    ],
    link: [
      {
        rel: "canonical",
        href: `https://eggsy.xyz/salon`,
      },
    ],
  },
  data() {
    return {
      loaded: false,
      page: Number(this.$route.query.page) || 1,
      search: this.$route.query.search || this.$route.query.q || "",
      dailyLists: [],
      showButtons: true,
      newGarson: {
        name: "",
        about: "",
        number: "",
      },
      editGarson: {
        enabled: false,
        object: {
          name: "",
          about: "",
          number: "",
        },
      },
      snack: {
        enabled: false,
        type: "error",
        message: "",
      },
      dialog: {
        enabled: false,
        garson: {
          object: {},
        },
      },
      newList: {
        period: "Sabah",
        manualGarsonAdd: false,
        date: null,
        modal: false,
        array: [],
        list: [],
      },
      garsons: [],
      menu: {
        selected: Number(this.$route.query.menu) - 1 || 0,
        items: [
          {
            name: "Garsonlar",
            icon: "mdi-account",
          },
          {
            name: "Garson Ekle",
            icon: "mdi-account-plus",
          },
          {
            name: "Günlük Liste",
            icon: "mdi-format-list-bulleted",
          },
          {
            name: "Listeler",
            icon: "mdi-format-list-checks",
          },
        ],
      },
    };
  },
  computed: {
    getGarsons() {
      const filteredGarsons = this.garsons
        .filter(
          (g) =>
            g.name?.toLowerCase().includes(this.search?.toLowerCase()) ||
            g.number?.toLowerCase().includes(this.search?.toLowerCase()) ||
            g.about?.toLowerCase().includes(this.search?.toLowerCase()) ||
            g.number
              ?.toLowerCase()
              .replace(/\s/g, "")
              .includes(this.search?.toLowerCase().replace(/\s/g, ""))
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => b.starred - a.starred);

      return filteredGarsons.slice(
        (this.page - 1) * 10,
        (this.page - 1) * 10 + 10
      );
    },
    getGarsonsLength() {
      return this.garsons.filter(
        (g) =>
          g.name?.toLowerCase().includes(this.search?.toLowerCase()) ||
          g.number?.toLowerCase().includes(this.search?.toLowerCase()) ||
          g.about?.toLowerCase().includes(this.search?.toLowerCase()) ||
          g.number
            ?.toLowerCase()
            .replace(/\s/g, "")
            .includes(this.search?.toLowerCase().replace(/\s/g, ""))
      ).length;
    },
    lastGarsonAdded() {
      return this.garsons
        .filter((g) => g.addedOn)
        .sort((a, b) => b.addedOn - a.addedOn)[0];
    },
    filteredGarsons() {
      return this.garsons.filter(
        (g) => !this.newList.list.find((gr) => gr.name === g.name)
      );
    },
    getListedDates() {
      const object = {};

      for (let i in this.dailyLists) {
        const list = this.dailyLists[i];
        object[list.date] = this.dailyLists
          .filter((l) => l.date === list.date)
          .map((l) => {
            if (l.period === "Sabah") return "primary";
            else return "orange";
          });
      }

      return {
        array: this.dailyLists.map((l) => l.date),
        colors: object,
      };
    },
    getOrderedLists() {
      return this.dailyLists.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.garsons = localStorage.getItem("garsonList")
      ? JSON.parse(localStorage.getItem("garsonList"))
      : [];

    this.dailyLists = localStorage.getItem("dailyGarsonList")
      ? JSON.parse(localStorage.getItem("dailyGarsonList"))
      : [];

    this.loaded = true;
  },
  methods: {
    save() {
      if (!this.newGarson.name) {
        this.snack.message = "İsim alanı boş bırakılamaz";
        this.snack.color = "error";
        this.snack.enabled = true;
      } else if (this.garsons.find((g) => g.name === this.newGarson.name)) {
        this.snack.message = "Bu isimde bir garson eklenmiş";
        this.snack.color = "error";
        this.snack.enabled = true;
      } else {
        const object = {
          name: this.newGarson.name,
          about: this.newGarson.about,
          number: this.newGarson.number,
          addedOn: Date.now(),
          starred: false,
        };

        const garsonList = localStorage.getItem("garsonList");

        if (!garsonList) {
          localStorage.setItem("garsonList", JSON.stringify([object]));
          this.garsons.push(object);

          this.snack.message = "İlk garson başarıyla eklendi";
          this.snack.color = "primary";
          this.snack.enabled = true;
        } else if (garsonList) {
          const garsons = JSON.parse(garsonList);
          garsons.push(object);

          localStorage.setItem("garsonList", JSON.stringify(garsons));
          this.garsons = garsons;

          this.snack.message = "Yeni garson başarıyla eklendi";
          this.snack.color = "primary";
          this.snack.enabled = true;
        }

        this.newGarson = {
          name: "",
          about: "",
          number: "",
        };
      }
    },
    edit() {
      const garson = this.garsons.find(
          (g) => g.name === this.dialog.garson.object.name
        ),
        garsonIndex = this.garsons.findIndex(
          (g) => g.name === this.dialog.garson.object.name
        );

      if (!garson || garsonIndex === -1) return;

      garson.name = this.editGarson.object.name || garson.name;
      garson.about = this.editGarson.object.about || garson.about;
      garson.number = this.editGarson.object.number || garson.number;

      const object = garson;
      this.garsons[garsonIndex] = object;
      localStorage.setItem("garsonList", JSON.stringify(this.garsons));

      this.dialog.garson.object = object;
      this.editGarson.enabled = false;
      this.editGarson.object = {
        name: "",
        about: "",
        number: "",
      };

      this.snack.color = "success darken-2";
      this.snack.message = "Garson düzenlendi";
      this.snack.enabled = true;
    },
    closeEdit() {
      this.editGarson.enabled = false;
      this.editGarson.object = {
        name: "",
        about: "",
        number: "",
      };
    },
    star(name) {
      const garson = this.garsons.find((g) => g.name === name);

      if (!garson) {
        this.snack.color = "error";
        this.snack.message = "Seçilen garson bulunamadı";
        this.snack.enabled = true;
      } else {
        const index = this.garsons.findIndex((g) => g.name === name);

        garson.starred = !garson.starred;
        this.garsons[index] = garson;
        localStorage.setItem("garsonList", JSON.stringify(this.garsons));

        if (garson.starred) {
          this.snack.color = "primary";
          this.snack.message = "Garson yıldızlandı";
          this.snack.enabled = true;
        }
      }
    },
    fireGarson(garsonObject) {
      const garson = this.garsons.filter((g) => g.name === garsonObject.name);

      if (!garson) {
        this.snack.color = "error";
        this.snack.message = "Böyle bir garson bulunamadı";
        this.snack.enabled = true;
      } else {
        const consent = confirm(
          `${garsonObject.name} (${garsonObject.number}) adlı garsonu kovmak istediğinize emin misiniz? Bu işlemin geri dönüşü yoktur.`
        );

        if (consent) {
          const newArray = this.garsons.filter(
            (g) => g.name !== garsonObject.name
          );

          localStorage.setItem("garsonList", JSON.stringify(newArray));
          this.garsons = newArray;

          this.snack.color = "success darken-2";
          this.snack.message = "Garson kovuldu";
          this.snack.enabled = true;

          this.dialog.enabled = false;
          this.dialog.garson.object = {};
        }
      }
    },
    openGarsonModal(garsonName, event) {
      if (event?.target?.classList?.contains("v-icon")) return;
      const garson = this.garsons.find((g) => g.name === garsonName);

      const tempGarson = { ...garson };

      if (!garson) {
        this.snack.color = "error";
        this.snack.message = "Seçilen garson bulunamadı";
        this.snack.enabled = true;
      } else {
        this.dialog.garson.object = tempGarson;
        this.dialog.enabled = true;
      }
    },
    exportGarsons() {
      const data =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify({
              exportDate: Date.now(),
              data: [...this.garsons],
            })
          ),
        element = document.createElement("a");

      element.setAttribute("href", data);
      element.setAttribute("download", "garson-listesi.json");
      element.click();
      element.remove();
    },
    importGarsons(file) {
      const element = document.createElement("input");

      element.type = "file";
      element.accept = "application/json";
      element.click();

      element.addEventListener("change", () =>
        this.importGarsonsFileListener(element)
      );
    },
    importGarsonsFileListener(element) {
      if (!element.files || !element.files[0]) return;

      const file = element.files[0];

      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (evt) => {
          if (!evt.target || !evt.target.result) return;

          const object = JSON.parse(evt.target.result);
          const consent = confirm(
            `${new Date(
              object.exportDate
            ).toLocaleString()} tarihli içerisinde ${
              object.data.length
            } adet garson kaydı içeren bu dosyayı içe aktarmak istediğinize emin misiniz? Bu, eski garson listesini silecektir ve geri dönüşü yoktur.`
          );

          if (consent) {
            localStorage.setItem("garsonList", JSON.stringify(object.data));
            this.garsons = object.data;
          }
        };

        reader.onerror = (err) => {
          console.error(err);

          this.snack.color = "error";
          this.snack.message = "Dosya okunamadı";
          this.snack.enabled = true;
        };
      }

      element.remove();
    },
    updatePage() {
      const returnInteger =
        Math.ceil(this.getGarsons.length / 10) === 0
          ? 1
          : Math.ceil(this.getGarsons.length / 10);

      this.search && this.page === 1
        ? false
        : this.search && this.page > returnInteger
        ? (this.page = returnInteger)
        : false;
    },
    updateRoute(menu, number) {
      if (menu === "pagination" && number)
        return this.$router.push({
          query: {
            menu: 1,
            page: number,
          },
        });

      this.$router.push({
        query: {
          menu: menu + 1,
        },
      });
    },
    addRandomGarson(type) {
      if (type === "starred") {
        if (!this.garsons.filter((g) => g.starred).length) {
          this.snack.color = "error darken-2";
          this.snack.message = "Hiç favori garsonunuz yok";
          this.snack.enabled = true;
        } else {
          const filtered = this.garsons.filter(
            (g) =>
              g.starred && !this.newList.list.find((gr) => gr.name === g.name)
          );

          if (!filtered.length) return;

          this.newList.list.push(
            filtered[Math.floor(Math.random() * filtered.length)]
          );
        }
      } else {
        const filtered = this.garsons.filter(
          (g) => !this.newList.list.find((gr) => gr.name === g.name)
        );

        if (!filtered.length) return;

        this.newList.list.push(
          filtered[Math.floor(Math.random() * filtered.length)]
        );
      }
    },
    removeGarson(index) {
      this.newList.list.splice(index, 1);
    },
    clearList() {
      const consent = confirm(
        "Listeyi sıfırlamak istediğinize emin misiniz? Bu işlemin geri dönüşü yoktur."
      );

      if (consent) {
        this.newList.list = [];

        this.snack.color = "success darken-2";
        this.snack.message = "Liste temizlendi";
        this.snack.enabled = true;
      }
    },
    addManualGarson(array) {
      array.forEach((item) =>
        this.newList.list.push(this.garsons.find((g) => g.name === item))
      );

      this.newList.array = [];
    },
    saveNewGarsonList() {
      const dailyGarsonLists = localStorage.getItem("dailyGarsonList");

      if (!dailyGarsonLists) {
        const object = [
          {
            date: this.newList.date,
            period: this.newList.period,
            garsons: [...this.newList.list],
          },
        ];

        this.dailyLists = object;
        localStorage.setItem(
          "dailyGarsonList",
          JSON.stringify(this.dailylists)
        );

        this.snack.color = "success darken-3";
        this.snack.message = "Liste kaydedildi";
        this.snack.enabled = true;
      } else {
        const objectList = JSON.parse(dailyGarsonLists);
        const found = objectList.find(
          (item) =>
            item.date === this.newList.date &&
            item.period === this.newList.period
        );

        if (!found) {
          objectList.push({
            date: this.newList.date,
            period: this.newList.period,
            garsons: [...this.newList.list],
          });

          this.dailyLists = objectList;
          localStorage.setItem(
            "dailyGarsonList",
            JSON.stringify(this.dailyLists)
          );

          this.snack.color = "success darken-3";
          this.snack.message = "Liste kaydedildi";
          this.snack.enabled = true;
        } else {
          this.snack.color = "error darken-2";
          this.snack.message = "Bu tarih ve dönemde bir liste mevcut";
          this.snack.enabled = true;
        }
      }
    },
    deleteList(index) {
      const listDate = this.dailyLists[index]?.date
        ? new Date(this.dailyLists[index].date).toLocaleString("tr-TR", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          })
        : "Bilinmeyen";

      const consent = confirm(
        `${listDate} tarihli listeyi silmek istediğinize emin misiniz? Bu işlemin geri dönüşü yoktur.`
      );

      if (consent) {
        this.dailyLists.splice(index, 1);
        localStorage.setItem(
          "dailyGarsonList",
          JSON.stringify(this.dailyLists)
        );

        this.snack.color = "success darken-3";
        this.snack.message = "Liste silindi";
        this.snack.enabled = true;
      }
    },
    editList(index) {
      const list = this.dailyLists[index] || null;

      if (!list) {
        this.snack.color = "error darken-2";
        this.snack.message = "Böyle bir liste yok";
        this.snack.enabled = true;
      } else {
        const consent = confirm(
          'Bir liste düzenleyebilmek için, öncelikle varolan listenin silinip, aynı tarihte yeni bir liste oluşturulması gerekir. Sistem, bu listenin verisini otomatik olarak yeni listeye aktaracaktır ancak bu işlem eğer daha önceden yeni bir liste yapıp kaydetmediyseniz onun verisini SİLECEKTİR ve "Listeler" sayfasından bu listeyi kaldıracaktır. Eğer düzenleme esnasında listeyi kaydetmezseniz bu listeyi tekrar geri alamazsınız. Onaylıyor musunuz?'
        );

        if (consent) {
          this.newList = {
            period: list.period || "Sabah",
            manualGarsonAdd: false,
            date: list.date || "",
            modal: false,
            array: [],
            list: list.garsons,
          };

          this.dailyLists.splice(index, 1);
          localStorage.setItem(
            "dailyGarsonList",
            JSON.stringify(this.dailyLists)
          );

          this.menu.selected = 2;
          this.updateRoute(2);

          this.snack.color = "secondary darken-2";
          this.snack.message = "Lütfen kaydetmeyi unutmayın";
          this.snack.enabled = true;
        }
      }
    },
    shareList(index) {
      const list = this.dailyLists[index] || null;
      const listDate = list
        ? new Date(list.date).toLocaleString("tr-TR", {
            year: "numeric",
            day: "numeric",
            month: "long",
            weekday: "long",
          })
        : null;

      if (!list || !listDate) return;

      const textArea = document.createElement("textarea");
      textArea.value = `*${listDate} - ${
        list.period || ""
      }*\n\n${list.garsons.map((g) => g.name).join("\n")}`;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand("copy");
      textArea.remove();

      this.snack.color = "success darken-3";
      this.snack.message = "Liste panonuza kopyalandı";
      this.snack.enabled = true;
    },
    saveDate() {
      if (!this.newList.date) {
        this.snack.color = "error darken-2";
        this.snack.message = "Lütfen tarih seçin";
        this.snack.enabled = true;
      } else if (!this.newList.period) {
        this.snack.color = "error darken-2";
        this.snack.message = "Lütfen dönem seçin";
        this.snack.enabled = true;
      } else {
        const found = this.dailyLists.find(
          (item) =>
            item.date === this.newList.date &&
            item.period === this.newList.period
        );

        if (found) {
          this.snack.color = "error darken-2";
          this.snack.message = "Bu tarih ve dönemde bir liste mevcut";
          this.snack.enabled = true;
        } else this.$refs.dialog.save(this.newList.date);
      }
    },
    whatsLink(number) {
      window
        .open(
          `https://api.whatsapp.com/send?phone=${number.replace(/\s/g, "")}`,
          "_blank"
        )
        .focus();
    },
  },
};
</script>