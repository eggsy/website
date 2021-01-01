<template>
  <v-row style="margin-top: 1.5em" no-gutters>
    <v-col md="3" cols="0"></v-col>

    <v-col md="6" cols="12">
      <a href="https://new.eggsy.xyz/projects/premid/custom-status">
        <v-alert v-ripple dense type="info">
          Check out the new look of this page in my website's new (future) look!
          Click here to get started.
        </v-alert>
      </a>

      <div class="discordCard">
        <div class="cardContent">
          <div class="title">
            Playing a Game
            <v-spacer />
            <div class="controls">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn @click="clearAll" icon>
                    <v-icon v-on="on">mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Clear everything.</span>
              </v-tooltip>

              <v-menu
                v-if="errorString"
                transition="scroll-x-reverse-transition"
                open-on-hover
                offset-x
                left
              >
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" icon>
                    <v-icon class="warn">mdi-information</v-icon>
                  </v-btn>
                </template>

                <v-card style="margin-right: 12px">
                  <p
                    style="
                      padding: 10px;
                      max-width: 18em;
                      font-size: small;
                      white-space: pre-wrap;
                    "
                    v-html="errorString"
                  />
                </v-card>
              </v-menu>
            </div>
          </div>
          <div class="profileArea">
            <div class="imageContainer">
              <img
                :content="'PreMiD v' + extVersion"
                v-tippy="{ placement: 'top', arrow: true }"
                draggable="false"
                class="image"
                :src="imageSrc"
                alt="largeImage"
              />

              <img
                v-if="smallImageText"
                :style="`display:${showImageInput ? 'block' : 'none'}`"
                :content="smallImageText"
                v-tippy="{ placement: 'top', arrow: true }"
                draggable="false"
                class="smallImage"
                :src="smallImageSrc"
                alt="smallImage"
              />
              <img
                v-else
                :style="`display:${showImageInput ? 'block' : 'none'}`"
                draggable="false"
                class="smallImage"
                :src="smallImageSrc"
                alt="smallImage"
              />
            </div>

            <div class="details">
              <div class="appName" title="Custom Status">Custom Status</div>

              <div id="details" :title="details ? details.slice(0, 128) : ''">
                {{ details ? details.slice(0, 128) : "[ENTER SOMETHING]" }}
              </div>
              <div id="state" :title="state ? state.slice(0, 128) : ''">
                {{ state ? state.slice(0, 128) : "" }}
              </div>

              <div v-if="this.time" class="timestamp">{{ timeLeft }}</div>
              <div v-else-if="elapsedCheck && !this.time" class="timestamp">
                {{ timeElapsed }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style="display: flex">
          <v-text-field
            counter="128"
            :loading="loading"
            clearable
            v-model="details"
            autocomplete="off"
            label="Details (upper text)"
          ></v-text-field>
          <v-text-field
            style="margin-left: 8px"
            counter="128"
            :loading="loading"
            clearable
            v-model="state"
            autocomplete="off"
            label="State (lower text)"
          ></v-text-field>
        </div>

        <div style="display: flex; max-width: 100%">
          <v-select
            clearable
            :loading="loading"
            ref="largeImage"
            style="width: 100%; max-width: 100%"
            @change="imageHandle($event, 'large')"
            :items="largeImages"
            label="Large image"
          ></v-select>

          <v-select
            clearable
            :loading="loading"
            ref="smallImage"
            style="width: 100%; max-width: 100%; margin-left: 8px"
            @change="imageHandle($event, 'small')"
            :items="smallImages"
            label="Small image"
          ></v-select>
        </div>

        <v-text-field
          counter="128"
          ref="smallImageInput"
          :loading="loading"
          clearable
          :style="`display:${showImageInput ? 'block' : 'none !important'}`"
          v-model="smallImageText"
          autocomplete="off"
          label="Small image text"
        ></v-text-field>

        <v-row justify="space-around">
          <v-checkbox
            v-model="work"
            :disabled="!$presenceAdded() || $device.isMobile"
            @change="startedOnce = true"
            color="primary"
            v-tippy="{
              content: 'Display current changes on your profile.',
            }"
            label="Display"
          ></v-checkbox>

          <v-checkbox
            ref="startTimestamp"
            v-model="elapsedCheck"
            @change="clickDate = new Date()"
            :disabled="time ? true : false"
            color="primary"
            label="Show time elapsed"
          ></v-checkbox>

          <v-dialog ref="dialog" v-model="modal" persistent width="290px">
            <template v-slot:activator="{ on }">
              <div style="max-width: 100%">
                <v-text-field
                  v-model="time"
                  clearable
                  label="Show time left"
                  prepend-icon="mdi-clock"
                  readonly
                  v-on="on"
                ></v-text-field>
              </div>
            </template>

            <v-time-picker v-if="modal" v-model="asyncTime" full-width>
              <v-spacer></v-spacer>
              <v-btn text raised color="secondary" @click="modal = false"
                >Cancel</v-btn
              >
              <v-btn
                text
                raised
                color="primary"
                @click="
                  time = asyncTime;
                  $refs.dialog.save(time);
                  clickDate = new Date();
                "
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
        </v-row>
      </div>

      <div style="display: none" id="object">{}</div>
    </v-col>

    <v-col md="3" cols="0"></v-col>

    <v-snackbar v-model="snackbar">
      Uh oh, looks like you've selected a wrong time or the timer is up! Make
      sure you have chosen a future time if you're having troubles.
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

*:focus {
  outline: 0;
}

.v-menu__content {
  box-shadow: none !important;
}

.v-picker__body {
  background-color: #1e1e1e !important;
}

.discordCard {
  margin-bottom: 24px;
  background-color: #6c82cf;
  border: 1px #6c82cf;
  height: 175px;
  width: 100%;
  border-radius: 8px;

  *:hover {
    cursor: default;
  }

  *:focus {
    outline: 0;
  }

  .controls {
    display: grid;
    position: absolute;
    right: 0;
    top: 12px;

    button,
    i {
      cursor: pointer !important;
    }
  }

  .profileArea {
    display: flex;
  }

  .title {
    padding-top: 12px;
    text-transform: uppercase;
    font-weight: 700;
    color: #ffffff;
    position: relative;
    font-size: 14px !important;
  }

  .cardContent {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 100%;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .imageContainer,
  .image {
    border-radius: 4px;
    width: 110px;
    height: 110px;
    position: relative;
  }

  .imageContainer {
    background-color: #6c82cf;
  }

  .smallImage {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    background-color: #6c82cf;
    border: 2.5px solid #6c82cf;
    bottom: -6.5px;
    right: -6.5px;
  }

  .details {
    margin-left: 12px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #details,
  #state,
  .timestamp {
    color: hsla(0, 0%, 100%, 0.8);
    font-size: 14px !important;
    margin-bottom: 4px;
  }

  .appName {
    font-weight: 600;
    color: hsla(0, 0%, 100%, 0.8);
    width: 100%;
    font-size: 14px !important;
    margin-bottom: 4px;
  }
}
</style>

<script>
import moment from "moment";

export default {
  layout: "premid",
  head: {
    title: "Custom Status",
    meta: [
      {
        hid: "og:title",
        name: "og:title",
        content: "PreMiD Custom Status",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "PreMiD Custom Status",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Now you can have anything you want on your profile! Just type the things you want to show and let us do the rest!",
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Now you can have anything you want on your profile! Just type the things you want to show and let us do the rest!",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Now you can have anything you want on your profile! Just type the things you want to show and let us do the rest!",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content:
          "https://the-person-under-this-message.is-inside.me/2POrmy3F.png",
      },
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://the-person-under-this-message.is-inside.me/2POrmy3F.png",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://eggsy.xyz/projects/premid/custom-status",
      },
    ],
  },
  async asyncData({ app }) {
    const object = {
      elapsedCheck: false,
      loading: true,
      details: "",
      state: "",
      timeLeft: null,
      timeElapsed: null,
      clickDate: null,
      startedOnce: false,
      work: false,
      imageSrc:
        "https://the-person-under-this-message.is-inside.me/2POrmy3F.png",
      largeImages: [
        "Mobile",
        "Heart",
        "Please",
        "Please Stop",
        "Playing",
        "Paused",
        "Live",
        "Search",
        "Thinking",
        "Sad Cat",
        "Relax",
        "Popcorn",
        "Angry Stickman",
        "Smart",
        "Eyes",
        "Shrug",
        "Extreme Thinking",
        "Read The Docs",
        "Panda Cry",
        "Pepe Sweat",
        "Mmlol",
        "Coffee",
        "Linux",
        "Windows",
        "Cool",
        "Mobile",
        "Spongery",
        "Oh No",
        "Doubt",
        "Tada",
        "Balance",
        "Bravery",
        "Brilliance",
        "ESL",
      ].sort(),
      smallImages: [
        "Please",
        "Playing",
        "Paused",
        "Live",
        "Reading",
        "Call",
        "Search",
        "Video Call",
        "Writing",
        "Heart",
        "Thinking",
        "S - Online",
        "S - Do Not Disturb",
        "S - Idle",
        "Check Mark",
        "No Entry",
        "Mmlol",
        "Coffee",
        "Linux",
        "Windows",
        "Cool",
        "Tada",
        "Balance",
        "Bravery",
        "Brilliance",
      ].sort(),
      smallImageSrc: "",
      showImageInput: false,
      smallImageText: "",
      modal: false,
      asyncTime: null,
      time: null,
      snackbar: false,
      largeImageKey: "",
      smallImageKey: "",
      errorString: null,
    };

    try {
      let { data } = await app.$axios.get("https://api.premid.app/v2/versions");

      data && data.extension
        ? (object["extVersion"] = data.extension)
        : (object["extVersion"] = "UNKNOWN");

      return object;
    } catch (err) {
      object["extVersion"] = "UNKNOWN";
      return object;
    }
  },
  methods: {
    errorChecker() {
      const errors = [];

      if (this.$device.isMobile)
        errors.push(
          "PreMiD isn't available on mobile, so does this page; you can still test the functions."
        );
      if (!this.work && this.$presenceAdded() && !this.$device.isMobile)
        errors.push(
          "Not displaying anything? Better to check that 'Display' checkbox dude."
        );
      if (!this.$presenceAdded() && !this.$device.isMobile) {
        errors.push(
          "To get this page working, you have to go to <a href='https://premid.app/store/presences/Custom%20Status' target='_blank'>PreMiD Store</a> and add 'Custom Status' presence. You have to enable presence/extension."
        );
      }

      return (this.errorString = errors.map((e) => `▶ ${e}`).join("\n\n"));
    },
    clearAll() {
      this.elapsedCheck = false;
      this.details = "";
      this.state = "";
      this.timeLeft = null;
      this.timeElapsed = null;
      this.clickDate = null;
      this.startedOnce = false;
      this.work = false;
      this.imageSrc =
        "https://the-person-under-this-message.is-inside.me/2POrmy3F.png";
      this.smallImageSrc = "";
      this.showImageInput = false;
      this.smallImageText = "";
      this.modal = false;
      this.asyncTime = null;
      this.time = null;
      this.snackbar = false;
      this.largeImageKey = "";
      this.smallImageKey = "";

      for (let ref in this.$refs) {
        if (ref && this.$refs[ref] && this.$refs[ref].reset) {
          this.$refs[ref].reset();
        }
      }
    },
    getImages: function (type) {
      if (type == "large")
        return {
          heart:
            "https://the-person-under-this-message.is-inside.me/FFaurlgO.png",
          playing:
            "https://the-person-under-this-message.is-inside.me/EoOzVs2M.png",
          paused:
            "https://the-person-under-this-message.is-inside.me/s0DPgEwU.png",
          live:
            "https://the-person-under-this-message.is-inside.me/XsaZMhsz.png",
          reading:
            "https://the-person-under-this-message.is-inside.me/Vx7BRoKO.png",
          search:
            "https://the-person-under-this-message.is-inside.me/qeRXPW6D.png",
          please:
            "https://the-person-under-this-message.is-inside.me/oC6mj0gg.png",
          pleasestop:
            "https://the-person-under-this-message.is-inside.me/MWfbWMYm.png",
          thinking:
            "https://the-person-under-this-message.is-inside.me/YqP2lOl9.png",
          sadcat:
            "https://the-person-under-this-message.is-inside.me/VxT3GIUS.png",
          relax:
            "https://the-person-under-this-message.is-inside.me/CF69lPCF.png",
          popcorn:
            "https://the-person-under-this-message.is-inside.me/4vewxBZg.png",
          angrystickman:
            "https://the-person-under-this-message.is-inside.me/lGX7UnIB.png",
          smart:
            "https://the-person-under-this-message.is-inside.me/hYsRBoqD.png",
          eyes:
            "https://the-person-under-this-message.is-inside.me/xa72vjil.png",
          shrug:
            "https://the-person-under-this-message.is-inside.me/RDgx8NEb.png",
          extremethinking:
            "https://the-person-under-this-message.is-inside.me/AD9hyUah.png",
          readthedocs:
            "https://the-person-under-this-message.is-inside.me/A4wLF6L4.png",
          pandacry:
            "https://the-person-under-this-message.is-inside.me/LLUqgE10.png",
          pepesweat:
            "https://the-person-under-this-message.is-inside.me/Y2uqx7vG.png",
          mmlol:
            "https://the-person-under-this-message.is-inside.me/oQcu3s5E.png",
          coffee:
            "https://the-person-under-this-message.is-inside.me/NmtO6Trf.png",
          linux:
            "https://the-person-under-this-message.is-inside.me/P25xKDjj.png",
          windows:
            "https://the-person-under-this-message.is-inside.me/cH0BRFnb.png",
          cool:
            "https://the-person-under-this-message.is-inside.me/gqXF51cC.png",
          mobile:
            "https://the-person-under-this-message.is-inside.me/glME71ss.png",
          ohno:
            "https://the-person-under-this-message.is-inside.me/kiSTZH1H.png",
          doubt:
            "https://the-person-under-this-message.is-inside.me/AurImZXD.png",
          spongery:
            "https://the-person-under-this-message.is-inside.me/Kxp1GMgg.png",
          balance:
            "https://the-person-under-this-message.is-inside.me/fHUbrPyf.png",
          bravery:
            "https://the-person-under-this-message.is-inside.me/obmmTH8T.png",
          brilliance:
            "https://the-person-under-this-message.is-inside.me/BqcsEKro.png",
          tada:
            "https://the-person-under-this-message.is-inside.me/3Msf3Xmi.png",
          esl:
            "https://the-person-under-this-message.is-inside.me/AiQ1i9Cf.png",
        };
      else if (type == "small")
        return {
          playing:
            "https://the-person-under-this-message.is-inside.me/EoOzVs2M.png",
          paused:
            "https://the-person-under-this-message.is-inside.me/s0DPgEwU.png",
          live:
            "https://the-person-under-this-message.is-inside.me/XsaZMhsz.png",
          reading:
            "https://the-person-under-this-message.is-inside.me/Vx7BRoKO.png",
          call:
            "https://the-person-under-this-message.is-inside.me/TQh49EHP.png",
          search:
            "https://the-person-under-this-message.is-inside.me/qeRXPW6D.png",
          videocall:
            "https://the-person-under-this-message.is-inside.me/7DYrJX5d.png",
          writing:
            "https://the-person-under-this-message.is-inside.me/nVH4a87Z.png",
          heart:
            "https://the-person-under-this-message.is-inside.me/FFaurlgO.png",
          please:
            "https://the-person-under-this-message.is-inside.me/oC6mj0gg.png",
          thinking:
            "https://the-person-under-this-message.is-inside.me/YqP2lOl9.png",
          online:
            "https://the-person-under-this-message.is-inside.me/Djc4cmC6.png",
          donotdisturb:
            "https://the-person-under-this-message.is-inside.me/wJAOQXtX.png",
          idle:
            "https://the-person-under-this-message.is-inside.me/IqJw4Fru.png",
          checkmark:
            "https://the-person-under-this-message.is-inside.me/qUtpSBGj.png",
          noentry:
            "https://the-person-under-this-message.is-inside.me/yilXM6Ah.png",
          mmlol:
            "https://the-person-under-this-message.is-inside.me/oQcu3s5E.png",
          coffee:
            "https://the-person-under-this-message.is-inside.me/NmtO6Trf.png",
          linux:
            "https://the-person-under-this-message.is-inside.me/P25xKDjj.png",
          windows:
            "https://the-person-under-this-message.is-inside.me/cH0BRFnb.png",
          cool:
            "https://the-person-under-this-message.is-inside.me/gqXF51cC.png",
          balance:
            "https://the-person-under-this-message.is-inside.me/fHUbrPyf.png",
          bravery:
            "https://the-person-under-this-message.is-inside.me/obmmTH8T.png",
          brilliance:
            "https://the-person-under-this-message.is-inside.me/BqcsEKro.png",
          tada:
            "https://the-person-under-this-message.is-inside.me/3Msf3Xmi.png",
        };
    },
    imageHandle: function (dat, type) {
      if (type == "large" && dat) {
        const imageList = this.getImages("large");

        this.largeImageKey = imageList[dat.toLowerCase().replace(/\s/g, "")]
          ? dat.toLowerCase().replace(/\s/g, "")
          : "";
        this.imageSrc = imageList[dat.toLowerCase().replace(/\s/g, "")]
          ? imageList[dat.toLowerCase().replace(/\s/g, "")]
          : this.imageSrc;
      } else if (type == "large" && !dat) {
        this.largeImageKey = "";
        this.imageSrc =
          "https://the-person-under-this-message.is-inside.me/2POrmy3F.png";
      } else if (type == "small" && dat) {
        this.showImageInput = true;
        const imageList = this.getImages("small");

        this.smallImageKey = imageList[
          dat.toLowerCase().replace(/\s/g, "").replace("s-", "")
        ]
          ? dat.toLowerCase().replace(/\s/g, "").replace("s-", "")
          : "";
        this.smallImageSrc = imageList[
          dat.toLowerCase().replace(/\s/g, "").replace("s-", "")
        ]
          ? imageList[dat.toLowerCase().replace(/\s/g, "").replace("s-", "")]
          : this.smallImageSrc;
      } else if (type == "small" && !dat) {
        this.smallImageKey = "";
        this.smallImageText = "";
        this.showImageInput = false;
      }
    },
    getProperTime(type) {
      if (type == "elapsed" || !type) {
        const hours = moment().diff(moment(this.clickDate), "hours"),
          minutes = moment().diff(moment(this.clickDate), "minutes"),
          seconds = moment().diff(moment(this.clickDate), "seconds");

        return (
          `${hours > 0 ? `${hours < 10 ? `0${hours}:` : `${hours}:`}` : ""}` +
          `${
            minutes > 0
              ? `${
                  `${minutes % 60}`.length === 1
                    ? `0${minutes % 60}:`
                    : `${minutes % 60}:`
                }`
              : "00:"
          }` +
          `${
            seconds > 0
              ? `${
                  `${seconds % 60}`.length === 1
                    ? `0${seconds % 60}`
                    : `${seconds % 60}`
                }`
              : "00"
          }`
        );
      } else if (type == "left") {
        const time = moment(this.time, "HH:mm").unix(),
          now = moment().unix(),
          countdown = moment.duration(time - now, "seconds"),
          hours =
            countdown.hours() > 0
              ? countdown.hours() < 10
                ? "0" + countdown.hours() + ":"
                : countdown.hours() + ":"
              : "",
          minutes =
            countdown.minutes() > 0
              ? countdown.minutes() < 10
                ? "0" + countdown.minutes() + ":"
                : countdown.minutes() + ":"
              : "00:",
          seconds =
            countdown.seconds() > 0
              ? countdown.seconds() - 1 < 10
                ? "0" + (countdown.seconds() - 1) + ""
                : countdown.seconds() - 1
              : "00";

        if (countdown.asSeconds() <= 0) {
          this.elapsedCheck = false;
          this.time = null;
          this.snackbar = true;
        } else return `${hours}${minutes}${seconds}`;
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  },
  mounted() {
    this.interval1 = setInterval(() => {
      this.errorChecker();

      if (this.elapsedCheck && this.clickDate && !this.time) {
        this.timeElapsed = this.getProperTime()
          ? this.getProperTime() + " elapsed"
          : null;
      } else if (this.time) {
        this.elapsedCheck = false;
        this.timeLeft = this.getProperTime("left")
          ? this.getProperTime("left") + " left"
          : null;
      } else {
        this.timeElapsed = "";
        this.timeLeft = "";
      }
    }, 100);

    this.interval2 = setInterval(() => {
      if (this.work) {
        const object = {};

        this.largeImageKey
          ? (object["largeImageKey"] = this.largeImageKey)
          : (object["largeImageKey"] = "default");

        this.smallImageKey
          ? (object["smallImageKey"] = this.smallImageKey)
          : null;

        this.smallImageKey && this.smallImageText
          ? (object["smallImageText"] = this.smallImageText)
          : null;

        this.details && this.details != ""
          ? (object["details"] = this.details)
          : null;

        this.state && this.state != "" ? (object["state"] = this.state) : null;

        if (
          (this.clickDate && this.elapsedCheck) ||
          (this.clickDate && this.time)
        ) {
          object["startTimestamp"] = this.clickDate.getTime();
          object["smallImageKey"] = this.smallImageKey || "NULL";
        }

        this.clickDate && this.time
          ? (object["endTimestamp"] = moment(this.time, "HH:mm").valueOf())
          : null;

        if (document.querySelector("#object"))
          document.querySelector("#object").textContent = JSON.stringify(
            object
          );
      } else if (
        !this.work &&
        this.startedOnce &&
        document.querySelector("#object")
      )
        document.querySelector("#object").textContent = "{}";
    }, 3000);

    const details = [
        "Thinking about you!",
        "Have a nice day!",
        "How's your day going?",
        "Isn't EGGSY amazing?",
        "I love this app!",
        "This thing is really cool!",
        "Wow!",
        "THIS IS SO WEIRD!",
        "Discord FTW!",
        "You feel sick?",
        "Be good...",
      ],
      states = [
        "You're awesome!",
        "You look beautiful",
        "Well, good luck.",
        "Nope, can't help",
        "Leave me alone!",
        "You're great!",
        "I love you!",
        "You're my world!",
        "This is cool.",
      ];

    this.details = details[Math.floor(Math.random() * details.length)];
    this.state = states[Math.floor(Math.random() * states.length)];
    this.loading = false;
  },
};
</script>
