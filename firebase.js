// require('dotenv').config()
// const admin = require("firebase-admin");
// const serviceAccount = require("./firebase_wordbridge.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// //   databaseURL: "https://your-project-id.firebaseio.com",
// });

// const db = admin.firestore();

// module.exports = db;


const admin = require("firebase-admin");

const credentials = process.env.FIREBASE_CREDENTIALS
  ? JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8"))
  : require("./firebase_wordbridge.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();
module.exports = { admin, db };
