<template>
  <v-app dark>
    <v-app-bar dense elevation="1" color="#212121" fixed app>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="mobileFriendly-reverse"
        style="margin-right:4px;"
      ></v-app-bar-nav-icon>

      <v-btn disabled to="/projects/premid" exact>PreMiD</v-btn>

      <div class="text-center mobileFriendly" style="width:100%">
        <v-btn text to="/projects/premid/stats" style="margin-right:5px;"
          >Presence Stats</v-btn
        >
        <v-btn text to="/projects/premid/mdcreator" style="margin-right:5px;"
          >Metadata Creator</v-btn
        >
        <v-btn text to="/projects/premid/custom-status">Custom Status</v-btn>
      </div>

      <v-spacer />

      <template>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              to="/projects/premid"
              exact
              text
              style="margin-right:5px;"
            >
              <v-icon>mdi-share-circle</v-icon>
            </v-btn>
          </template>
          <span>Click here to go back to PreMiD's project page.</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" to="/" text>
              <v-icon>mdi-home-circle</v-icon>
            </v-btn>
          </template>
          <span>Click here to go back to main homepage.</span>
        </v-tooltip>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>PreMiD Stuff</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          style="margin-bottom:10px;"
          link
          to="/projects/premid"
          exact
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>Home Page</v-list-item-content>
        </v-list-item>

        <v-list-item
          style="margin-bottom:10px;"
          link
          to="/projects/premid/stats"
        >
          <v-list-item-icon>
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-list-item-icon>

          <v-list-item-content>Presence Stats</v-list-item-content>
        </v-list-item>

        <v-list-item
          style="margin-bottom:10px;"
          link
          to="/projects/premid/mdcreator"
        >
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>

          <v-list-item-content>Metadata Creator</v-list-item-content>
        </v-list-item>

        <v-list-item link to="/projects/premid/custom-status">
          <v-list-item-icon>
            <v-icon>mdi-attachment</v-icon>
          </v-list-item-icon>

          <v-list-item-content>Custom Status (PC)</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
.mobileFriendly-reverse {
  display: none;
}

@media only screen and (max-width: 600px) {
  .mobileFriendly {
    display: none;
  }

  .mobileFriendly-reverse {
    display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false
    };
  }
};
</script>
