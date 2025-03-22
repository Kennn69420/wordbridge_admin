require("dotenv").config();
admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore"); // ✅ Import Firestore correctly

let serviceAccount;

if (process.env.FIREBASE_CREDENTIALS) {
  // Decode base64 from Railway env variable
  serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf-8"));
} else {
  // Load from file when running locally
  serviceAccount = require("./firebase_wordbridge.json");
}


// Initialize Firebase Admin (for Firestore & Authentication)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
    apiKey: "AIzaSyDuvMZlxco8WiGJBBUOL26FD28yYzKumY0",
    authDomain: "wordbrige-3eaa2.firebaseapp.com",
    projectId: "wordbrige-3eaa2",
    storageBucket: "wordbrige-3eaa2.appspot.com",
    messagingSenderId: "584648748967",
    appId: "1:584648748967:web:8cad65d88c3c8cd5939082",
    measurementId: "G-NH2866WJPQ"
};

// ✅ Initialize Firebase (Client SDK)
const firebaseApp = initializeApp(firebaseConfig);

// ✅ Get Firestore instance (Admin SDK)
const database = admin.firestore(); // Fix: Use admin.firestore() instead of firebaseApp

// ✅ Get Auth instance
const auth = getAuth(firebaseApp);

module.exports = { database, auth };
