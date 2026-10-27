import fs from "fs";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let serviceAccount = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        const raw = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
        const jsonString = raw.startsWith("{")
            ? raw
            : Buffer.from(raw, "base64").toString("utf8");
        serviceAccount = JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", e.message);
    }
} else if (process.env.RENDER) {
    try {
        serviceAccount = JSON.parse(fs.readFileSync("/etc/secrets/Firebasebackendkey.json", "utf8"));
    } catch (e) {
        console.error("Render secret file not found:", e.message);
    }
} else {
    try {
        serviceAccount = JSON.parse(fs.readFileSync(new URL("../Firebasebackendkey.json", import.meta.url), "utf8"));
    } catch (e) {
        console.warn("Local Firebasebackendkey.json not found:", e.message);
    }
}

const app = getApps().length === 0
    ? (serviceAccount ? initializeApp({ credential: cert(serviceAccount) }) : initializeApp())
    : getApps()[0];

const adminAuth = getAuth(app);

export default adminAuth;