export default {
  data() {
    return {
      isMobile: false,
      presenceAdded: false
    };
  },
  mounted() {
    setInterval(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      )
        this.isMobile = true;

      if (
        location.pathname == "/projects/premid/custom-status" &&
        !this.presenceAdded
      ) {
        document.querySelector("#__nuxt").classList.contains("presence")
          ? (this.presenceAdded = true)
          : false;
      }
    }, 150);
  }
};
