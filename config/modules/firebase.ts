import { FirebaseModuleConfiguration } from "@nuxtjs/firebase/types/index"
import { config as loadEnv } from "dotenv"

/* Load env variables */
loadEnv()

const {
  FIREBASE_APP_ID: appId,
  FIREBASE_API_KEY: apiKey,
  FIREBASE_PROJECT_ID: projectId,
} = process.env

if (!appId || !apiKey || !projectId)
  throw new Error(
    "You are missing Firebase options, please check your .env file and make sure all required keys are present."
  )

const Firebase: FirebaseModuleConfiguration = {
  config: {
    appId,
    apiKey,
    projectId,
    // Setting these because types aren't optional, though they're not required
    databaseURL: "",
    authDomain: "",
    storageBucket: "",
    messagingSenderId: "",
    measurementId: "",
  },
  services: {
    firestore: true,
  },
}

export default Firebase
