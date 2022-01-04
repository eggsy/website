import { InstallOptions } from "vue-analytics"

const GoogleAnalytics: InstallOptions = {
  id: process.env.GOOGLE_ANALYTICS_ID || "",
}

export default GoogleAnalytics
