import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-9406281665-5f07e",
  "appId": "1:929726076884:web:60d899fc8dc2325cab2841",
  "storageBucket": "studio-9406281665-5f07e.firebasestorage.app",
  "apiKey": "AIzaSyAJyHlmIbSv-14dIOY5tottmcJ94PxOCXE",
  "authDomain": "studio-9406281665-5f07e.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "929726076884"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
