import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../Firebasebackendkey.json" with { type: "json" };

const app = initializeApp({
    credential: cert(serviceAccount)
});

const adminAuth = getAuth(app);

export default adminAuth;