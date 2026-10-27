import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCoUh9-skB5jM3-RxG69uPFtUgbGflKqk8",
  authDomain: "safeguardpro.firebaseapp.com",
  projectId: "safeguardpro",
  storageBucket: "safeguardpro.firebasestorage.app",
  messagingSenderId: "118230714910",
  appId: "1:118230714910:web:91e952bfc05dc95b367c0f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);