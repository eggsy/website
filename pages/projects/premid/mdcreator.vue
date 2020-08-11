<template>
  <v-row no-gutters>
    <v-col md="2" cols="0"></v-col>

    <v-col md="8" cols="12" class="pa-4">
      <h2 class="text-center font-weight-thin" style="margin-bottom:10px;">Presence Metadata Creator</h2>

      <div class="flex">
        <v-text-field
          clearable
          ref="name"
          autocomplete="off"
          label="Author's name"
          style="margin-right:10px;"
        ></v-text-field>
        <v-text-field clearable ref="Id" autocomplete="off" label="Author's ID" maxlength="18"></v-text-field>
      </div>

      <div class="flex" style="margin-bottom:-20px">
        <v-text-field
          v-on:keyup.enter="contHandle"
          autocomplete="off"
          ref="contName"
          clearable
          label="Contributor name"
          style="margin-right:10px;"
        ></v-text-field>
        <v-text-field
          v-on:keyup.enter="contHandle"
          autocomplete="off"
          ref="contId"
          clearable
          label="Contributor ID"
          maxlength="18"
        ></v-text-field>
      </div>
      <div>
        <v-chip-group>
          <v-chip
            v-for="(cont, index) in contributorsIdArray"
            style="margin-top:6px;margin-right:4px;"
            :key="index"
            close
            @click:close="deleteArray('contributor', cont)"
            color="primary"
          >{{ cont }}</v-chip>
        </v-chip-group>
        <small
          v-if="contributorsIdArray.length == 0"
        >No contributers added yet. Write down and hit enter.</small>
      </div>

      <div class="flex" style="margin-top:8px;">
        <v-text-field
          autocomplete="off"
          clearable
          ref="service"
          label="Service name"
          style="margin-right:10px;"
        ></v-text-field>
        <v-text-field autocomplete="off" clearable ref="version" label="Service version"></v-text-field>
      </div>

      <div class="flex" style="margin-bottom:20px;">
        <v-text-field
          autocomplete="off"
          clearable
          ref="logo"
          label="Logo"
          style="margin-right:10px;"
        ></v-text-field>
        <v-text-field autocomplete="off" clearable ref="thumbnail" label="Thumbnail"></v-text-field>
      </div>

      <div>
        <v-color-picker
          flat
          hide-mode-switch
          mode="hexa"
          v-model="color"
          width="540px"
          class="mx-auto"
        ></v-color-picker>
      </div>

      <div style="margin-top:20px;">
        <v-text-field
          v-on:keyup.enter="urlHandle"
          style="margin-bottom:-20px"
          autocomplete="off"
          clearable
          ref="url"
          label="URL(s), hit enter to add."
        ></v-text-field>

        <v-chip-group v-if="urls.length > 0">
          <v-chip
            v-for="(url, index) in urls"
            style="margin-top:6px;margin-right:4px;"
            :key="index"
            @click:close="deleteArray('url', url)"
            close
            color="primary"
          >{{ url }}</v-chip>
        </v-chip-group>
        <small v-if="urls.length == 0">No URL added yet.</small>
      </div>

      <div class="flex" style="margin-top:8px;margin-bottom:-20px">
        <v-text-field
          v-on:keyup.enter="descHandle"
          autocomplete="off"
          clearable
          ref="langKey"
          label="Language code"
          style="max-width:150px!important;margin-right:10px;"
        ></v-text-field>
        <v-text-field
          v-on:keyup.enter="descHandle"
          autocomplete="off"
          clearable
          ref="description"
          label="Description"
        ></v-text-field>
      </div>
      <div>
        <v-chip-group v-if="languageArray.length > 0">
          <v-chip
            v-for="(language, index) in languageArray"
            style="margin-top:6px;margin-right:4px;"
            :key="index"
            @click:close="deleteArray('language', language)"
            close
            color="primary"
          >{{ language }}</v-chip>
        </v-chip-group>
        <small v-if="languageArray.length == 0">No language added yet. Write one and hit enter.</small>
      </div>

      <div class="flex" style="margin-top:8px;margin-bottom:-20px">
        <v-text-field
          v-on:keyup.enter="tagHandle"
          autocomplete="off"
          clearable
          ref="tags"
          label="Tag(s), hit enter to add."
          style=";margin-right:10px;"
        ></v-text-field>
        <v-text-field autocomplete="off" ref="regexp" clearable label="RegExp, leave empty if none"></v-text-field>
      </div>
      <div>
        <v-chip-group>
          <v-chip
            v-for="(tag, index) in tags"
            style="margin-top:6px;margin-right:4px;"
            :key="index"
            @click:close="deleteArray('tag', tag)"
            close
            color="primary"
          >{{ tag }}</v-chip>
        </v-chip-group>
        <small v-if="tags.length == 0">No tags added yet.</small>
      </div>

      <v-select
        style="margin-top:20px;"
        ref="category"
        @change="categoryHandle"
        :items="categories"
        label="Select a category"
      ></v-select>

      <v-text-field
        :style="
          'display:' + `${iframe ? 'block' : 'none'}` + ';margin-top:8px;'
        "
        autocomplete="off"
        clearable
        ref="iframeRegexp"
        label="Iframe RegExp, leave blank if none."
      ></v-text-field>

      <div style="display:inline-flex">
        <v-checkbox v-model="iframe" color="primary" label="Enable iframe?"></v-checkbox>
        <v-checkbox
          v-model="warning"
          v-tippy="{
            content:
              'You shouldn\'t enable this unless you know what you\'re doing! Only enable if your presence requires extra steps to install, like \'Custom Status\' and \'VLC\'.',
            placement: 'top',
            arrow: true
          }"
          color="primary"
          label="Enable warning?"
          style="margin-left:12px;"
        ></v-checkbox>
      </div>

      <div class="buttons">
        <v-btn @click="generate">Generate</v-btn>
        <v-btn @click="clear">Reset</v-btn>
        <v-menu open-on-hover offset-y top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Import</v-btn>
          </template>

          <div style="margin-bottom:10px;">
            <v-btn @click="$refs.file.click()">From Local File</v-btn>
            <v-btn @click="storeImportDialog = true">From Store</v-btn>
            <v-btn @click="clipboardImport">From Clipboard</v-btn>
          </div>
        </v-menu>
        <input style="display:none" ref="file" @change="fileUpload" type="file" />
      </div>

      <div class="text-center">
        <v-dialog v-model="dialog" :width="dialogWidth">
          <v-card>
            <v-card-title v-if="json" class="headline" primary-title>
              <span>Result</span>

              <v-spacer></v-spacer>

              <v-menu bottom left offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn title="Download file" dark icon v-on="on" @click="download(json)">
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </template>
              </v-menu>
            </v-card-title>
            <v-card-title v-else class="headline" primary-title>Warning</v-card-title>

            <v-card-text>
              <p>{{ message }}</p>
            </v-card-text>
            <center v-if="json">
              <code style="text-align:left;margin-bottom:15px;width:90%;">
                <p style="padding:14px;margin-bottom:-10px;margin-top:-10px;">{{ json }}</p>
              </code>
            </center>

            <v-divider></v-divider>

            <v-card-actions>
              <v-card-text v-if="json">Please make sure to check everything twice!</v-card-text>
              <v-spacer></v-spacer>
              <v-btn color="primary" raised @click="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <v-dialog v-model="storeImportDialog" width="500px">
        <v-card>
          <v-card-title class="headline" primary-title></v-card-title>

          <v-card-text>
            <small>
              You can only import the ones that's available on the
              <a
                href="https://premid.app/store"
                target="_blank"
              >store</a> (and
              it's case sensitive).
            </small>

            <v-text-field
              autocomplete="off"
              clearable
              @keydown.enter="storeImportHandle"
              ref="storeImportField"
              label="Please enter the name or the URL of the presence."
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" raised @click="storeImportHandle">Import</v-btn>
            <v-btn color="secondary" raised @click="storeImportDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <v-col md="2" cols="0"></v-col>
  </v-row>
</template>

<style scoped>
*:focus {
  outline: none;
}

.v-menu__content {
  box-shadow: none;
}

.flex {
  display: flex;
}

@media only screen and (max-width: 600px) {
  .buttons {
    text-align: center;
  }

  .buttons > button {
    margin-bottom: 10px;
  }
}
</style>

<script>
import axios from "axios";

export default {
  layout: "premid",
  auth: false,
  head: {
    title: "PreMiD",
    meta: [
      { name: "og:title", content: "Presence Metadata Creator" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Hey presence developers! This page is there for you to create, edit and make sure about your metadata.json files. You can create one, edit one and even use this to check if there's anything wrong about your file!",
      },
      {
        name: "og:image",
        content: "https://premid.app/assets/images/logo.png",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Hey presence developers! This page is there for you to create, edit and make sure about your metadata.json files. You can create one, edit one and even use this to check if there's anything wrong about your file!",
      },
      { name: "premid-details", content: "Viewing a PreMiD page:" },
      { name: "premid-state", content: "Metadata Creator" },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://eggsy.xyz/projects/premid/mdcreator",
      },
    ],
  },
  data() {
    return {
      dialog: false,
      storeImportDialog: false,
      message: null,
      json: null,
      color: { hex: "#FFFFFF", hexa: "#FFFFFFFF" },
      dialogWidth: 500,
      iframeRegexp: "none",
      contributorsArray: [],
      contributorsIdArray: [],
      languageArray: [],
      languageObject: {},
      iframe: false,
      warning: false,
      urls: [],
      tags: [],
      category: undefined,
      categories: [
        "Anime",
        "Games",
        "Music",
        "Socials & Stream",
        "Videos",
        "Other",
      ],
    };
  },
  methods: {
    clipboardImport() {
      navigator.clipboard
        .readText()
        .then((text) => {
          try {
            if (!text) {
              this.message =
                "Are you sure you copied the JSON data cuz I can't find it!";
              this.dialog = true;
            } else {
              let data = JSON.parse(text.replace(/\s\s+/g, " "));

              const file = new File([JSON.stringify(data)], "metadata.json", {
                type: "application/json",
              });

              this.fileUpload({ target: { files: [file] } });
            }
          } catch (err) {
            this.message =
              "Wow, slow down! Something went really spoopy reading your copied text! I promise I won't store it but can you please provide an actual 'JSON' data?";
            this.dialog = true;
          }
        })
        .catch(() => {
          this.message =
            "Error reading your clipboard. Have you granted permission to me master? :v";
          this.dialog = true;
        });
    },
    storeImportHandle: async function () {
      const presenceName =
        this.$refs.storeImportField && this.$refs.storeImportField.lazyValue
          ? this.$refs.storeImportField.lazyValue
          : null;

      if (!presenceName) {
        this.storeImportDialog = false;

        this.message =
          "You have to enter a name or a link so we can import it, right?";
        this.dialog = true;
      } else if (
        presenceName &&
        presenceName.match(
          /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/
        )
      ) {
        try {
          let { data } = await axios.get(
            `https://api.premid.app/v2/presences/${
              presenceName.split("/")[presenceName.split("/").length - 1]
            }`
          );

          if (data && data.error) {
            this.storeImportDialog = false;

            this.message =
              "Seems like that presence is not available on the store. Please make sure you've entered the correct name.";
            this.dialog = true;
          } else if (data && data.metadata) {
            const file = new File(
              [JSON.stringify(data.metadata)],
              "metadata.json",
              {
                type: "application/json",
              }
            );

            this.fileUpload({ target: { files: [file] } });
          }
        } catch (err) {
          this.storeImportDialog = false;

          this.message =
            "Something went wrong while sending the request. Please make sure everything is correct and check if PreMiD API is alive.";
          this.dialog = true;
        }
      } else if (presenceName) {
        try {
          let { data } = await axios.get(
            `https://api.premid.app/v2/presences/${encodeURIComponent(
              presenceName
            )}`
          );

          if (data && data.error) {
            this.storeImportDialog = false;

            this.message =
              "Seems like that presence is not available on the store. Please make sure you've entered the correct name.";
            this.dialog = true;
          } else if (data && data.metadata) {
            const file = new File(
              [JSON.stringify(data.metadata)],
              "metadata.json",
              {
                type: "application/json",
              }
            );

            this.fileUpload({ target: { files: [file] } });
          }
        } catch (err) {
          this.storeImportDialog = false;

          this.message =
            "Something went wrong while sending the request. Please make sure everything is correct and check if PreMiD API is alive.";
          this.dialog = true;
        }
      }
    },
    deleteArray(type, value) {
      if (
        type == "contributor" &&
        this.contributorsIdArray.indexOf(value) > -1
      ) {
        this.contributorsIdArray.splice(
          this.contributorsIdArray.indexOf(value),
          1
        );

        this.contributorsArray = this.contributorsArray.filter(function (cont) {
          return cont.id != value;
        });
      } else if (type == "url" && this.urls.indexOf(value) > -1) {
        this.urls.splice(this.urls.indexOf(value), 1);
      } else if (type == "language" && this.languageArray.indexOf(value) > -1) {
        this.languageArray.splice(this.languageArray.indexOf(value), 1);

        delete this.languageObject[value];
      } else if (type == "tag" && this.tags.indexOf(value) > -1) {
        this.tags.splice(this.tags.indexOf(value), 1);
      }
    },
    fileUpload: function (event) {
      const self = this;

      if (
        event.target &&
        event.target.files &&
        event.target.files.length > 0 &&
        event.target.files[0]
      ) {
        const reader = new FileReader();
        reader.readAsText(event.target.files[0], "UTF-8");

        reader.onload = function (evt) {
          try {
            const result = JSON.parse(evt.target.result);

            self.dialog = false;
            self.iframe = false;
            self.json = null;
            self.message = null;
            self.category = undefined;
            self.category = undefined;
            self.contributorsArray = [];
            self.contributorsIdArray = [];
            self.tags = [];
            self.urls = [];
            self.languageObject = {};
            self.languageArray = [];
            self.color.hex = "#FF0000";
            self.color.hexa = "#FF0000";
            self.iframeRegexp = "none";
            self.warning = false;

            if (result.warning && result.warning == true) self.warning = true;
            if (result.author && result.author.name)
              self.$refs.name.lazyValue = result.author.name;
            if (result.author && result.author.id)
              self.$refs.Id.lazyValue = result.author.id;
            if (result.service) self.$refs.service.lazyValue = result.service;
            if (result.version) self.$refs.version.lazyValue = result.version;
            if (result.logo) self.$refs.logo.lazyValue = result.logo;
            if (result.thumbnail) self.$refs.thumbnail.lazyValue = result.logo;
            if (result.color) {
              self.color.hex = result.color.toUpperCase();
              self.color.hexa = result.color.toUpperCase();
            }
            if (result.category) {
              const fixedCategoryNames = {
                anime: "Anime",
                games: "Games",
                music: "Music",
                socials: "Socials & Stream",
                videos: "Videos",
                other: "Other",
              };

              self.$refs.category.lazyValue =
                fixedCategoryNames[result.category] || "Other";
              self.category = result.category;
            }
            if (!result.iframe) {
              self.iframe = false;
              self.iframeRegexp = "none";
            }
            if (result.iframe) {
              self.iframe = true;
              self.iframeRegexp = "block";
            }
            if (result.regExp) self.$refs.regexp.lazyValue = result.regExp;
            if (result.iFrameRegExp)
              self.$refs.iframeRegexp.lazyValue = result.iFrameRegExp;

            if (result.description && typeof result.description != "string") {
              for (let lang in result.description) {
                self.languageObject[lang] = result.description[lang];
                self.languageArray.push(lang);
              }
            }

            if (result.url) {
              if (typeof result.url != "string") {
                for (let key in result.url) {
                  self.urls.push(
                    result.url[key]
                      .replace("https://", "")
                      .replace("http://", "")
                  );
                }
              }

              if (typeof result.url == "string") {
                self.urls.push(
                  result.url.replace("https://", "").replace("http://", "")
                );
              }
            }

            if (result.tags) {
              if (typeof result.tags != "string") {
                for (let key in result.tags) {
                  self.tags.push(result.tags[key]);
                }
              }

              if (typeof result.tags == "string") {
                self.tags.push(result.tags);
              }
            }

            if (result.contributors) {
              for (let key in result.contributors) {
                self.contributorsArray.push({
                  name: result.contributors[key].name,
                  id: result.contributors[key].id,
                });
                self.contributorsIdArray.push(result.contributors[key].id);
              }
            }

            event.target.value = null;
            self.storeImportDialog = false;
            self.$refs && self.$refs.storeImportField
              ? self.$refs.storeImportField.reset()
              : null;
          } catch (err) {
            console.log(err);
            event.target.value = null;

            self.message =
              "Please make sure you uploaded a valid metadata.json file and try again.";
            self.dialog = true;
          }
        };

        reader.onerror = function () {
          event.target.value = null;

          self.message =
            "Error reading your file. Please make sure that you selected a valid metadata.json file.";
          self.dialog = true;
        };
      }
    },
    download: function (obj) {
      const data =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(obj)),
        element = document.createElement("a");

      element.setAttribute("href", data);
      element.setAttribute("download", "metadata.json");
      element.click();
      element.remove();
    },
    contHandle: function () {
      const contName = this.$refs.contName,
        contId = this.$refs.contId;

      this.dialogWidth = 500;
      this.json = null;

      if (
        contName &&
        contId &&
        contName.lazyValue != "" &&
        contId.lazyValue != ""
      ) {
        if (this.contributorsArray.find((c) => c.id == contId.lazyValue)) {
          this.message =
            "The user with this ID has been already added to the object. Please check the ID and make sure it is not added before.";
          this.dialog = true;
        } else if (isNaN(contId.lazyValue)) {
          this.message =
            "User IDs can only be numbers, please check the ID you've entered. If you don't know how to get an ID, you can Google it.";
          this.dialog = true;
        } else if (contId.lazyValue.length != 18) {
          this.message =
            "Discord user IDs are always 18 characters long. Please enter a valid user ID.";
          this.dialog = true;
        } else {
          const newCont = {
            name: contName.lazyValue || "Unknown",
            id: contId.lazyValue || "Unknown",
          };

          this.contributorsIdArray.push(contId.lazyValue);
          this.contributorsArray.push(newCont);

          contId.reset();
          contName.reset();
        }
      } else {
        this.message =
          "Make sure you fill the name and ID part, they are both needed to add a proper contributor. If you don't want to add one, just leave it.";
        this.dialog = true;
      }
    },
    tagHandle: function () {
      const tag = this.$refs.tags;

      if (tag && tag.lazyValue && this.tags.includes(tag.lazyValue)) {
        this.dialogWidth = 500;
        this.json = null;

        this.message =
          "This tag has already been added to the list. Please don't add the same tag more than once.";
        this.dialog = true;
      } else if (tag && tag.lazyValue) {
        this.tags.push(tag.lazyValue);

        tag.reset();
      } else {
        this.dialogWidth = 500;
        this.json = null;

        this.message =
          "You have to enter something to add as a tag. If you don't want to add a tag, just live it and don't press Enter again!";
        this.dialog = true;
      }
    },
    urlHandle: function () {
      const urlInput = this.$refs.url;

      this.dialogWidth = 500;
      this.json = null;

      if (urlInput && urlInput.lazyValue) {
        this.urls.push(
          urlInput.lazyValue.replace("https://", "").replace("http://", "")
        );

        urlInput.reset();
      } else {
        this.message = "You have write the URL you want to add.";
        this.dialog = true;
      }
    },
    descHandle: function () {
      const languageCode = this.$refs.langKey,
        description = this.$refs.description;

      this.dialogWidth = 500;
      this.json = null;

      if (
        !languageCode ||
        !description ||
        !languageCode.lazyValue ||
        !description.lazyValue
      ) {
        this.message =
          "You have to fill both of the inputs in order to add a language. Check your language code and description field and try again.";
        this.dialog = true;
      } else {
        this.languageObject[languageCode.lazyValue.toLowerCase()] =
          description.lazyValue;
        this.languageArray.push(languageCode.lazyValue.toLowerCase());

        languageCode.reset();
        description.reset();
      }
    },
    categoryHandle: function (category) {
      const categories = {
        Anime: "anime",
        Games: "games",
        Music: "music",
        "Socials & Stream": "socials",
        Videos: "videos",
        Other: "other",
      };

      if (categories[category]) this.category = categories[category];
    },
    clear: function () {
      (this.dialogWidth = 500),
        (this.json = null),
        (this.iframeRegexp = "none"),
        (this.contributorsArray = []),
        (this.contributorsIdArray = []),
        (this.languageArray = []),
        (this.languageObject = {}),
        (this.iframe = false),
        (this.urls = []),
        (this.tags = []),
        (this.category = undefined),
        (this.color.hex = "#FF0000"),
        (this.color.hexa = "#FF0000");

      Object.keys(this.$refs).forEach((ref) => {
        this.$refs[ref].reset ? this.$refs[ref].reset() : false;
      });
    },
    generate() {
      const authorName = this.$refs.name,
        authorId = this.$refs.Id,
        serviceName = this.$refs.service,
        serviceVersion = this.$refs.version,
        logo = this.$refs.logo,
        thumbnail = this.$refs.thumbnail,
        color = this.color,
        regexp = this.$refs.regexp,
        contributorsArray = this.contributorsArray,
        urls = this.urls,
        languages = this.languageObject,
        languageArray = this.languageArray,
        tags = this.tags,
        category = this.category,
        iframe = this.iframe,
        warning = this.warning,
        iframeRegexp = this.$refs.iframeRegexp;

      if (
        !authorName ||
        !authorId ||
        !authorName.lazyValue ||
        !authorId.lazyValue
      ) {
        this.message =
          "You are missing all or some of the author information fields. Make sure they're all entered up.";
        this.dialog = true;
      } else if (isNaN(authorId.lazyValue)) {
        this.message =
          "User IDs can only be numbers, please check the ID you've entered. If you don't know how to get an ID, you can Google it.";
        this.dialog = true;
      } else if (authorId.lazyValue.length != 18) {
        this.message =
          "Discord user IDs are always 18 characters long. Please enter a valid user ID.";
        this.dialog = true;
      } else if (
        !serviceName ||
        !serviceVersion ||
        !serviceName.lazyValue ||
        !authorId.lazyValue
      ) {
        this.message =
          "You are missing all or some of the service information fields. Make sure they're all entered up.";
        this.dialog = true;
      } else if (
        !logo ||
        !thumbnail ||
        !logo.lazyValue ||
        !thumbnail.lazyValue
      ) {
        this.message =
          "You are missing pictures. Check the logo and thumbnail field and make sure they're all entered up.";
        this.dialog = true;
      } else if (!color || !color.hex) {
        this.message =
          "You are missing the color field, somehow. Please refresh the page or check the color picker.";
        this.dialog = true;
      } else if (urls.length < 1) {
        this.message =
          "You have to enter at least 1 URL to make it work properly. Please make sure you hit enter after you wrote the URL you want. It is needed to hit enter to be able to add multiple URLs. Don't blame us, it's cool.";
        this.dialog = true;
      } else if (
        languageArray.length < 1 ||
        Object.keys(languages).length < 1
      ) {
        this.message =
          "You are missing language fields. You have to hit enter after you wrote the language and descripiton field. You have to add at least English because it is needed for the store. Please check the fields and try again.";
        this.dialog = true;
      } else if (!category) {
        this.message =
          "You are missing the category option. You have to choose a category to make it show up on the market.";
        this.dialog = true;
      } else {
        let metadata = { $schema: "https://schemas.premid.app/metadata/1.0" };

        metadata["author"] = {
          name: authorName.lazyValue,
          id: authorId.lazyValue,
        };

        contributorsArray.length > 0
          ? (metadata["contributors"] = contributorsArray)
          : false;
        urls.length == 1
          ? (metadata["url"] = urls[0])
          : (metadata["url"] = urls);
        metadata["description"] = languages;

        const addThese = {
          service: serviceName.lazyValue,
          version: serviceVersion.lazyValue,
          logo: logo.lazyValue,
          thumbnail: thumbnail.lazyValue,
          color: color.hex.toUpperCase(),
          tags: tags,
          category: category,
        };

        for (let key in addThese) {
          // I fricking love this loop!
          metadata[key] = addThese[key];
        }

        iframe ? (metadata["iframe"] = true) : false;
        warning ? (metadata["warning"] = true) : false;
        iframe && iframeRegexp.lazyValue
          ? (metadata["iFrameRegExp"] = iframeRegexp.lazyValue)
          : false;
        regexp && regexp.lazyValue
          ? (metadata["regExp"] = regexp.lazyValue)
          : false;

        this.json = metadata;
        this.message = "Here's your metadata.json file!";
        this.dialogWidth = 750;
        this.dialog = true;
      }
    },
  },
};
</script>
