require('dotenv').config()
const admin = require("firebase-admin");
const serviceAccount = require("./firebase_wordbridge.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://your-project-id.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;
