<template>
  <v-row no-gutters>
    <v-col cols="1"></v-col>

    <v-col cols="10">
      <center>
        <v-icon x-large style="margin-bottom:4px;">mdi-party-popper</v-icon>
        <div>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <span>EGGSY thinks you're super uber awesome and cute!!</span>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>

        <v-btn to="/" text rounded>Go to homepage</v-btn>
      </center>
    </v-col>

    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
export default {
  layout: "centered",
  auth: false
};
</script>