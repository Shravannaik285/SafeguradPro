import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "safeguardpro-f575f.firebaseapp.com",
  projectId: "safeguardpro-f575f",
  storageBucket: "safeguardpro-f575f.firebasestorage.app",
  messagingSenderId: "882978742452",
  appId: "1:882978742452:web:8ea227988aa0846108f7e1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);