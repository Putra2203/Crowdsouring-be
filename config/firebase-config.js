const admin = require("firebase-admin");
const serviceAccount = require("./storage-crowdsourcing-firebase-adminsdk-scnap-ed2e86ddcd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://storage-crowdsourcing.firebasestorage.app" 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
