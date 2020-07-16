<template>
  <v-row no-gutters>
    <v-col cols="1"></v-col>

    <v-col cols="10">
      <v-card>
        <v-card-title>
          Presence Stats
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="presences"
          :search="search"
          :loading="loading"
          :single-expand="true"
          item-key="service"
          show-expand
          loading-text="Fetching data from PreMiD API, please wait..."
        >
          <template v-for="(service, index) in presences" v-slot:expanded-item="service">
            <td :key="index" :colspan="5">
              <div style="margin-top:15px;margin-bottom:20px;">
                <template>
                  <v-row justify="space-around" class="mobileFriendlySection">
                    <div>
                      <h3>Logo:</h3>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            style="text-decoration:none"
                            v-on="on"
                            :href="service.item.metadata && service.item.metadata.logo ? service.item.metadata.logo : ''"
                          >{{service.item.metadata && service.item.metadata.logo ? service.item.metadata.logo.replace("https://", "").replace("http://", "").replace("proxy.duckduckgo.com/iu/?u=", "") : "No Logo"}}</a>
                        </template>
                        <img
                          v-if="service.item.metadata && service.item.metadata.logo"
                          :src="service.item.metadata && service.item.metadata.logo ? service.item.metadata.logo : null"
                          width="256px"
                          height="256px"
                        />
                        <span v-else>No preview available.</span>
                      </v-tooltip>
                    </div>

                    <div>
                      <h3>Thumbnail:</h3>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            style="text-decoration:none"
                            v-on="on"
                            :href="service.item.metadata && service.item.metadata.thumbnail ? service.item.metadata.thumbnail : ''"
                          >{{service.item.metadata && service.item.metadata.thumbnail ? service.item.metadata.thumbnail.replace("https://", "").replace("http://", "").replace("proxy.duckduckgo.com/iu/?u=", "") : "No Thumbnail"}}</a>
                        </template>
                        <img
                          v-if="service.item.metadata && service.item.metadata.logo"
                          :src="service.item.metadata && service.item.metadata.thumbnail ? service.item.metadata.thumbnail : null"
                          width="256px"
                          height="256px"
                        />
                        <span v-else>No preview available.</span>
                      </v-tooltip>
                    </div>
                  </v-row>

                  <div
                    v-if="service.item.metadata && service.item.metadata.url && typeof service.item.metadata.url == 'object'"
                    style="margin-top:15px;"
                  >
                    <h3>URLs ({{ service.item.metadata.url.length }}):</h3>
                    <v-chip
                      v-for="(url, index) in service.item.metadata && service.item.metadata.url && typeof service.item.metadata.url == 'object' ? service.item.metadata.url : 0"
                      style="margin-top:6px;margin-right:4px;"
                      :key="index"
                      color="primary"
                      close-icon="mdi-share-circle"
                      close
                      @click:close="redirect('http://' + url)"
                    >{{ url }}</v-chip>
                    <span v-if="!service.item.metadata || !service.item.metadata.url">No URL.</span>
                  </div>

                  <div v-else style="margin-top:20px;">
                    <h3>URL:</h3>
                    <v-chip
                      v-if="service.item.metadata && service.item.metadata.url && typeof service.item.metadata.url == 'string'"
                      style="margin-top:6px"
                      color="primary"
                      close-icon="mdi-share-circle"
                      close
                      @click:close="redirect('http://' + service.item.metadata.url)"
                    >{{ service.item.metadata.url }}</v-chip>
                    <span v-else-if="!service.item.metadata || !service.item.metadata.url">No URL.</span>
                  </div>

                  <div style="margin-top:20px;">
                    <h3>Tag(s):</h3>
                    <v-chip
                      v-for="(tag, index) in service.item.metadata && service.item.metadata.tags && typeof service.item.metadata.tags == 'object' && service.item.metadata.tags.length > 0 ? service.item.metadata.tags : 0"
                      style="margin-top:6px;margin-right:4px;"
                      :key="index"
                      color="primary"
                    >{{ tag }}</v-chip>
                    <span
                      v-if="!service.item.metadata || !service.item.metadata.tags || service.item.metadata && service.item.metadata.tags && typeof service.item.metadata.tags != 'object' || service.item.metadata.tags.length == 0"
                    >No tags.</span>
                  </div>

                  <div
                    v-if="service.item.metadata && service.item.metadata.description && typeof service.item.metadata.description == 'object'"
                    style="margin-top:15px;"
                  >
                    <h3>Descriptions:</h3>
                    <ul>
                      <li
                        v-for="(content, key) in service.item.metadata.description"
                        :key="content"
                      >
                        <strong>{{ key ? key.toUpperCase() : "N/A" }}</strong>
                        | {{content}}
                      </li>
                    </ul>
                  </div>

                  <div v-else style="margin-top:15px;">
                    <h3>Descriptions:</h3>
                    <strong>Error:</strong> URL section must be an object. This presence has a corrupt metadata.json file and it'll not work if if it's on PreMiD's store.
                  </div>

                  <v-row style="margin-top:20px;" justify="space-around">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-information-variant</v-icon>
                      </template>
                      <span>{{ service.item.metadata && service.item.metadata.version ? service.item.metadata.version : "No version." }}</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-brush</v-icon>
                      </template>
                      <span>{{ service.item.metadata && service.item.metadata.color ? service.item.metadata.color.toUpperCase() : 'No color.' }}</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          icon
                          :href="'https://premid.app/store/presences/' + encodeURIComponent(service.item.service)"
                        >
                          <v-icon>mdi-export</v-icon>
                        </v-btn>
                      </template>
                      <span>Click here to see it on PreMiD store.</span>
                    </v-tooltip>
                  </v-row>
                </template>
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-col>

    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline" primary-title>Warning</v-card-title>

          <v-card-text>It seems like there was an issue contacting with PreMiD's API. This might be because of your connection or the API itself. Try again in a few moments.</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
</template>

<style scoped>
*:focus {
  outline: 0;
}

.mobileFriendlySection {
  width: 100%;
  max-width: 100%;
}

@media only screen and (max-width: 600px) {
  .mobileFriendlySection {
    margin-left: 6px;
    word-break: break-all;
  }
}
</style>

<script>
import axios from "axios";

export default {
  layout: "premid",
  auth: false,
  head: {
    title: "Presence Stats",
    meta: [
      {
        hid: "og:description",
        name: "og:description",
        content:
          "See stats about which PreMiD services are used most with their usage numbers and creators!"
      },
      {
        name: "og:image",
        content: "https://premid.app/assets/images/logo.png"
      },
      {
        hid: "description",
        name: "description",
        content:
          "See stats about which PreMiD services are used most with their usage numbers and creators!"
      },
      { name: "premid-details", content: "Viewing a PreMiD page:" },
      { name: "premid-state", content: "Presence Stats" }
    ]
  },
  data() {
    return {
      dialog: false,
      loading: true,
      search: null,
      headers: [
        { text: "# ", align: "left", value: "number" },
        { text: "Service Name ", value: "service" },
        { text: "Users ", value: "users" },
        { text: "Creator ", value: "creator" }
      ],
      presences: []
    };
  },
  mounted() {
    axios
      .get("https://api.premid.app/v2/presenceUsage")
      .then(res => {
        axios
          .get("https://api.premid.app/v2/presences")
          .then(result => {
            const sorted = [],
              presences = [],
              url = new URL(location.href),
              params =
                url.searchParams.get("creator") ||
                url.searchParams.get("service");

            for (let item in res.data) {
              const filtered =
                result.data.filter(p => p.metadata.service == item).length > 0
                  ? result.data.find(p => p.metadata.service == item)
                  : "Null";

              sorted.push([item, res.data[item], filtered]);
            }

            sorted.sort(function(a, b) {
              return a[1] - b[1];
            });

            for (let i in sorted.reverse()) {
              const thing = {
                number: parseInt(i) + 1,
                service: sorted[i] && sorted[i][0] ? sorted[i][0] : "Unknown",
                users: sorted[i] && sorted[i][1] ? sorted[i][1] : "Unknown",
                creator:
                  sorted[i] &&
                  sorted[i][2] &&
                  sorted[i][2].metadata &&
                  sorted[i][2].metadata.author &&
                  sorted[i][2].metadata.author.name
                    ? sorted[i][2].metadata.author.name
                    : "Unknown",
                metadata:
                  sorted[i] && sorted[i][2] && sorted[i][2].metadata
                    ? sorted[i][2].metadata
                    : null
              };
              presences.push(thing);
            }

            this.search =
              params && params != "" ? params.replace(/\+/g, " ") : null;
            this.loading = false;
            this.presences = presences;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.dialog = true;
          });
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
        this.dialog = true;
      });
  },
  methods: {
    redirect: function(url) {
      window.location.href = url;
    }
  }
};
</script>