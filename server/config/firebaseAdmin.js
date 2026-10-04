import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccountPath = process.env.RENDER
    ? "/etc/secrets/Firebasebackendkey.json"
    : new URL("../Firebasebackendkey.json", import.meta.url);

const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
);

const app = initializeApp({
    credential: cert(serviceAccount)
});

const adminAuth = getAuth(app);

export default adminAuth;