// require('dotenv').config()
// const admin = require("firebase-admin");
// const serviceAccount = require("./firebase_wordbridge.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// //   databaseURL: "https://your-project-id.firebaseio.com",
// });

// const db = admin.firestore();

// module.exports = db;
require("dotenv").config();
const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_CREDENTIALS) {
  // Decode base64 from Railway env variable
  serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf-8"));
} else {
  // Load from file when running locally
  serviceAccount = require("./firebase_wordbridge.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
