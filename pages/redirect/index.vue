<template>
  <v-content>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card loading="secondary" class="elevation-12">
          <v-toolbar color="primary" flat>
            <v-toolbar-title>Redirecting</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span>
              Sorry this page requires a valid parameter to work. Redirecting you to homepage now. Please wait or click
              <a
                href="/"
              >here</a>.
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  layout: "centered",
  auth: false,
  head: {
    title: "Redirecting to homepage",
    meta: [
      {
        "http-equiv": "refresh",
        content: "5;url=/"
      },
      {
        name: "og:title",
        content: "Redirecting to homepage"
      },
      {
        name: "og:description",
        content:
          "This page requires a parameter to work. Please check your request and try again."
      },
      {
        name: "description",
        content:
          "This page requires a parameter to work. Please check your request and try again."
      },
      { name: "premid-details", content: "Redirecting to:" },
      {
        name: "premid-state",
        content: "Unknown redirect option"
      }
    ]
  }
};
</script>