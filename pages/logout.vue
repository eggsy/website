<template></template>

<script>
export default {
  head() {
    return {
      title: "Logout",
      titleTemplate: ""
    };
  },
  created() {
    this.$auth.logout();
    this.$router.push("/");
  }
};
</script>