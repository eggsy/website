import { FirebaseModuleConfiguration } from "@nuxtjs/firebase/types/index"

const { FIREBASE_APP_ID, FIREBASE_API_KEY, FIREBASE_PROJECT_ID } = process.env

if (!FIREBASE_APP_ID || !FIREBASE_API_KEY || !FIREBASE_PROJECT_ID)
  throw new Error(
    "You are missing Firebase options, please check your .env file and make sure all required keys are present."
  )

const Firebase: FirebaseModuleConfiguration = {
  config: {
    appId: FIREBASE_APP_ID,
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_PROJECT_ID,
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
