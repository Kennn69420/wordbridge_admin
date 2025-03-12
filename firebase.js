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

const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
