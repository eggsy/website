<template>
  <div>
    <center v-if="langSwitch">
      <v-system-bar
        :to="`/projects/overlay?lang=${lang}`"
        style="max-width: 500px"
        window
        dark
      >
        <v-icon>mdi-bell</v-icon>
        <span v-html="langMessage"></span>
        <v-spacer></v-spacer>
        <v-icon @click="langSwitch = false">mdi-close</v-icon>
      </v-system-bar>
    </center>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5">
        <h2
          style="margin-top: 20px; margin-bottom: 20px"
          class="font-weight-thin text-center"
        >
          {{ strings.title }}
        </h2>

        <div style="margin-top: 15px; display: flex">
          <v-select
            ref="overlay"
            @change="
              selectedOverlay = frameObject[$refs.overlay.lazyValue] || null
            "
            :loading="loading"
            :items="frames"
            :label="strings.selectFrame"
            clearable
          ></v-select>

          <v-spacer></v-spacer>
          <v-btn
            outlined
            style="margin-left: 15px; height: 50px; width: 175px"
            text
            @click="galleryDialog = true"
            >{{ strings.overlayList }}</v-btn
          >
        </div>

        <v-text-field
          ref="url"
          clearable
          :label="strings.imageUrl"
        ></v-text-field>

        <div :style="`${checkBox ? 'display:flex;' : 'display:none;'}`">
          <v-text-field
            ref="width"
            autocomplete="off"
            style="width: 50px"
            clearable
            :label="strings.width"
          ></v-text-field>
          <v-text-field
            ref="height"
            autocomplete="off"
            style="margin-left: 10px; width: 50px"
            clearable
            :label="strings.height"
          ></v-text-field>
        </div>

        <v-checkbox
          dark
          color="primary"
          v-model="checkBox"
          :label="strings.checkBox"
        ></v-checkbox>

        <div style="display: flex">
          <v-btn
            color="primary"
            outlined
            text
            :loading="createLoading"
            @click="create"
            >{{ strings.button }}</v-btn
          >
          <v-btn
            style="margin-left: 15px"
            color="secondary"
            outlined
            text
            @click="clear"
            >{{ strings.clearButton }}</v-btn
          >
        </div>

        <footer style="margin-top: 20px">
          <span v-html="strings.footer"></span>
          <span v-html="strings.thanksTo"></span>

          <div style="margin-top: 10px; display: flex">
            <v-btn title="Click here to return to the homepage." to="/" icon>
              <v-icon>mdi-home-circle</v-icon>
            </v-btn>
            <SocialMedia />
          </div>
        </footer>
      </v-col>

      <v-dialog
        v-model="dialog"
        :max-width="
          checkBox && $refs.width && $refs.width.lazyValue
            ? parseInt($refs.width.lazyValue) + 100
            : '400px'
        "
      >
        <v-card>
          <v-card-title v-if="image" class="headline">
            Result
            <v-spacer></v-spacer>
            <v-menu bottom left offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  title="Download the image."
                  dark
                  icon
                  v-on="on"
                  @click="download(image)"
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
            </v-menu>
          </v-card-title>
          <v-card-title v-else class="headline">Warning</v-card-title>

          <div v-if="image">
            <center>
              <v-img
                loading
                :width="
                  checkBox && $refs.width && $refs.width.lazyValue
                    ? $refs.width.lazyValue
                    : '256px'
                "
                :height="
                  checkBox && $refs.height && $refs.height.lazyValue
                    ? $refs.height.lazyValue
                    : '256px'
                "
                :src="image"
                :lazy-src="image"
              ></v-img>
            </center>
          </div>
          <v-card-text v-else>
            {{ message || "No message specified. Please try again." }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="galleryDialog" max-width="650px">
        <v-card>
          <v-card-title class="headline">
            Avaiable Frames
            <v-spacer></v-spacer>
            <v-menu bottom left offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  title="Close the dialog."
                  dark
                  icon
                  v-on="on"
                  @click="galleryDialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-menu>
          </v-card-title>

          <v-row style="margin: 10px" justify="space-around">
            <v-card
              style="margin-bottom: 5px"
              v-for="(key, value) in frameObject"
              :key="key"
              class="mx-auto project-card"
              max-width="126px"
              max-height="126px"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-img
                    v-on="on"
                    :lazy-src="'/files/overlay/frames/' + key + '.png'"
                    :src="'/files/overlay/frames/' + key + '.png'"
                    height="126px"
                    width="126"
                  ></v-img>
                </template>
                {{ value }}
              </v-tooltip>
            </v-card>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
// TODO this requires complete rework
import strs from "../../../api/files/overlay/strings.json";

export default {
  head() {
    const title = this.strings.title || "Picture Editor with Overlays",
      meta = [
        {
          name: "og:title",
          content: this.strings.title || "Picture Editor with Overlays",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.strings.title || "Picture Editor with Overlays",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            this.strings.description ||
            "You can create pictures with frames with this page. You can also resize and use the API for your applications by yourself!",
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
            this.strings.description ||
            "You can create pictures with frames with this page. You can also resize and use the API for your applications by yourself!",
        },
        {
          hid: "description",
          name: "description",
          content:
            this.strings.description ||
            "You can create pictures with frames with this page. You can also resize and use the API for your applications by yourself!",
        },
        { name: "premid-details", content: "Viewing a page:" },
        {
          name: "premid-state",
          content: "Overlay Creator",
        },
      ],
      link = [
        {
          rel: "canonical",
          href: "https://eggsy.xyz/projects/overlay",
        },
      ];

    return {
      title,
      meta,
      link,
    };
  },
  data() {
    return {
      loading: true,
      dialog: false,
      galleryDialog: false,
      createLoading: false,
      checkBox: false,
      langSwitch: false,
      image: null,
      message: null,
      frames: [],
      frameObject: {},
      selectedOverlay: null,
      lang: null,
      strings: strs[`${this.$route.query.lang}`]
        ? strs[`${this.$route.query.lang || "en"}`]
        : strs["en"],
    };
  },
  methods: {
    clear() {
      this.dialog = false;
      this.galleryDialog = false;
      this.createLoading = false;
      this.checkBox = false;
      this.image = null;
      this.message = null;
      this.selectedOverlay = null;

      Object.keys(this.$refs).forEach((ref) => {
        this.$refs[ref].reset ? this.$refs[ref].reset() : false;
      });
    },
    download(file) {
      const element = document.createElement("a");

      element.setAttribute("href", file);
      element.setAttribute("download", "result.png");
      element.click();
      element.remove();
    },
    create() {
      const overlay = this.selectedOverlay,
        refs = this.$refs;

      this.image = null;

      if (!overlay) {
        this.message = this.strings.errors[0];
        this.dialog = true;
      } else if (!refs.url || !refs.url.lazyValue) {
        this.message = this.strings.errors[1];
        this.dialog = true;
      } else if (
        (this.checkBox && refs.width && !refs.width.lazyValue) ||
        (this.checkBox && refs.height && !refs.height.lazyValue)
      ) {
        this.message = this.strings.errors[2];
        this.dialog = true;
      } else if (
        (this.checkBox &&
          refs.width &&
          refs.width.lazyValue &&
          refs.width.lazyValue > 2000) ||
        (this.checkBox &&
          refs.height &&
          refs.height.lazyValue &&
          refs.height.lazyValue > 2000)
      ) {
        this.message = this.strings.errors[3];
        this.dialog = true;
      } else if (
        (this.checkBox &&
          refs.height &&
          refs.width.lazyValue &&
          refs.width.lazyValue < 14) ||
        (this.checkBox &&
          refs.height &&
          refs.height.lazyValue &&
          refs.height.lazyValue < 14)
      ) {
        this.message = this.strings.errors[4];
        this.dialog = true;
      } else if (
        (this.checkBox &&
          refs.height &&
          refs.height.lazyValue &&
          refs.width &&
          refs.width.lazyValue &&
          isNaN(refs.width.lazyValue)) ||
        (this.checkBox &&
          refs.height &&
          refs.height.lazyValue &&
          refs.width &&
          refs.width.lazyValue &&
          isNaN(refs.height.lazyValue))
      ) {
        this.message = this.strings.errors[5];
        this.dialog = true;
      } else if (refs.url.lazyValue.includes("hizliresim")) {
        this.message = this.strings.errors[6];
        this.dialog = true;
      } else {
        try {
          this.createLoading = true;

          const resultUrl = `https://eggsy.xyz/api/overlay/create.png?overlay=${overlay}&url=${
            refs.url.lazyValue
          }${
            this.checkBox && refs.width && refs.width.lazyValue
              ? "&width=" + refs.width.lazyValue
              : ""
          }${
            this.checkBox && refs.height && refs.height.lazyValue
              ? "&height=" + refs.height.lazyValue
              : ""
          }`;

          this.$axios
            .head(resultUrl)
            .then((res) => {
              this.createLoading = false;
              this.image = resultUrl;
              this.dialog = true;
            })
            .catch((err) => {
              this.createLoading = false;
              console.error(err);
              this.message = this.strings.errors[7];
              this.dialog = true;
            });
        } catch (err) {
          this.createLoading = false;
          console.error(err);
          this.message = this.strings.errors[7];
          this.dialog = true;
        }
      }
    },
  },
  async mounted() {
    if (
      (navigator.language.slice(0, 2) == "tr" && !this.$route.query.lang) ||
      (navigator.language.slice(0, 2) == "tr" && this.$route.query.lang != "tr")
    ) {
      this.lang = "tr";
      this.langMessage =
        "Bu sayfayı kendi dilinde görmek ister misin? <a href='/projects/overlay?lang=tr'>Buraya</a> tıkla!";
      this.langSwitch = true;
    } else if (
      (navigator.language.slice(0, 2) == "fr" && !this.$route.query.lang) ||
      (navigator.language.slice(0, 2) == "fr" && this.$route.query.lang != "fr")
    ) {
      this.lang = "fr";
      this.langMessage =
        "Ce n'est pas votre langue? <a href='/projects/overlay?lang=fr'>Cliquez ici</a> pour voir cette page en français!";
      this.langSwitch = true;
    } else if (
      navigator.language.slice(0, 2) == "en" &&
      this.$route.query.lang &&
      this.$route.query.lang != "en" &&
      strs[`${this.$route.query.lang}`]
    ) {
      this.lang = "";
      this.langMessage =
        "Not your language? Click <a href='/projects/overlay'>here</a> to see this page in English!";
      this.langSwitch = true;
    }

    const { data } = await this.$axios.get(
        "https://eggsy.xyz/api/overlay/frames"
      ),
      frameNames = [];

    data.forEach((f) => {
      const splitted = f
        .split("_")
        .map((f) => {
          if (!isNaN(f) || !isNaN(f.slice(-2))) {
            return f.toLowerCase().slice(0, -2) + " (" + f.slice(-2) + ")";
          } else if (!isNaN(f.slice(-1)))
            return (
              f[0].toUpperCase() +
              f.slice(1).toLowerCase().slice(0, -1) +
              " (" +
              f.slice(-1) +
              ")"
            );
          else return f[0].toUpperCase() + f.slice(1).toLowerCase();
        })
        .join(" ");

      const goodName = splitted
        .replace("Ataturk", "Atatürk")
        .replace("Baris Ozcan", "Barış Özcan")
        .replace("Erdogan", "Erdoğan")
        .replace("Dbl", "DBL");

      this.frameObject[goodName] = f;
      frameNames.push(goodName);
    });

    this.frames = frameNames;
    this.loading = false;
  },
};
</script>
